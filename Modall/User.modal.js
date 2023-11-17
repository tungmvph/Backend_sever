const db=require("../Connect/Conectdb");
const bcrypt = require('bcrypt');
const Users=function(Users){
    this.IDUser=Users.IDUser;
    this.UserName=Users.UserName;
    this.PassWord=Users.PassWord
    this.Email=Users.Email;
    this.Birthday=Users.Birthday;
}

Users.get_all=function(result){
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("SELECT * FROM Users", function (err, Users) {
        if (err) {
            result(null);
        } else {
            result(Users);
        }
    });
}

Users.getByid = function (id, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("SELECT * FROM Users WHERE IDUser = ?", id, function (err, Users) {
        if (err || Users.length == 0) {
            result(null);
        } else {
            result(Users[0]);
        }
    });
}


Users.remove = function (id, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("DELETE FROM Users WHERE IDUser = ?", id, function (err, IDUser) {
        if (err) {
            result(null);
        } else {
            result("XOA THANH CONG User CO ID " + id);
        }
    });
}


Users.create=function(data,result){
    // Hash mật khẩu trước khi thêm vào cơ sở dữ liệu
    bcrypt.hash(data.PassWord, 10, function (err, hashedPassword) {
        if (err) {
            result(null);
        } else {
            // Thay thế mật khẩu chưa mã hóa bằng mật khẩu đã được mã hóa
            data.PassWord = hashedPassword;
    db.query("INSERT INTO Users SET ?", data,function(err,Users){
        if(err){
            result(null);
        }
        else{
            result({IDUser: Users.insertId, ...data});
        }
    });
        }
    });
}

Users.update=function(array,result){
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("UPDATE Users SET UserName=?,PassWord=?,Email=?,Birthday=? WHERE IDUser=?", [array.UserName,array.PassWord,array.Email,array.Birthday,array.IDUser],function(err,Admin){
        if(err){
            result(null);
        }
        else{
            result(array);

        }
    });
}
Users.search = function (keyword, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    const query = "SELECT * FROM Users WHERE UserName LIKE ? OR IDUser = ?";
    const searchKeyword = `%${keyword}%`;
    db.query(query, [searchKeyword, keyword], function (err, Users) {
        if (err) {
            result(null);
        } else {
            result(Users);
        }
    });
}
module.exports=Users;