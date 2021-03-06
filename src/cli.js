#!/usr/bin/env node
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const CLI = require("clui");

const Spinner = CLI.Spinner;
const auth = require("./lib/auth");
const GenericTable = require("./lib/table");
const stocks = require("./lib/stocks");
const apiResponseTitles = require('./constants/apiResponseTitles');

const table = new GenericTable({
  head: ["Time", "Open", "High", "Low", "Close", "Volume"],
});

clear();

console.log(
  chalk.blue(figlet.textSync("Stonk Tracker", { horizontalLayout: "full" }))
);

const getApiKey = async () => {
  if (process.env.API_KEY && process.env.DEV) {
    return process.env.API_KEY;
  } else {
    let key = auth.getAPIKey();
    if (key) {
      return key;
    }

    key = await auth.setApiKey();
    return key;
  }
};

const apiResponseTitle = (timeSeriesType) => {
  switch(timeSeriesType) {
    case "TIME_SERIES_INTRADAY":
      return apiResponseTitles.TIME_SERIES_INTRADAY
    case "TIME_SERIES_DAILY":
      return apiResponseTitles.TIME_SERIES_DAILY
    case "TIME_SERIES_DAILY_ADJUSTED":
      return apiResponseTitles.TIME_SERIES_DAILY
    case "TIME_SERIES_WEEKLY":
      return apiResponseTitles.TIME_SERIES_WEEKLY
    case "TIME_SERIES_WEEKLY_ADJUSTED":
      return apiResponseTitles.TIME_SERIES_WEEKLY_ADJUSTED
    case "TIME_SERIES_MONTHLY":
      return apiResponseTitles.MONTHLY_TIME_SERIES
  }
}

const run = async () => {
  try {
    const status = new Spinner("Fetching and organizing data, please wait...");
    const key = await getApiKey();
    const { symbol } = await stocks.getSymbol();
    const { timeSeries } = await stocks.getTimeSeries()
    status.start();

    const stockData = await stocks.fetchStocks({
      symbol,
      key,
      timeSeries
    });
    const data = stocks.getStockIntervalData(
      stockData.data[apiResponseTitle(timeSeries)]
    );

    table.populateTable(data, (data, self) => {
      const stockData = Object.keys(data).map((key) => {
        return [key, ...Object.values(data[key])];
      });

      self.table.push(...stockData);
    });
    status.stop();
    table.renderTable();
  } catch (e) {
    console.log(e);
  }
};

run();
