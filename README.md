# CRM Backend

This project simulates a REST API to manage customer data for a small shop. It consists of 2 Docker containers:

- crm-backend: REST API for the management of customers and users
- mongodb: MongoDB database image container

# Run this project

## Requirements

Docker must be installed in your system in order to get the containers up

## Run the containers

The project has in the root a docker-compose.yml which is the definition of the running system. It will create containers mentioned previously and initialize the database container.

To get it running, just go to the root folder of the solution and execute:

```
docker compose up
```

### Stop the containers

To stop the containers, just execute the following command in the root folder of the project:

```
docker compose down
```

# REST API

The API is only accessible by a registered user by providing an
authentication token.

A **customer** is defined by an schema like:

- id: { type: String, required: true, unique: true },
- name: { type: String, required: true },
- surname: { type: String, required: true },
- photo: String,
- createdBy: String,
- lastModifiedBy: String,

A **user** is defined by an schema like:

- username: { type: String, required: true, unique: true },
- password: { type: String, required: true },
- isAdmin: { type: Boolean, required: true },

A **non-admin** user can only:

- List all customers in the database.
- Get full customer information.
- Create a new customer.
- Update an existing customer.
- Delete an existing customer.

An **admin** can also:

- Manage users:
- Create users.
- Delete users.
- Update users (and so change its admin status).
- List users.

## API ENDPOINTS

The API has two main controllers, /users and /customers. Every endpoint requires a JWT provided through a bearer token with the 'Bearer' token prefix.

To login and get the token:

- **GET /auth/login** -> Login and get JWT
  - **_@Recieves:_** { username: <>, password: <> }
  - **_@Returns:_** an object with the access token

At /customers we have:

- **GET /customers** -> Lists all customers in the database.

  - **_@Recieves:_** nothing
  - **_@Returns:_** an array of customers

- **GET /customers/{id}** -> Gets a customer information.

  - **_@Recieves:_** a customer {id}
  - **_@Returns:_** a customer object

- **POST /customers** -> Creates a new customer.

  - **_@Recieves:_** a customer object
  - **_@Returns:_** the newly created customer

- **PUT /customers/{id}** -> Updates an existing customer.

  - **_@Recieves:_** a customer {id}
  - **_@Returns:_** the updated customer

- **DELETE /customers/{id}** -> Deletes an existing customer.
  - **_@Recieves:_** a customer {id}
  - **_@Returns:_** the deleted customer

The /users endpoints requires the authenticated user to be admin (isAdmin: true)
At /users we have:

- **GET /users** -> Lists all users in the database.

  - **_@Recieves:_** nothing
  - **_@Returns:_** an array of users

- **GET /users/{id}** -> Gets a user information.

  - **_@Recieves:_** an user {id}
  - **_@Returns:_** an user object

- **POST /users** -> Creates a new user.

  - **_@Recieves:_** an user object
  - **_@Returns:_** the newly created user

- **PUT /users/{id}** -> Updates an existing user.

  - **_@Recieves:_** an user {id}
  - **_@Returns:_** the updated user

- **DELETE /users/{id}** -> Deletes an existing user.
  - **_@Recieves:_** an user {id}
  - **_@Returns:_** the deleted user
