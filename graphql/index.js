const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const fetch = require('node-fetch');

const typeDefs = `#graphql
  type Query {
    suggestions(query: String!): [String]
  }
`;

const resolvers = {
  Query: {
    suggestions: async (_, { query }) => {
      try {
        const response = await fetch(
          `http://server:5000/api/suggestions?query=${encodeURIComponent(query)}`
        );
        return response.json();
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        return [];
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});