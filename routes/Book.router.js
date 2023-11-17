var express = require('express');
var router = express.Router();
const multer = require('multer');
var Books = require("../Modall/Book.modal");


//
// // Sử dụng multer để xử lý tải lên ảnh
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/* GET home page. */
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imageData = req.file.buffer;
        const imageName = Date.now() + '_' + req.file.originalname;
        const imagePath = 'public/uploads/' + imageName;
        require('fs').writeFile(imagePath, imageData, (err) => {
            if (err) {
                console.error("Lỗi khi ghi ảnh:", err);
                res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
            } else {
            }
        });

        // Tiếp theo, bạn có thể lưu imagePath vào cơ sở dữ liệu tùy thuộc vào yêu cầu của bạn.

        // Gửi đường dẫn ảnh trả về cho client
        const imageUrl = '/uploads/' + imageName; // Đường dẫn ảnh trong public/uploads
        res.status(200).json({ imageUrl: imageUrl });
    } catch (error) {
        console.error("Lỗi khi xử lý ảnh:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/get_list', function(req, res, next) {
    Books.get_all(function(data) {
        res.send({ result: data });
    });
});

// API endpoint để thêm danh sách
router.post('/add', function(req, res, next) {
    // Lấy dữ liệu từ request body
    var newData = req.body;

    Books.create(newData, function(result) {
        if (result) {
            image = req.body.image;
            res.send({ result: result });

        } else {
            res.status(500).send({ error: "Error creating new Category." });
        }
    });
});
// api xóa
router.delete('/delete/:id', function(req, res, next) {
    const id = req.params.id;
    Books.remove(id, function(result) {
        if (result === null) {
            res.status(404).send('Không tìm thấy Book');
        } else {
            res.send(result);
        }
    });
});
// router.delete("/delete/:id",Bookcontroler.remove_book)
//api sưa
router.put('/update/:id', function(req, res, next) {
    const id = req.params.id;
    const updatedData = req.body;

    // Kiểm tra xem có ảnh mới được tải lên không
    if (req.file) {
        const imageData = req.file.buffer;
        const imageName = Date.now() + '_' + req.file.originalname;
        const imagePath = 'public/uploads/' + imageName;

        require('fs').writeFile(imagePath, imageData, (err) => {
            if (err) {
                console.error("Lỗi khi ghi ảnh:", err);
                res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
                return;
            }
            // Nếu việc ghi ảnh thành công, cập nhật đường dẫn ảnh mới
            updatedData.ImageBook = '/uploads/' + imageName;
        });
    }

    // Gọi hàm update từ modal
    Books.update(updatedData, function(result) {
        if (result) {
            res.send({ result: result });
        } else {
            res.status(500).send({ error: "Error updating Book." });
        }
    });
});
// api tìm kiếm
router.get('/search/:keyword', function(req, res, next) {
    const keyword = req.params.keyword;
    Books.search(keyword, function(result) {
        if (result === null) {
            res.status(404).send('Không tìm thấy kết quả');
        } else {
            res.json(result);
        }
    });
});
module.exports = router;