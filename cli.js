#!/usr/bin/env node
const yargs = require('yargs')
const Table = require('cli-table3');
const clear = require('clear')
const helpers = require('./helpers');
const fetchStocks = helpers.fetchStocks
 
const args = yargs.options({
  symbol: {
    type: "string",
    demandOption: true,
    alias: "s",
  },
}).argv;

const table = new Table({
  head: ["Time", "Open", "High", "Low", "Close", "Volume"],
});

const populateTable = (data) => {
  const stockData = Object.keys(data).map((key) => {
    return [key, ...Object.values(data[key])];
  });

  table.push(...stockData);
};

const getStonks = async (symbol) => {
  try {
    const stockData = await fetchStocks(symbol);
    return stockData;
  } catch (e) {
    console.log(e);
  }
};

const getTime = (time) => time.split(" ")[1];

const getStockIntervalData = (stockData) => {
  const newObj = {};
  Object.keys(stockData).forEach((time) => {
    newObj[getTime(time)] = stockData[time];
  });

  return newObj;
};

const hasSymbol = (data) => Object.keys(data).includes("s");

const execute = async () => {
  try {
    if (hasSymbol(args)) {
        const res = await getStonks(args['s']);
        const data = getStockIntervalData(res.data['Time Series (5min)'])
        populateTable(data)
    }

    console.log(table.toString());
  } catch (e) {
      console.log(e)
  }
};

execute()
