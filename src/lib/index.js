const auth = require('./auth')
const inquirer = require('./inquirer');
const stocks = require('./stocks');
const GenericTable = require('./table');

module.exports = {
    auth,
    inquirer,
    stocks,
    GenericTable
}