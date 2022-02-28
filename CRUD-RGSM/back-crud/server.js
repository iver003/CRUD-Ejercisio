const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const PORT = 4000;

//Models:
const models = require("./sequelize/models/index");
models.sequelize.authenticate().then(() => {
	//Conexion a la BD
	console.log("================= Estas conectado a la BD ================= ");
});
models.sequelize.sync(); //Sincronizacion de los modelos con la BD
//--------------------

//-----------------GraphQL
//Resolvers
import resolvers from "./graphQL/resolvers/resolvers";

//TypeDefs
import typeDefs from "./graphQL/typeDefs/typeDefs";
//------------------

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });
const app = express();

server.start().then((res) => {
	server.applyMiddleware({ app });
	app.listen({ port: PORT }, () => console.log(`================= Corriendor Servidor Apollo en http://localhost:${PORT}` + server.graphqlPath));
});
