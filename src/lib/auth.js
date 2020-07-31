const Configstore = require('configstore');
const inquirer = require('./inquirer');
const pkg = require('../../package.json');

const conf = new Configstore(pkg.name)

module.exports = {
    setApiKey: async () => {
        const credentials = await inquirer.askAPIKeyCredentials()
        conf.set('alphaApiKey', credentials.apiKey)
        return credentials.apiKey
    },
    getAPIKey: () => {
        return conf.get('alphaApiKey')
    }
}
