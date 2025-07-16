import { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", id: "", age: "" });
  const [apiBase, setApiBase] = useState("https://api.anhhoangg.id.vn");

  const API_DOMAINS = [
    "https://api.anhhoangg.id.vn",
    "https://backend-production-7f5dc.up.railway.app",
  ];

  useEffect(() => {
    checkApiAvailability();
  }, []);

  const checkApiAvailability = async () => {
    for (const base of API_DOMAINS) {
      try {
        // Giả sử backend có sẵn endpoint /health hoặc /students
        const res = await axios.get(`${base}/students`);
        if (res.status === 200) {
          setApiBase(base);
          setStudents(res.data);
          return;
        }
      } catch (err) {
        console.warn(`API tại ${base} không phản hồi, thử cái khác...`);
      }
    }
    alert("Không thể kết nối đến backend nào!");
  };

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${apiBase}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Lỗi khi fetch danh sách:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("ID cần xoá: ", id);
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sinh viên này?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`${apiBase}/students/${id}`);
      fetchStudent();
      alert("Xoá thành công");
    } catch (error) {
      console.error("Lỗi xoá sinh viên: ", error);
    }
  };

  const handleAdd = async () => {
    try {
      if (!newStudent.name || !newStudent.id || !newStudent.age) {
        alert("Vui lòng nhập đầy đủ thông tin sinh viên!");
        return;
      }
      const response = await axios.post(`${apiBase}/students`, [newStudent]);
      setStudents([...students, response.data]);
      alert("Đã thêm sinh viên thành công!");
      fetchStudent();
    } catch (error) {
      console.error("Lỗi không thể thêm: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Thêm sinh viên</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Nhập tên sinh viên"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Nhập mã sinh viên"
          value={newStudent.id}
          onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
        />

        <input
          type="text"
          placeholder="Nhập tuổi sinh viên"
          value={newStudent.age}
          onChange={(e) =>
            setNewStudent({ ...newStudent, age: e.target.value })
          }
        />
        <button className="button" onClick={handleAdd}>
          Thêm
        </button>
      </div>

      <h1 className="title">Danh sách sinh viên</h1>
      <ul className="list">
        {students
          .filter((s) => s.name && s.age)
          .map((s) => (
            <li key={s.id} className="item">
              <span>Mã SV: {s.id}</span>
              <span>Tên: {s.name}</span>
              <span>Tuổi: {s.age}</span>
              <button
                className="delete-button"
                onClick={() => handleDelete(s.id)}
              >
                Xóa
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default StudentList;
