/** @format */

const Comment = {
	commentedBy: async (parent, args, ctx, info) => {
		const user = await ctx.ModelUser.findById(parent.commentedBy);
		return user;
	},
	inBike: async (parent, args, ctx, info) => {
		const bike = await ctx.ModelBike.findById(parent.inBike);
		return bike;
	},
};

module.exports = Comment;
