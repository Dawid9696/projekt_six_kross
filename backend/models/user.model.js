/** @format */

const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	admin: { type: Boolean, default: false },
	name: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			console.log(!validator.isEmpty(value));
			if (validator.isEmpty(value)) throw new Error("Please enter your name !");
			if (!validator.isAlpha(value)) throw new Error(`Name: ${value} can not contain numbers !`);
		},
	},
	surname: { type: String, required: true, trim: true, minlength: 1, maxlength: 15 },
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate(value) {
			if (validator.isEmpty(value) || !validator.isEmail(value)) {
				throw new Error(`Value ${value} is not an email!`);
			}
		},
	},
	password: { type: String, required: true, trim: true, minlength: 3 },
	photo: { type: String, trim: true },
	creditCard: {
		type: String,
		trim: true,
		validate(value) {
			if (!validator.isCreditCard(value) || validator.isEmpty(value)) {
				throw new Error(`Value ${value} is not a credit card format!`);
			}
		},
	},
	postalCode: { type: String, trim: true },
	numberOfHome: { type: Number, trim: true },
	street: { type: String, trim: true },
	city: { type: String, trim: true },
	shoppingCart: [{ type: Schema.Types.ObjectId, ref: "Bike" }],
});

module.exports = mongoose.model("ModelUser", userSchema);
