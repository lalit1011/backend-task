'use strict';

const config = require('../config');
const loggerUtil = require('./logger');
const messageUtil = require('./message');

exports.successResponse = (res, message, result) => {
  const response = {
    success: true,
    message: message
  };

  if (result) {
    response.result = result;
  }

  res.status(config.HTTP_STATUS_CODES.OK).send(response);
};

exports.notFoundResponse = (res, message) => {
  const response = {
    success: false,
    message: message
  };

  res.status(config.HTTP_STATUS_CODES.NOT_FOUND).send(response);
};

exports.serverErrorResponse = (res, error) => {
  loggerUtil.error({
    message: error.toString(),
    level: 'error'
  });
  res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
    success: false,
    error: error.toString(),
    message: messageUtil.serverError
  });
};

exports.validationErrorResponse = (res, errors, message = messageUtil.validationErrors) => {
  res.status(config.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
    success: false,
    errors: {
      error: errors,
      message: message,
    },
    message: message
  });
};

exports.badRequestErrorResponse = (res, message, errors) => {
  res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
    success: false,
    message: message,
    errors: errors
  });
};

exports.authorizationErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.UNAUTHORIZED).send({
    success: false,
    message: message
  });
};

exports.accessErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.FORBIDDEN).send({
    success: false,
    message: message
  });
};
