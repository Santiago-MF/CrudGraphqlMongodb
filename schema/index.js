// Nos traemos la funciónn que utilizaremos de la dependencia de graphql
const { buildSchema } = require("graphql")

// Utilizamos este método para crear nuestros esquemas de la siguiente forma
module.exports = buildSchema(`

  type Product {
    _id: ID!
    title: String!
    description: String!
    price: String!
    createdAt: String!
  }

  input ProductInput {
    title: String!
    description: String!
    price: String!
  }

  type Query {
    products:[Product!]
  }

  type Mutation {
    createProduct(product:ProductInput): Product,
    deleteProduct(_id: String): String,
    updateProduct(_id: String, price: String): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)