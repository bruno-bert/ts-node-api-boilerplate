import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    chats: [Chat!]! @auth
  }

  type Chat {
    id: ID!
    welcomeMessage: String!
    name: String!
    date: DateTime!
    accountId: String!
  }

  
`
