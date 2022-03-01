var logic = require('./logic');
var md5 = require('md5');
var route = function (app) {

	// app.get('/getmember',authenticate, function (request, response) {
	app.get('/getmember', function (request, response) {
		// global.user_id
		logic.getmember(request,response).then(function(res) {
			var val = {};
			if (res!= 'NULL') {
				val["res_code"] = "00";
				val["res_text"] = "แสดงข้อมูลสำเร็จ";
				val["res_result"] = res;
			}else{
				val["res_code"] = "01";
				val["res_text"] = "ไม่พบข้อมูล";
			}
			response.send(val);
		}).catch((err) => setImmediate(() => { response.send(err) }));
	});

	app.post('/savemembr', function (request, response) {
		var feeling_tx_name= request.body.feeling_tx_name;
		var feeling_tx_status= request.body.feeling_tx_status;

		logic.addfeeling(feeling_tx_name,feeling_tx_status)
		.then(function(res) {
			var val = {};
			if (res!= 'NULL') {
				val["res_code"] = "00";
				val["res_text"] = "บันทึกข้อมูลสำเร็จ";
			}else{
				val["res_code"] = "01";
				val["res_text"] = "บันทึกข้อมูลไม่สำเร็จ";
			}
			response.send(val);
		})
		.catch((err) => setImmediate(() => { response.send(err) }));
	});

	app.post('/updatemember', function (request, response) {
		var feeling_tx_id= request.body.feeling_tx_id;
		var feeling_tx_name= request.body.feeling_tx_name;
		var feeling_tx_status= request.body.feeling_tx_status;
		logic.updatemember(feeling_tx_id,feeling_tx_name,feeling_tx_status)
		.then(function(res) {
			var val = {};
			if (res!= 'NULL') {
				val["res_code"] = "00";
				val["res_text"] = "อัพเดตข้อมูลสำเร็จ";
			}else{
				val["res_code"] = "01";
				val["res_text"] = "อัพเดตข้อมูลไม่สำเร็จ";
			}
			response.send(val);
		})
		.catch((err) => setImmediate(() => { response.send(err) }));
	});

	app.post('/deletemember', function (request, response) {
		var feeling_tx_id= request.body.feeling_tx_id;
		logic.deletemember(feeling_tx_id)
		.then(function(res) {
			var val = {};
			if (res!= 'NULL') {
				val["res_code"] = "00";
				val["res_text"] = "ลบข้อมูลสำเร็จ";
			}else{
				val["res_code"] = "01";
				val["res_text"] = "ลบข้อมูลไม่สำเร็จ";
			}
			response.send(val);
		})
		.catch((err) => setImmediate(() => { response.send(err) }));
	});

}

function authenticate(req, res, next) {
				var response = {};
				if (req.headers.authorization != undefined) {
					logic.isValidApiKey(req.headers.authorization )
					.then(function(data) {
						var val = {};
						if (data != 'NULL') {
							global.user_id = data[0].user_id;
                            return next();
						}else{
							val["res_code"] = "01";
							val["res_text"] = "Api key ไม่ถูกต้อง ไม่มีสิทธิ์การเข้าถึงข้อมูล";
							val["api_key"] = req.headers.authorization;
							res.send(val);
						}
					})
					.catch((err) => setImmediate(() => { res.send(err) }));
				}else{
					response["res_code"] = "02";
					response["res_text"] = "ไม่พบ Api key";
					res.send(response);
				}
}


exports.route = route;
