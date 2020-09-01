/** @format */

const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const bikeSchema = new Schema({
	bikeName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate(value) {
			if (validator.isEmpty(value)) throw new Error("Please enter your bike name !");
		},
	},
	bikePrice: {
		type: Number,
		required: true,
		trim: true,
		min: 100,
		validate(value) {
			if (value <= 0) throw new Error("Please enter price !");
		},
	},
	bikeType: {
		type: String,
		trim: true,
		validate(value) {
			if (validator.isEmpty(value)) throw new Error("Please enter your bike type!");
		},
	},
	bikeModel: {
		type: String,
		trim: true,
		validate(value) {
			if (validator.isEmpty(value)) throw new Error("Please enter your bike model!");
		},
	},
	bikeYear: { type: Number, trim: true, min: 2000, max: 2030 },
	bikeRatio: { type: Number, trim: true, min: 0, max: 5 },
	bikeTransport: { type: Boolean },
	bikeColor: [{ type: String, trim: true }],
	bikePhotos: [{ type: String }],
	bikeDesc: { type: String, trim: true },
	bikeSale: { type: Boolean, default: false },
	bikeSaleNewPrice: { type: Number, trim: true },
	bikeWeight: { type: Number, trim: true },
	bikeFrame: { type: String, trim: true },
	bikeComments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("ModelBike", bikeSchema);
