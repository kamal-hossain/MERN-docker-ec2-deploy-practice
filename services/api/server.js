const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

// resolving  bug!! 
app.use(cors())

// Server port
const port = process.env.PORT || 8080

// Database configs
const DB = 'mongodb://mongo/myproject?retryWrites=true&w=majority' // TODO for cloud
// const DB = 'mongodb://localhost:27017/myproject?retryWrites=true&w=majority'
const dbName = 'myproject'
let db
let dbCollection

// Connect to mongo
MongoClient.connect(
  DB,
  {
    useUnifiedTopology: true,
  },
  function (err, client) {
    if (err) {
      // throw err
      console.log('mongodb conneciton failed')
      // return
    }
    db = client.db(dbName)
    dbCollection = db.collection('counterCollection')
    console.log('MongoDB connected at > ' + DB)
  }
)

app.get('/', function (req, res) {
  // Get counter value from mongodb
  dbCollection
    .find()
    .toArray()
    .then((results) => {
      if (results.length === 0) {
        console.log('inserting new document')
        dbCollection.insertOne({ count: 0 })
        res.status(200).json(0)
      }
      console.log(results[0].count)
      res.status(200).json(results[0].count)
    })
})

app.get('/update', function (req, res) {
  //update counter value from mongodb
  dbCollection
    .find()
    .toArray()
    .then((results) => {
      if (results.length === 0) {
        console.log('inserting new document')
        dbCollection.insertOne({ count: 0 })
        res.status(200).json(0)
      }
      console.log(results.length)
      // updating counter value
      dbCollection
        .findOneAndUpdate(
          { _id: results[0]._id },
          { $set: { count: results[0].count + 1 } },
          { new: true }
        )
        .then((result) => {
          console.log(result)
          res.status(200).json(result.value.count)
        })
    })
})

app.listen(port, function () {
  console.log(`listening on ${port}`)
})
