var mysql      = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database: "stock"
});


let stockModel = {};

stockModel.getProducttypes = (callback) => {
	if (connection) {
		connection.query("SELECT * FROM producttype ORDER BY id", (err, rows) => {
			if (err) {
				throw err;
			} else {
				callback(null, rows);
			}
		})
	}
}

stockModel.insertProducttype = (producttypeData, callback) => {
	if (connection) {
		connection.query("INSERT INTO producttype SET ?", producttypeData, (err, rows) => {
			if (err) {
				throw err;
			} else {
				callback(null, rows);
			}
		})
	}
}


module.exports = stockModel;