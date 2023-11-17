const Book = require("../Modall/Book.modal");
exports.remove_book = function (req, res) {
    var id = req.params.id;
    Book.remove(id, function (respnse) {
        res.send({ result: respnse });
    });
};