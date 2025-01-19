## Project setup

### Clone the project

```bash
$ git clone https://github.com/Anurodh01/task-management-service
$ cd task-management-service
```

#### In Order to download all dependencies we need to run command

```bash
$ npm install
```

#### As mysql database connection is required so create a database and set up the database.

#### Create connection with DB By providing the detials like username, password, and database name in .env file . In this case 'taskdb' is db name.

### Run "sql-script.sql" file scritpts to create database and table.

```bash
mysql> CREATE DATABASE taskdb;

mysql> USE taskdb;

mysql> CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('PENDING','IN_PROGRESS','COMPLETED') NOT NULL,
  `priority` enum('LOW','MEDIUM','HIGH') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);
```

#### As project integrates with different services like RabbitMQ and Redis as well. Provide the required connection url and port and queue_name in .env file.

#### Already configured default config can be used if running on local.

```bash
#Database configurations

DB_HOST=<DB_HOST>
DB_PORT=<DB_PORT>
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
DB_DATABASE=<DATABASE_NAME>

#RabbitMQ configurations
RABBITMQ_URL=<RABBITMQ_URL>                #'amqp://localhost:5672'
RABBITMQ_QUEUE=<RABBITMQ_QUEUE>            #'task_notifications'

#Reddis Configuratins
REDIS_HOST=<REDIS_HOST>        #localhost
REDIS_PORT=<REDIS_PORT>         #6379
REDIS_CACHE_TTL=<REDIS_TTL>     #60
```

## Running the Application

### Running with PM2

### Install PM2 globally

```bash
$ npm install -g pm2
```

### Start the application with PM2: To run the app first build the application by command

```bash
$ npm run build
```

### Run the application with PM2

```bash
$ pm2 start ecosystem.config.js
```

### To monitor the application with PM2 type command

```bash
$ pm2 monit
```

### To stop the application type command

```bash
$ pm2 stop ecosystem.config.js
```

## Compile and run the project locally we use

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Anurodh Singh]()
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
