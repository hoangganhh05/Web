import { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", id: "", age: "" });

  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);
  const fetchStudent = async () => {
    try {
      const response = await axios.get("http://localhost:8080/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    console.log("ID cần xoá: ", id); // Kiểm tra ID
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sinh viên này?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/students/${id}`);
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
      const response = await axios.post("http://localhost:8080/students", [
        newStudent,
      ]);
      setStudents([...students, response.data]);
      alert("Đã thêm sinh viên thành công!");
      fetchStudent();
    } catch (error) {
      console.error("Lỗi không thể thêm" + error);
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
