'use strict'

// required environment variables

var environments = [
    'DEV',
    'PORT'
  ];

/* environments.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`)
  };
}); */

const config = {
  env: environments[0],
 /*  logger: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === 'true' : false
  }, */
  server: {
    port: "4747"
  },
  dataBaseURL: 'mongodb://localhost:27017/flexTradeDB'
}

module.exports = config