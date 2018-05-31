'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/expenseListDb'; //expenseListDb is db name
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-expenseListDb';
exports.PORT = process.env.PORT || 8080;