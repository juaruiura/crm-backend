# π Shop CRM Backend

## π Index

- [π Description](#-description)
- [βΆοΈ Run this project](#%EF%B8%8F-run-this-project)
  - [π§ Requirements](#-requirements)
  - [π³ Run the containers](#-run-the-containers)
  - [βΈοΈ Stop the containers](#%EF%B8%8F-stop-the-containers)
- [π REST API](#-rest-api)
  - [Data structure](#for-the-data-structure)
  - [Authorization](#as-for-the-authorization)
- [π API ENDPOINTS](#-api-endpoints)
  - [Login and token](#to-login-and-get-the-token)
  - [/customers endpoints](#at-customers-we-have)
  - [/users endpoints (admin required)](#at-users-we-have-users-endpoints-require-the-authenticated-user-to-be-admin-isadmin-true)

## π Description

This project simulates a REST API to manage customer data for a small shop π.

It consists of 2 Docker π³ containers:

- π crm-backend: REST API for the management of customers and users
- πΎ mongodb: MongoDB database image container

For the backend, the main technologies used are:

- [NestJS <img src="https://nestjs.com/img/logo-small.svg" width="18" style="vertical-align:middle;" alt="Nest Logo" />](http://nestjs.com/ "NestJS's Homepage")
- [Mongoose <img src="https://avatars.githubusercontent.com/u/7552965?s=280&v=4" width="30" style="vertical-align:middle;" alt="Mongoose Logo" />](https://mongoosejs.com/ "Mongoose's Homepage")
- [Passport <img src="https://cdn.glitch.me/project-avatar/0d184ee3-fd8d-4b94-acf4-b4e686e57375.png" width="20" style="vertical-align:middle;" alt="Passport Logo" />](https://www.passportjs.org/ "Passport's Homepage")

# βΆοΈ Run this project

## π§ Requirements

- π³ <a href="https://www.docker.com/products/docker-desktop/" target="_blank"><img style="vertical-align:middle;" src="https://img.shields.io/badge/Docker-v20.10.17-green" alt="Docker version 20.10.17" height="16"/></a> was used during development in order to get the containers up
- **Ports 3000 and 27017** must be free for use for the API and MongoDB

### π³ Run the containers

The project has in the root a docker-compose.yml which is the definition of the running system. It will create containers mentioned previously and initialize the database container.

To get it running, just go to the root folder of the solution and execute:

```
docker compose up
```

### βΈοΈ Stop the containers

To stop the containers, just execute the following command in the root folder of the project:

```
docker compose down
```

[βοΈ Return to Index](#-index)

# π REST API

The API is only accessible by a registered user by providing an authentication token. For testing pourposes, a default **_user { username: admin, password: admin }_** (password is **already hashed**, so to login, you must send and object **like the previously described**)

### For the data structure

- A **customer** is defined by an schema like:

  - id: { type: String, required: true, unique: true },
  - name: { type: String, required: true },
  - surname: { type: String, required: true },
  - imgUrl: String,
  - createdBy: String,
  - lastModifiedBy: String,

- A **user** is defined by an schema like:

  - username: { type: String, required: true, unique: true },
  - password: { type: String, required: true },
  - isAdmin: { type: Boolean, required: true },

### As for the Authorization:

- A **non-admin** user can only:

  - List all customers in the database.
  - Get full customer information.
  - Create a new customer.
  - Update an existing customer.
  - Delete an existing customer.

- An **admin** can also:

  - Manage users:
  - Create users.
  - Delete users.
  - Update users (and so change its admin status).
  - List users.

  [βοΈ Return to Index](#-index)

## π API ENDPOINTS

The API has two main controllers, /users and /customers. Every endpoint requires a JWT provided through a bearer token with the 'Bearer' token prefix.

### To login and get the token:

- **GET /auth/login** -> Login and get JWT
  - **_@Recieves:_** { username: <>, password: <> }
  - **_@Returns:_** an object with the access token

### At /customers we have:

- **GET /customers** -> Lists all customers in the database.

  - **_@Recieves:_** nothing
  - **_@Returns:_** an array of customers

- **GET /customers/{id}** -> Gets a customer information.

  - **_@Recieves:_** a customer's {id}
  - **_@Returns:_** a customer object

- **POST /customers** -> Creates a new customer.

  - **_@Recieves:_** a customer's object, a customer object and, optionally, an img file
  - **_@Returns:_** the newly created customer object

- **PUT /customers/{id}** -> Updates an existing customer.

  - **_@Recieves:_** a customer's {id}, an object with the updated properties and, optionally, an img file
  - **_@Returns:_** the updated customer object

- **DELETE /customers/{id}** -> Deletes an existing customer.
  - **_@Recieves:_** a customer's {id}
  - **_@Returns:_** the deleted customer object

### At /users we have (/users endpoints require the authenticated user to be admin (isAdmin: true) ):

- **GET /users** -> Lists all users in the database.

  - **_@Recieves:_** nothing
  - **_@Returns:_** an array of users

- **GET /users/{id}** -> Gets a user information.

  - **_@Recieves:_** an user's {id}
  - **_@Returns:_** an user object

- **POST /users** -> Creates a new user.

  - **_@Recieves:_** an user object
  - **_@Returns:_** the newly created user

- **PUT /users/{id}** -> Updates an existing user (**_We can use this to either update user info, admin status, or BOTH_**).

  - **_@Recieves:_** an user's {id} and an object with the updated properties
  - **_@Returns:_** the updated user

- **DELETE /users/{id}** -> Deletes an existing user.

  - **_@Recieves:_** an user {id}
  - **_@Returns:_** the deleted user

  [βοΈ Return to Index](#-index)
