Customer Appointment API

This project is a practice application designed to explore and apply concepts using Apollo Server, GraphQL, and Prisma. The goal of the project is to create a simple API that allows you to:

Create a customer.
Link an appointment to a customer.
Retrieve a customer through their appointment.

This README provides an overview of the project, how to set it up, and how to use it.

Features
Create a Customer: Add a new customer to the database.
Create an Appointment: Schedule an appointment and link it to an existing customer.
Query Relationships: Fetch a customer through their associated appointment using GraphQL.
Technologies Used
Apollo Server: A GraphQL server for building APIs.
GraphQL: Query language for interacting with the API.
Prisma: ORM (Object-Relational Mapping) tool for managing database interactions.
SQLite: Lightweight database used for development purposes.
Prerequisites

Before running this project, ensure you have the following installed:

Node.js (v14 or higher)
npm or yarn
Prisma CLI
Getting Started
1. Clone the Repository
git clone https://github.com/natharaujos/api-graphql.git
cd customer-appointment-api

2. Install Dependencies

Install the required dependencies using npm or yarn:

npm install
# or
yarn install

3. Set Up the Database

This project uses SQLite as the database. Prisma will handle migrations and schema generation.

Initialize the .env file:
cp .env.example .env

Run the Prisma migration to set up the database schema:
npx prisma migrate dev --name init

Optionally, open Prisma Studio to inspect your database:
npx prisma studio

4. Start the Server

Run the Apollo Server:

npm run dev
# or
yarn dev


The server will start at http://localhost:4000.

GraphQL Schema

The GraphQL schema defines the types and operations available in the API. Below is an overview of the key types and queries/mutations:

Types
type Customer {
id: ID!
name: String!
appointments: [Appointment!]!
}

type Appointment {
id: ID!
startsAt: String!
endsAt: String!
customer: Customer!
}

Queries
Get All Customers:
query {
  customers {
    id
    name
    appointments {
      id
      startsAt
      endsAt
    }
  }
}

Get Appointment by ID (and its Customer):
query {
  appointment(id: 1) {
    id
    startsAt
    endsAt
    customer {
      id
      name
    }
  }
}

Mutations
Create a Customer:
mutation {
  createCustomer(name: "John Doe") {
    id
    name
  }
}

Create an Appointment:
mutation {
  createAppointment(
    startsAt: "2023-10-01T10:00:00Z"
    endsAt: "2023-10-01T11:00:00Z"
    customerId: 1
  ) {
    id
    startsAt
    endsAt
    customer {
      id
      name
    }
  }
}

Project Structure
├── prisma/
│   ├── schema.prisma     # Prisma schema defining the database models
│   └── migrations/       # Database migration files
├── src/
│   ├── server.js  # Entry point for the Apollo Server
│   ├── resolvers/        # GraphQL resolvers
│   ├── dtos/         # GraphQL schema definitions
├── .env                  # Environment variables (e.g., DATABASE_URL)
├── package.json          # Project metadata and dependencies
└── README.md             # Documentation

How It Works
1. Prisma Models

The database schema is defined in prisma/schema.prisma. Here's the structure:

model Customer {
id          Int           @id @default(autoincrement())
name        String
appointments Appointment[] // One-to-many relationship
}

model Appointment {
id          Int       @id @default(autoincrement())
startsAt    DateTime
endsAt      DateTime
customer    Customer   @relation(fields: [customerId], references: [id])
customerId  Int
}

2. Resolvers

Resolvers are implemented to handle GraphQL queries and mutations. For example:

Query: Fetch all customers and their appointments.
Mutation: Create a new customer or appointment.

Resolvers are located in src/resolvers/.

Example Usage
Create a Customer

Run the following mutation in the GraphQL Playground (http://localhost:4000):

mutation {
createCustomer(name: "Jane Doe") {
  id
  name
}
}

Create an Appointment

After creating a customer, link an appointment to them:

mutation {
createAppointment(
  startsAt: "2023-10-02T14:00:00Z"
  endsAt: "2023-10-02T15:00:00Z"
  customerId: 1
) {
  id
  startsAt
  endsAt
  customer {
    id
    name
  }
}
}

Get Appointment and Customer

Retrieve an appointment and its associated customer:

query {
appointment(id: 1) {
  id
  startsAt
  endsAt
  customer {
    id
    name
  }
}
}

Future Improvements
Add authentication and authorization.
Implement pagination for large datasets.
Add validation for input data (e.g., overlapping appointments).
Switch to a production-grade database like PostgreSQL.
License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

This project was built to practice working with Apollo Server, GraphQL, and Prisma. Special thanks to the creators and maintainers of these amazing tools!
