const inquirer = require('inquirer');

module.exports = {
    askAPIKeyCredentials: () => {
        const questions = [
            {
                name: 'apiKey',
                apiKey: 'input',
                message: "Enter your Alpha Advantage API Key",
                validate: (value) => {
                    if (value.length) {
                        return true 
                    } else {
                        return "Please enter your API Key"
                    }
                }
            }
        ]

        return inquirer.prompt(questions);
    },
    askStockSymbol: () => {
        const questions = [
            {
                name: 'symbol',
                type: 'input',
                message: 'Enter stock symbol',
                validate: (value) => {
                    if (value.length) {
                        return true 
                    } else {
                        return "Please enter your stock symbol"
                    }
                }
            }
        ]
        return inquirer.prompt(questions);
    }
}
