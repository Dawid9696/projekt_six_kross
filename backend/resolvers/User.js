/** @format */

const User = {
	shoppingCart: async (parent, args, ctx, info) => {
		const bikes = parent.shoppingCart.map((bike) => {
			return ctx.ModelBike.findById(bike);
		});
		return bikes;
	},
};

module.exports = User;
