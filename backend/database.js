//creates databaes to store data
//tables and related data will be under this database name;

const mongoose = require('mongoose');

var learndb = mongoose.connection;
learndb.on('error', console.error.bind(console, 'Kai needs to fix something probably'));
learndb.once('open', function() {
  console.log('Nice job connecting to the server Kai');
})
mongoose.connect(`mongodb://localhost/learndb`);

module.exports = learndb;
