var Users=require('../Modall/User.modal');
var bcrypt = require('bcrypt');

exports.get_list=function(req,res){
    Users.get_all(function(data){
        res.send({result:data});
    })
}

exports.detail=function(req,res){
    Users.getByid(req.params.id,function(respnse){
        res.send({result:respnse});
    });

}

exports.remove_Users=function(req,res){
    var id=req.params.id;
    Users.remove(id,function(respnse){
        res.send({result:respnse});
    });
}
exports.update_Users=function(req,res){
    var data=req.body;
    Users.update(data,function (respnse){
        res.send({result:respnse});
    });
}

exports.add_Users = function (req, res) {
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

            Users.create(data, function (response) {
                res.send({ result: response });
            });
        }
    });
}