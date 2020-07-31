const axios = require('axios')


module.exports = async (symbol) => {
    try {
        const res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.API_KEY}`)

        return res
    } catch (e) {
        console.log(e)
    }
}