var Category = require("../Modall/Category.modal");

exports.get_list = function (req, res) {
    Category.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.add_Category = function (req, res) {
    var data = req.body;
    Category.create(data, function (respnse) {
        res.send({ result: respnse });
    });
};
exports.remove_Category = function (req, res) {
    var id = req.params.id;
    Category.remove(id, function (respnse) {
        res.send({ result: respnse });
    });
};
exports.update_Category = function (req, res) {
    var data = req.body;
    Category.update(data, function (respnse) {
        res.send({ result: respnse });
    });
};
exports.remove_Category = function (req, res) {
    var id = req.params.id;
    Category.remove(id, function (respnse) {
        res.send({ result: respnse });
    });
};