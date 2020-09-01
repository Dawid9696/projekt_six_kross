/** @format */
const getUserId = require("../utils/getUserId");

const Query = {
	users: (parent, args, ctx, info) => {
		return ctx.ModelUser.find();
	},
	user: (parent, args, ctx, info) => {
		return ctx.ModelUser.findById(args.id);
	},
	myProfile: (parent, args, ctx, info) => {
		const userId = getUserId(ctx.request);
		return ctx.ModelUser.findById(userId);
	},
	bikes: (parent, args, ctx, info) => {
		return ctx.ModelBike.find();
	},
	bike: (parent, args, ctx, info) => {
		return ctx.ModelBike.findById(args.id);
	},
};

module.exports = Query;
