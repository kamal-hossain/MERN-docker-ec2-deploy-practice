import React from 'react'
import './App.css'

function App() {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    fetch('http://localhost:80')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          setCount(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  const updateDB = () => {
    fetch('http://localhost:80/update')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          setCount(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  return (
    <div className="App">
      <h1>This is a react app haha</h1>

      <h1>Count value from mongoDB = {count}</h1>
      <button onClick={updateDB}>Update db</button>
    </div>
  )
}
export default App
