const db=require("../Connect/Conectdb");
const bcrypt = require('bcrypt');
const Admin = function (Admin) {
    this.IDAdmin = Admin.IDAdmin;
    this.AdminName = Admin.AdminName;
    this.PassWord = Admin.PassWord;
    this.Email = Admin.Email;
    this.Phone = Admin.Phone;
}
Admin.get_all = function (result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("SELECT * FROM Admin", function (err, Admin) {
        if (err) {
            result(null);
        } else {
            result(Admin);
        }
    });
}

Admin.getByid = function (id, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("SELECT * FROM Admin WHERE IDAdmin = ?", id, function (err, Admin) {
        if (err || Admin.length == 0) {
            result(null);
        } else {
            result(Admin[0]);
        }
    });
}

Admin.remove = function (id, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("DELETE FROM Admin WHERE IDAdmin = ?", id, function (err, IDAdmin) {
        if (err) {
            result(null);
        } else {
            result("XOA THANH CONG Admin CO ID " + id);
        }
    });
}

Admin.create = function (data, result) {
    // Hash mật khẩu trước khi thêm vào cơ sở dữ liệu
    bcrypt.hash(data.PassWord, 10, function (err, hashedPassword) {
        if (err) {
            result(null);
        } else {
            // Thay thế mật khẩu chưa mã hóa bằng mật khẩu đã được mã hóa
            data.PassWord = hashedPassword;

            db.query("INSERT INTO Admin SET ?", data, function (err, Admin) {
                if (err) {
                    result(null);
                } else {
                    result({ IDAdmin: Admin.insertId, ...data });
                }
            });
        }
    });
}
// Admin.create=function(data,result){
//     if (db.state === 'disconnected') {
//         db.connect();
//     }
//     db.query("INSERT INTO Admin SET ?", data,function(err,Admin){
//         if(err){
//             result(null);
//         }
//         else{
//             result({IDAdmin: Admin.insertId, ...data});
//         }
//     });
// }
Admin.update=function(array,result){
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("UPDATE Admin SET AdminName=?,PassWord=?,Email=?,Phone=? WHERE IDAdmin=?", [array.AdminName,array.PassWord,array.Email,array.Phone,array.IDAdmin],function(err,Admin){
        if(err){
            result(null);
        }
        else{
            result(array);

        }
    });
}
module.exports=Admin;