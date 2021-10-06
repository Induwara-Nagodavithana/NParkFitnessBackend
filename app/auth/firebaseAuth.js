
const admin = require('../config/firebase-config');

class FireAuth {
	async decodeToken(req, res, next) {
		const token = req.headers.authorization.split(' ')[1];
		console.log("token")
		console.log(token)
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				console.log("decodeValue")
				console.log(decodeValue)
				return next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
			console.log(e)
			return res.json({ message: 'Internal Error' });
		}
	}
}

module.exports = new FireAuth();