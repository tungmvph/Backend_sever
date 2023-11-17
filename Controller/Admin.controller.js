var Admin = require('../Modall/Admin.modal')
var bcrypt = require('bcrypt');
const Category = require("../Modall/Category.modal");

exports.get_list=function(req,res){
    Admin.get_all(function(data){
        res.send({result:data});
    });
};

exports.detail=function(req,res){
    Admin.getByid(req.params.id,function(respnse){
        res.send({result:respnse});
    });

}

exports.remove_Admin=function(req,res){
    var id=req.params.id;
    Admin.remove(id,function(respnse){
        res.send({result:respnse});
    });
}
exports.update_Admin=function(req,res){
    var data=req.body;
    Admin.update(data,function (respnse){
        res.send({result:respnse});
    });
}

exports.add_Admin = function (req, res) {
    var data = req.body;
    if (!data.PassWord) {
        res.status(400).send({ result: 'Mật khẩu không được để trống' });
        return;
    }
    bcrypt.hash(data.PassWord, 10, function (err, hash) {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).send({ result: 'Internal Server Error' });
        } else {
            data.PassWord = hash;

            Admin.create(data, function (response) {
                res.send({ result: response });
            });
        }
    });
}

