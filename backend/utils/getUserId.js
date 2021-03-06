/** @format */

const jwt = require("jsonwebtoken");

const getUserId = (request) => {
	const header = request.request.headers.authorization;
	if (!header) throw new Error("Authentication required!");
	const token = header.replace("Bearer ", "");
	const decoded = jwt.verify(token, "secret");
	return decoded.userId;
};

module.exports = getUserId;
