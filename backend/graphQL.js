/** @format */

const { GraphQLServer } = require("graphql-yoga");
require("dotenv").config();

//MONGOOSE CONNECTION
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	dbName: "Kross",
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully !");
});

//IMPORTED MODELS
const ModelUser = require("./models/user.model");
const ModelBike = require("./models/bike.model");
const ModelComment = require("./models/comment.model");

//IMPORTED TYPES
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Comment = require("./resolvers/Comment");
const User = require("./resolvers/User");
const Bike = require("./resolvers/Bike");

//SERVER
const server = new GraphQLServer({
	typeDefs: "./schema.graphql",
	resolvers: { Query, Mutation, User, Bike, Comment },
	context(request) {
		return { ModelUser, ModelBike, ModelComment, request };
	},
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
