const axios = require('axios');
const inquirer = require("./inquirer");
const moment = require('moment');

module.exports = {
  getSymbol: async () => {
    const symbol = await inquirer.askStockSymbol();
    return symbol;
  },
  getStockIntervalData: (stockData) => {
    const newObj = {};
    Object.keys(stockData).forEach(time => {
        let key
        if (time.indexOf(' ') > -1) {
          key = time.split(' ')[1]
        } else {
          key = time
        }

        newObj[key] = stockData[time]
    })

    return newObj;
  },
  fetchStocks: async ({ symbol, key, timeSeries }) => {
    try {
      const res = await axios.get(
        `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&interval=5min&apikey=${key}`
      );
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  getTimeSeries: async () => {
    const timeSeries = await inquirer.askTimeSeries();
    
    return timeSeries
  }
};
