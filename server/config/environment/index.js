//Production or Development JSON obj depending on NODE_ENV
module.exports = require('./'+(process.env.NODE_ENV || 'development')+'.json');