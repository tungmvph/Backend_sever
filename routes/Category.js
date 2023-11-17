var express = require('express');
var router = express.Router();
const multer = require('multer');
var Category = require("../Modall/Category.modal");

var  Categorycontroler=require("../Controller/Category.controler")

// Sử dụng multer để xử lý tải lên ảnh
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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// API endpoint để lấy danh sách
router.get('/get_list', function(req, res, next) {
  Category.get_all(function(data) {
    res.send({ result: data });
  });
});

// API endpoint để thêm danh sách
router.post('/add', function(req, res, next) {
  // Lấy dữ liệu từ request body
  var newData = req.body;

  Category.create(newData, function(result) {
    if (result) {
      image = req.body.image;
      res.send({ result: result });

    } else {
      res.status(500).send({ error: "Error creating new Category." });
    }
  });
});
router.put("/update",Categorycontroler.update_Category);
router.delete("/delete/:id",Categorycontroler.remove_Category)

module.exports = router;
