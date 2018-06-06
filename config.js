'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/expenseListDb' || 'mongodb://testuser:123456a@ds141320.mlab.com:41320/expense-db'
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-expenseListDb'|| 'mongodb://testuser:123456a@ds139920.mlab.com:39920/test-exp-db'
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'Roger';	//should just be in .env?
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '9d';