require("dotenv").config();
const dbConstants = require("./dbConstants.json");

module.exports = {
  SELLER_ADDRESS: process.env.SELLER_ADDRESS,
  NODE_ENV: process.env.NODE_ENV,
  DB_CONSTANTS: dbConstants,
  BLOCKCHAIN: {
    MINTING_CALLBACK_API_KEY: process.env.MINTING_CALLBACK_API_KEY,
    ROYALTY_RECEIVER:  process.env.ROYALTY_RECEIVER,
    CONTRACT_AUCTION_ADDRESS:  process.env.CONTRACT_AUCTION_ADDRESS,
    MINTING_API:  process.env.MINTING_API,
    MINTING_API_KEY:  process.env.MINTING_API_KEY
  },
  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  },
  DB: {
    USERNAME: process.env.DB_USERNAME || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || 'admin',
    NAME: process.env.DB_NAME || 'test-task',
    HOST: process.env.DB_HOST || 'localhost',
    DIALECT: process.env.DB_DIALECT || 'postgres',
    PORT: process.env.DB_PORT || '5432'
  },
  JWT: {
    ACCESS_TOKEN: {
      SECRET_KEY: process.env.ACCESS_TOKEN_SECRET || "sec#$@$$re89tKey",
      EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || 86400
    },
    REFRESH_TOKEN: {
      SECRET_KEY: process.env.REFRESH_TOKEN_SECRET || "se$#etKADA56D%ey",
      EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || 907200
    }
  },
  KEYS: {
    CMC_PRO_API_KEY: process.env.CMC_PRO_API_KEY,
    CMC_BASE_URL: process.env.CMC_BASE_URL,
    CC_API_KEY: process.env.CC_API_KEY
  },
  INTERVAL: {
    EXCHANGE_RATE_INVERVAL: process.env.EXCHANGE_RATE_INVERVAL || '10m'
  }
};
