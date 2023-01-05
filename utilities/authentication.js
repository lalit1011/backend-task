const jwt = require('jsonwebtoken');
const { JWT: { ACCESS_TOKEN, REFRESH_TOKEN } } = require('../config');

/**
 * @param {*} payload
 * @description To create access token with payload
 */
const generateAccessToken = async (model = 'adminUser', payload) => {

  const tokenData = { id: payload.id, email: payload.email, role: payload.role }

  const signedJWTToken = jwt.sign(model === 'adminUser' ? { adminUser: tokenData } : { user: tokenData },
    ACCESS_TOKEN.SECRET_KEY, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}` || '1y' })

  return { accessToken: signedJWTToken, expiresIn: ACCESS_TOKEN.EXPIRY }
};
/**
 * @param {*} payload
 * @description To refresh access token with payload
 */
const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, REFRESH_TOKEN.SECRET_KEY,
    { expiresIn: `${REFRESH_TOKEN.EXPIRY}s` });
  return {
    refreshToken: token,
    refreshExpiresIn: REFRESH_TOKEN.EXPIRY
  };
};
/**
 * @param jwtString
 * @param secretOrPublicKey
 * @description To verify access or refresh token

 */
const verifyAuthToken = async (jwtString) => {
  return jwt.verify(jwtString, ACCESS_TOKEN.SECRET_KEY, (err, decoded) => {
    return err ? err.message : decoded; // if token expired
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAuthToken
};
