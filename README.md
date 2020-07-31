# stock-tracker-cli

## Development
1. Make sure you have [node](http://www.nodejs.org)
    - If you don't follow [these](https://nodejs.org/en/download/) instructions for your operating system
2. Clone the repo
3. Create your free API key at [Alpha Advantage](https://www.alphavantage.co/)
4. In the root directory create a `.env` file
   eg. 
   ```
   node_modules/
   src/
   .env
   ...
   package.json
   ```
  5. In your newly created `.env` add the following:
    ```
      API_KEY=<YOUR GENERATED API KEY>
    ```
  6. Run `./setup.sh`
  7. To start the app in a docker container run `./start.sh` in your terminal.
