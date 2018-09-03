var nodemailer = require('nodemailer');





exports.generateUUID = function () {
    return new Promise(function (resolve, reject) {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        resolve(uuid);
    });
}


exports.sendEmail = function (feeling_tx_name, feeling_tx_status) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adventureearth.ibusiness@gmail.com',
            pass: 'ibusiness02'
        }
    });
    var mailOptions = {
        from: 'adventureearth.ibusiness@gmail.com',
        to: 'sittikorn.n@ibusiness.co.th',
        subject: 'Sending Email using Node.js',
        // text: 'That was easy!'
        html: '<h1>Welcome</h1><p>That was easy!</p>'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        console.log(123456);

        if (error) {
            console.log(error);
            return new Promise(function (resolve, reject) {
                resolve('false');
            });
        } else {
            console.log('Email sent: ' + info.response);
            return new Promise(function (resolve, reject) {
                resolve('true');
            });
        }
    });
};