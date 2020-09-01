/** @format */

const Query = {
	users: (parent, args, ctx, info) => {
		return ctx.ModelUser.find();
	},
	user: (parent, args, ctx, info) => {
		return ctx.ModelUser.findById(args.id);
	},
	bikes: (parent, args, ctx, info) => {
		return ctx.ModelBike.find();
	},
	bike: (parent, args, ctx, info) => {
		return ctx.ModelBike.findById(args.id);
	},
};

module.exports = Query;
