const inquirer = require('inquirer');

module.exports = {
    askIfShouldQuit: () => {
        const questions = [
            {
                name: 'shouldQuit',
                type: 'list',
                message: 'Is that all?',
                choices: [
                    "Yes",
                    "No"
                ]
            }
        ]

        return inquirer.prompt(questions)
    },
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
    },
    askTimeSeries: () => {
        const questions = [
            {
                name: 'timeSeries',
                type: 'list',
                message: "Select time series (intraday, daily, etc.) Default is intraday.",
                default: "TIME_SERIES_INTRADAY",
                choices: [
                    "TIME_SERIES_INTRADAY",
                    "TIME_SERIES_DAILY",
                    "TIME_SERIES_DAILY_ADJUSTED",
                    "TIME_SERIES_WEEKLY",
                    "TIME_SERIES_WEEKLY_ADJUSTED",
                    "TIME_SERIES_MONTHLY"
                ]
            }
        ]

        return inquirer.prompt(questions);
    }
}
