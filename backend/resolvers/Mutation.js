/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const getUserId = require("../utils/getUserId");

const Mutation = {
	logIn: async (parent, args, ctx) => {
		const user = await ctx.ModelUser.find().where({ email: args.email });
		if (!user) throw new Error("User do not exist!");
		const isMatch = await bcrypt.compare(args.password, user[0].password);
		if (!isMatch) throw new Error("No match!");
		const newUser = user[0];
		return { newUser, token: jwt.sign({ userId: user[0].id }, "secret") };
	},
	createUser: async (parent, args, ctx) => {
		try {
			args.userData.password = await bcrypt.hash(args.userData.password, 10);
			const newUser = new ctx.ModelUser({ ...args.userData });
			await newUser.save();
			return { newUser, token: jwt.sign({ userId: newUser.id }, "secret") };
		} catch (err) {
			throw new Error(err);
		}
	},
	updateUser: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		if (user) {
			const update = { ...args.updateData };
			await ctx.ModelUser.findByIdAndUpdate(userId, update);
			return user;
		}
		throw new Error("Can not update !");
	},
	createBike: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		if (!userId) throw new Error("Please authenticate !");
		const user = await ctx.ModelUser.findById(userId);
		if (user) {
			const newBike = new ctx.ModelBike({ ...args.bikeData });
			await newBike.save();
			return newBike;
		}
		throw new Error("Error!!!");
	},
	createComment: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		const Bike = await ctx.ModelBike.findById(args.commentData.inBike);
		if (user && Bike) {
			const newComment = new ctx.ModelComment({ ...args.commentData });
			newComment.commentedBy = userId;
			await Bike.bikeComments.push(newComment._id);
			await newComment.save();
			await Bike.save();
			return newComment;
		}
		throw new Error("Error!!!");
	},
	updateBike: async (parent, args, ctx) => {
		const userId = getUserId(ctx.request);
		if (!userId) throw new Error(err);
		const update = { ...args.updateBike };
		try {
			await ctx.ModelBike.findByIdAndUpdate(args.id, update);
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteUser: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		try {
			await ctx.ModelUser.findByIdAndDelete(userId);
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteBike: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const User = await ctx.ModelUser.findById(userId);
		if (!User.admin) throw new Error("Can not delete Bike!");
		try {
			await ctx.ModelBike.findByIdAndDelete(args.id);
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteComment: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const comment = await ctx.ModelComment.findById(args.id);
		if (comment.commentedBy != userId) throw new Error("Can not delete comment!");
		try {
			await comment.remove();
			return comment;
		} catch (err) {
			throw new Error(err);
		}
	},
	addToShoppingCart: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		if (!userId) throw new Error("User did not find!");
		try {
			await user.shoppingCart.push(args.id);
			await user.save();
			return user;
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteFromShoppingCart: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		if (!userId) throw new Error("User did not find!");
		try {
			const userShoppingCart = await user.shoppingCart.filter((item) => {
				return item != args.id;
			});
			user.shoppingCart = userShoppingCart;
			await user.save();
			return user;
		} catch (err) {
			throw new Error(err);
		}
	},
};
module.exports = Mutation;
