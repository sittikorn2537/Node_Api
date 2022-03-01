var mysql = require("mysql");
var date = require('date-and-time');
var req = require("request");
var cons = require("../config/constants");
var randomstring = require("randomstring");
var func = require('./function');
var now = new Date();


var pool = mysql.createPool({
	host: cons.host,
	user: cons.user,
	password: cons.password,
	database: cons.database
});



exports.getmember = function (request, response) {

	return new Promise(function (resolve, reject) {
		pool.getConnection(function (err, con) {
			if (err) {
				resolve('NULL');
			} else {
				con.query("SELECT * FROM data_user_account", function (err, result, fields) {
					if (err) {
						// return reject('NULL');
						resolve('NULL');
					} else {
						resolve(result);
					};
				});
			}
		});
	});
};

exports.addfeeling = function (feeling_tx_name, feeling_tx_status) {
	return new Promise(function (resolve, reject) {
		pool.getConnection(function (err, con) {
			if (err) {
				return reject('NULL');
			} else {
				var sql = "INSERT INTO `data_feeling_tx` ( `feeling_tx_name`, `feeling_tx_date`, `feeling_tx_status`) VALUES ( 'aaaas', now(), '5');"
				con.query(sql, function (err, result, fields) {
					if (err) {
						return reject('NULL');
					} else {
						resolve(true);
					};
				});
			}
		});
	});
};

exports.updatemembr = function (feeling_tx_id, feeling_tx_name, feeling_tx_status) {
	return new Promise(function (resolve, reject) {
		pool.getConnection(function (err, con) {
			if (err) {
				return reject('NULL');
			} else {
				var sql = "	UPDATE `data_feeling_tx` SET `feeling_tx_name` = '" + feeling_tx_name + "',`feeling_tx_status` = '" + feeling_tx_status + "' WHERE `data_feeling_tx`.`feeling_tx_id` = " + feeling_tx_id + ";"
				con.query(sql, function (err, result, fields) {
					if (err) {
						return reject('NULL');
					} else {
						resolve(true);
					};
				});
			}
		});
	});
};

exports.deletemember = function (feeling_tx_id) {
	return new Promise(function (resolve, reject) {
		pool.getConnection(function (err, con) {
			if (err) {
				return reject('NULL');
			} else {
				var sql = "DELETE FROM `data_feeling_tx` WHERE `data_feeling_tx`.`feeling_tx_id` = " + feeling_tx_id;
				con.query(sql, function (err, result, fields) {
					if (err) {
						return reject('NULL');
					} else {
						resolve(true);
					};
				});
			}
		});
	});
};


exports.isValidApiKey =  function (api_key) {
	// $stmt = $this->conn->prepare("SELECT user_id from data_user_account WHERE user_api_key = '$api_key' ");
	// $stmt->execute();
	// $stmt->store_result();
	// $num_rows = $stmt->num_rows;
	// $stmt->close();
	// return $num_rows > 0;

	return new Promise(function (resolve, reject) {

	
		pool.getConnection(function (err, con) {
			if (err) {
				 resolve('NULL');
			} else {
				var sql = "SELECT user_id from data_user_account WHERE user_api_key = '"+api_key+"' ";
				con.query(sql, function (err, result, fields) {
					if (err || result.length==0) {
						resolve('NULL');
					} else {
						resolve(result);
					};
				});
			}
		});
	});
}



function getIP(request) {
	return request.header("x-forwarded-for") || request.connection.remoteAddress;
}


