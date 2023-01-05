const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt')
const { AdminUser, UserRole } = require('../models/index')
const { JWT: { ACCESS_TOKEN } } = require('../config');


exports.passportJWTAuthentication = (passportJwt) => {
	passportJwt.use(new JWTStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: ACCESS_TOKEN.SECRET_KEY
	}, (jwtPayload, done) => {

		if (typeof (jwtPayload.user) !== 'undefined') {
			AdminUser.findOne({ where: { id: jwtPayload.user.id }, raw: true })
				.then((user) => done(null, { type: 'user', model: user }))
				.catch((error) => done(error))
		} else if (typeof (jwtPayload.adminUser) !== 'undefined') {

			AdminUser.findOne({ where: { id: jwtPayload.adminUser.id }, raw: true })
				.then(async (adminUser) => {
					if (!adminUser?.roleId) {
						let role = await UserRole.findOne({ userId: adminUser.id })
						adminUser.roleId = role.roleId
					}
					return done(null, { type: 'adminUser', model: adminUser })
				})
				.catch((error) => done(error))
		} else {
			done(null, null)
		}
	}))
}
