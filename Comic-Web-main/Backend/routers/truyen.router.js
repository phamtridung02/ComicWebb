const express = require("express");
const controller = require("../controllers/truyen.controller");
const router = express.Router();

router.get("/truyenMoi", controller.truyenMoi);
router.get("/truyenHot", controller.truyenHot);
router.get("/truyenTheoTheLoai", controller.truyenTheoTheLoai);
router.get("/truyenTheoTuKhoa", controller.truyenTheoTuKhoa);
router.get("/chuong/:cid", controller.noiDungChuong);
router.get("/:id", controller.chiTietTruyen);

module.exports = router;