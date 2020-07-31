const Table = require("cli-table3");

class GenericTable {
  constructor(options = {}) {
    this.table = new Table(options);
  }

  renderTable() {
    console.log(this.table.toString());
  }

  populateTable(data, fn = null) {
    if (fn) {
      fn(data, this);
    }
  }
}

module.exports = GenericTable;
