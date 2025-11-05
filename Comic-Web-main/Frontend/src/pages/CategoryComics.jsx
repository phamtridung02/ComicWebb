import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CategoryComics() {
  const { id } = useParams(); // TLID (mã thể loại)
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchByCategory() {
      try {
        const res = await fetch(`http://localhost:8080/truyen/truyenTheoTheLoai?TLID=${id}`);
        if (!res.ok) throw new Error("Không thể tải truyện theo thể loại");
        const data = await res.json();
        const list = data.truyen?.result || data.truyen || [];
        if (!Array.isArray(list)) throw new Error("Dữ liệu truyện không hợp lệ");
        setComics(list);
      } catch (err) {
        console.error("❌ Lỗi khi tải truyện theo thể loại:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchByCategory();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Đang tải truyện...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📘 Thể loại #{id}
      </h1>
      {comics.length === 0 ? (
        <p className="text-center text-gray-500">Không có truyện trong thể loại này 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {comics.map((comic) => (
            <Link
              key={comic.TID}
              to={`/truyen/${comic.TID}`}
              className="block bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={comic.AnhBia || "/default-cover.jpg"}
                alt={comic.TenTruyen}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{comic.TenTruyen}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{comic.MoTa}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
