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
		return (
			ctx.ModelBike.find()
				.where("bikePrice")
				.gte(args.queries.lowPrice)
				.lte(args.queries.highPrice)
				.sort({ bikePrice: args.queries.sort })
				// .where({ bikeType: args.queries.type })
				// .where({ bikeModel: args.queries.model })
				// .where({ bikeColor: args.queries.color })
				// .where({ bikeYear: args.queries.year })
				.limit(args.queries.limit)
				.skip(args.queries.skip)
		);

		// { bikeFrame: args.queries.frame }
	},
	bike: (parent, args, ctx, info) => {
		return ctx.ModelBike.findById(args.id);
	},
};

module.exports = Query;
