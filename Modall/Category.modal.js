const db=require("../Connect/Conectdb");

const Category = function (Category) {
    this.IDCat = Category.IDCat;
    this.CatName = Category.CatName;
    this.img = Category.img;
};

Category.get_all = function (result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("SELECT * FROM Category", function (err, Category) {
        if (err) {
            console.error("Lỗi khi lấy danh sách Category:", err);
            result(null);
        } else {
            result(Category);
        }

    });
};
Category.create = function (data, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query("INSERT INTO Category SET ?", data, function (err, Category) {
        if (err) {
            result(null);
        } else {
            result({ IDCat: Category.insertId, ...data });
        }

    });
};
Category.update = function (array, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query(
        "UPDATE Category SET CatName=?,img=? WHERE IDCat=?",
        [array.CatName, array.img, array.IDCat],
        function (err, Category) {
            if (err) {
                result(null);
            } else {
                result(array);
            }

        }
    );
};

Category.remove = function (id, result) {
    if (db.state === 'disconnected') {
        db.connect();
    }
    db.query(
        "DELETE FROM Category WHERE IDCat = ?",
        id,
        function (err, Category) {
            if (err) {
                result(null);
            } else {
                result("XOA THANH CONG IDCat CO ID " + id);
            }

        }
    );
};


module.exports=Category;