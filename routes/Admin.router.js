var express = require('express');
var router = express.Router();
var Adminmodal = require("../Modall/Admin.modal");
const Admin = require('../Controller/Admin.controller');

// Lấy tất cả admins
router.get('/get_list', function(req, res, next) {
    Adminmodal.get_all(function(data) {
        res.send({ result: data });
    });
});


// Lấy một admin cụ thể bằng ID
router.get('/get_list/:id', function(req, res, next) {
    const id = req.params.id;
    Adminmodal.getByid(id, function(result) {
        if (result === null) {
            res.status(404).send('Không tìm thấy Admin');
        } else {
            res.json(result);
        }
    });
});

// Xóa một admin theo ID
router.delete('/delete/:id', function(req, res, next) {
    const id = req.params.id;
    Adminmodal.remove(id, function(result) {
        if (result === null) {
            res.status(404).send('Không tìm thấy Admin');
        } else {
            res.send(result);
        }
    });
});

// Tạo (thêm) một admin mới
router.post('/add', function(req, res, next) {
    const data = req.body; // Dữ liệu từ phần thân yêu cầu
    Adminmodal.create(data, function(result) {
        if (result === null) {
            res.status(500).send('Lỗi máy chủ nội bộ');
        } else {
            res.json(result);
        }
    });
});

// Cập nhật (update) một admin hiện tại theo ID
router.put('/update/:id', function(req, res, next) {
    const id = req.params.id;
    const data = req.body; // Dữ liệu từ phần thân yêu cầu
    Adminmodal.update({ ...data, IDAdmin: id }, function(result) {
        if (result === null) {
            res.status(404).send('Không tìm thấy Admin');
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
