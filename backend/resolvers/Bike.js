/** @format */

const Bike = {
	bikeComments: async (parent, args, ctx, info) => {
		const comments = await ctx.ModelComment.find().where({ inBike: parent.id });
		return comments;
	},
};

module.exports = Bike;
