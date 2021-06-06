
# TS-NODE_API

[![Build Status](https://www.travis-ci.com/bruno-bert/ts-node-api-boilerplate.svg?branch=master)](https://www.travis-ci.com/bruno-bert/ts-node-api-boilerplate)  [![Coverage Status](https://coveralls.io/repos/github/bruno-bert/ts-node-api-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/bruno-bert/ts-node-api-boilerplate?branch=master)

## Husky 

#### How to Create a Hook
```bash

npx husky add .husky/{replace by git hook name} "{replace by command to be executed}"

/** like this **/:
npx husky add .husky/pre-commit "npm test"
```

## Install Mongo 4 (Ubuntu 18.04)

#### Download and Installation
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

```bash
sudo add-apt-repository 'deb [arch=amd64] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse'
```

```bash
sudo apt update
sudo apt install mongodb-org
```

#### Create data directory
```bash
sudo mkdir -p ~/data/db
```


#### Starting server
```bash
sudo mongod --dbpath ~/data/db
```
#### Check if server is OK:
```bash
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```

__Output should be__:


```bash
MongoDB shell version v4.0.24
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("b968a668-db33-42f3-9525-ea03925c0a4b") }
MongoDB server version: 4.0.24
{
        "authInfo" : {
                "authenticatedUsers" : [ ],
                "authenticatedUserRoles" : [ ]
        },
        "ok" : 1
}
```


## Heroku

#### Logs
```bash
heroku logs --app=ts-node-api-boilerplate
```

#### create variables
```bash
heroku config:set {VARIABLE_NAME}={variable_value} --app=ts-node-api-boilerplate
```

for this app:
```bash
heroku config:set MONGO_URL={get this url from your mongo server provider} --app=ts-node-api-boilerplate
heroku config:set JWT_SECRET={your token} --app=ts-node-api-boilerplate
```

#### restart dyno
```bash
heroku restart --app=ts-node-api-boilerplate
```