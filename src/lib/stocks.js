const axios = require('axios');
const inquirer = require("./inquirer");

module.exports = {
  getSymbol: async () => {
    const symbol = await inquirer.askStockSymbol();
    return symbol;
  },
  getStockIntervalData: (stockData) => {
    const newObj = {};
    Object.keys(stockData).forEach(time => {
        const splitTime = time.split(' ')[1]
        newObj[splitTime] = stockData[time]
    })

    return newObj;
  },
  fetchStocks: async ({ symbol, key }) => {
    try {
      const res = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${key}`
      );
      return res;
    } catch (e) {
      console.log(e);
    }
  },
};
