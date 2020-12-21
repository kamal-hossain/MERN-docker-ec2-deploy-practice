# Dockerized `Click Counter app` app to deploy at AWS EC2 ubuntu instance

> Get the source code [here](https://github.com/kamal-hossain/MERN-docker-ec2-deploy-practice)

### Stack 
- React 
- Nodejs
- MongoDB

---

## Docker notes
If docker is installed you can build and run images locally.

```
docker-compose up --build
```
> Set the `REACT_APP_API_URL` variable in .env, based on your need.


## Create a new EC2 instance (Ubuntu 18.04)

- Go to AWS EC2
- Launch instance
- Chose Ubuntu 18.04 64 bit ( you can choose as your need )
- Select Free tier eligible ( recommended for testing )
- In `Configure Security Group` add `All traffic` rule and allow from anywhere ( for testing only )
- Leave all settings as default 
- Launch
- Create a key pair, and download it.

## Connect EC2 instance from Windows machine

- Install [PuTTY](https://www.putty.org/) 
- Open PuTTYgen, `Load` the downloaded `*.pem` file
- Save private key ( this will save a `*.ppk` file )
- Go to the AWS EC2
- Select the instance 
- Click on `connect`
- Copy the name from `ssh` ( the part should start with `ubuntu` and end with `.com` )
- Open PuTTY ( NOT PuTTYgen! ) 
- Go `Session`, paste the copied name in `Host Name (or IP address)` leave port as `22`
- Go `Connection` > `SSH` > `Auth` and browse the saved private key ( `*.ppk` ) in `Private key file for authentication` 
- Click `Open`
- Click `Yes` ( if anything prompt up ) 

## Configure docker in EC2 (Ubuntu 18.04)

Run the following commands to install docker and docker compose

```
sudo apt-get update
```
```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
```
apt-cache madison docker-ce
```
```
sudo apt install docker.io
```
```
sudo apt install docker-compose
```

Run this repo in AWS EC2 by following commands

```
git clone https://github.com/kamal-hossain/MERN-docker-ec2-deploy-practice
```

```
cd MERN-docker-ec2-deploy-practice
```

```
sudo docker-compose up --build
```

You can also run it background by adding `-d` flag

```
sudo docker-compose up --build -d
```
Confirm it by

```
sudo docker ps
```
Stop the containers
```
sudo docker-compose down
```

To access the app from browser do the followings:

- Select the instance in AWS EC2
- Copy the `Public IPv4 address` from Details
- Open it on browser

> You can't access the IP if `All traffic` is not enabled in `Security group` from anywhere. (Or simillar settings)