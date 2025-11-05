const truyenService = require("../services/truyen.service");
const database = require("../database/database");
const { QueryTypes } = require("sequelize");

// 🧩 Lấy danh sách truyện mới
async function truyenMoi(req, res) {
  const token = req.header("Authorization")?.split(" ")[1] || null;
  const page = parseInt(req.query.page) || 1;

  if (page < 1)
    return res.status(400).json({ error: "Số trang không phù hợp" });

  try {
    // ✅ Gọi đúng tham số như trong service (page, token)
    const result = await truyenService.timTruyenMoi(page, token);

    if (!result.ok) {
      console.error("Chi tiết lỗi từ service:", result.error);
      return res.status(result.status || 500).json({ error: result.error });
    }

    return res.json({
      trangHienTai: page,
      truyen: result.data.result,
      tongTrang: result.data.maxPage,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy truyện mới:", error.message, error.stack);
    return res.status(500).json({ error: "Lỗi hệ thống" });
  }
}

// 🔥 Lấy danh sách truyện hot
async function truyenHot(req, res) {
  const token = req.header("Authorization")?.split(" ")[1] || null;
  try {
    const result = await truyenService.timTruyenHot(token);
    if (!result.ok)
      return res.status(result.status || 500).json({ error: result.error });

    return res.json({ truyen: result.data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy truyện hot:", error);
    return res.status(500).json({ error: "Lỗi hệ thống" });
  }
}

// 📚 Lấy truyện theo thể loại
async function truyenTheoTheLoai(req, res) {
  const token = req.header("Authorization")?.split(" ")[1] || null;
  const TLID = parseInt(req.query.TLID);
  const page = parseInt(req.query.page) || 1;

  if (!TLID) return res.status(400).json({ error: "Thiếu mã thể loại" });
  if (page < 1) return res.status(400).json({ error: "Số trang không phù hợp" });

  try {
    const result = await truyenService.timTruyenTheoTheLoai(TLID, page, token);
    if (!result.ok)
      return res.status(result.status || 500).json({ error: result.error });

    return res.json({
      trangHienTai: page,
      truyen: result.data.result,
      tongTrang: result.data.maxPage,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy truyện theo thể loại:", error);
    return res.status(500).json({ error: "Lỗi hệ thống" });
  }
}

// 🔍 Tìm truyện theo từ khóa
async function truyenTheoTuKhoa(req, res) {
  const token = req.header("Authorization")?.split(" ")[1] || null;
  const keyword = req.query.keyword?.trim();
  const page = parseInt(req.query.page) || 1;

  if (!keyword) return res.status(400).json({ error: "Thiếu từ khóa" });
  if (page < 1) return res.status(400).json({ error: "Số trang không phù hợp" });

  try {
    const result = await truyenService.timTruyenTheoTuKhoa(keyword, page, token);
    if (!result.ok)
      return res.status(result.status || 500).json({ error: result.error });

    return res.json({
      trangHienTai: page,
      truyen: result.data.result,
      tongTrang: result.data.maxPage,
    });
  } catch (error) {
    console.error("❌ Lỗi khi tìm truyện theo từ khóa:", error);
    return res.status(500).json({ error: "Lỗi hệ thống" });
  }
}

// 📘 Lấy chi tiết truyện
async function chiTietTruyen(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Thiếu ID truyện" });

    const result = await truyenService.layChiTietTruyen(id);
    if (!result.ok)
      return res.status(result.status || 500).json({ error: result.error });

    return res.json(result.data);
  } catch (error) {
    console.error("❌ Lỗi khi lấy chi tiết truyện:", error);
    return res.status(500).json({ error: "Lỗi hệ thống khi lấy chi tiết truyện" });
  }
}

// 📖 Lấy nội dung chương
async function noiDungChuong(req, res) {
  try {
    const { cid } = req.params;
    if (!cid) return res.status(400).json({ error: "Thiếu ID chương" });

    const sql = `
      SELECT C.CTID, C.TieuDe, C.NoiDung, C.ThuTu, C.NgayDang, T.TID, T.TenTruyen
      FROM ChuongTruyen AS C
      JOIN Truyen AS T ON C.TID = T.TID
      WHERE C.CTID = :cid;
    `;

    const [chapter] = await database.query(sql, {
      replacements: { cid },
      type: QueryTypes.SELECT,
    });

    if (!chapter) return res.status(404).json({ error: "Không tìm thấy chương" });

    res.json(chapter);
  } catch (error) {
    console.error("❌ Lỗi khi lấy nội dung chương:", error);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
}

module.exports = {
  truyenMoi,
  truyenHot,
  truyenTheoTheLoai,
  truyenTheoTuKhoa,
  chiTietTruyen,
  noiDungChuong,
};
