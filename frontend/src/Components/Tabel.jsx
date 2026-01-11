import React from "react";

const Tabel = ({ data, onEdit, onDelete }) => {
  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#64748b", fontSize: "14px" }}>
            <th style={{ padding: "12px 16px" }}>NO / ID</th>
            <th style={{ padding: "12px 16px" }}>NPM</th>
            <th style={{ padding: "12px 16px" }}>NAMA</th>
            <th style={{ padding: "12px 16px" }}>KELAS</th>
            <th style={{ padding: "12px 16px", textAlign: "center" }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item) => (
            <tr key={item.id} style={{ 
              background: "white", 
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderRadius: "12px"
            }}>
              {/* Menampilkan ID yang urut dari atas ke bawah */}
              <td style={{ padding: "16px", fontWeight: "600", borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }}>
                {item.id}
              </td>
              <td style={{ padding: "16px" }}>{item.npm}</td>
              <td style={{ padding: "16px", color: "#1e293b", fontWeight: "500" }}>{item.nama}</td>
              <td style={{ padding: "16px" }}>{item.kelas}</td>
              <td style={{ padding: "16px", textAlign: "center", borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }}>
                <button 
                  onClick={() => onEdit(item)}
                  style={{ background: "#fef3c7", color: "#92400e", border: "none", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", marginRight: "8px", fontWeight: "600" }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(item.id)}
                  style={{ background: "#fee2e2", color: "#991b1b", border: "none", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>Belum ada data mahasiswa</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;