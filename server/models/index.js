const mongoose = require('mongoose');

// Require all models to register them with Mongoose
require('./User');
require('./Category');
require('./Article');
require('./Video');
require('./Comment');
require('./Report');
require('./Video');
module.exports = mongoose;