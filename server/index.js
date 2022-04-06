const express = require('express');
const app = express();
const PORT = 3200;
const path = '/graphql';
const {ApolloServer, gql} = require('apollo-server-express');
const {Font} = require('./models/index');

Font.sequelize.sync().then(() => {
    console.log("sequelize success");
}).catch(err => {
    console.log("sequelize fail", err)
});

const typeDefs = gql`
type Font {
    id: Int
    name: String
    description: String
}

type Query {
    getFontData: [Font!]!
    getAllFont(id: Int!): Font
}

type Mutation {
    createFont(name: String!, description: String!): Font
    updateFont(id: Int, name: String!, description: String!): Font
    deleteFont(id: Int, name: String!, description: String!): Font
}
`;

const resolvers = {
    Query: {
        getFontData: async () => {
            const getFonts = await Font.findAll();
            return getFonts;
        },
        getAllFont: async (_, args) => {
            await context.Font.findOne()
            console.log(args);
            const {id} = args;
            const resultData = await Font.findOne({where: {id: id}});
            return resultData;
        }
    },
    Mutation: {
        createFont: async(_, {name, description}) => {
            const newFont = await Font.create({
                name,
                description
            });

            const font = await Font.findOne({where: {id: id}});

            return font;
        },
        updateFont: async (_, {id, name, description}) => {
            console.log(id)
            const font = await Font.findOne( { where: { id: id } });
            return font;
        },
        deleteFont: async (_, { id }) => {
            console.log(id)
            const oldFont = await Font.destroy({where: { id: id } });
            const font = await Font.findOne( { where: { id: id } });
            return font;
          },
    }
};

const server = new ApolloServer({ typeDefs, resolvers });


// The `listen` method launches a web server.
server.start().then(
    res => {
        server.applyMiddleware({ app, path });
        app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
      )
    }
);
