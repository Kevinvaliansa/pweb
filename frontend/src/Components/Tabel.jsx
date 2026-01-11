import React from "react";

const Tabel = ({ data, onEdit, onDelete, onView }) => {
  return (
    <div className="table-wrapper">
      <table className="modern-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>ID</th>
            <th>NPM</th>
            <th>Nama Lengkap</th>
            <th>Kelas</th>
            <th style={{ textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((m) => (
              <tr key={m.id} className="table-row">
                <td className="id-column">{m.id}</td>
                <td className="npm-bold">{m.npm}</td>
                <td>{m.nama}</td>
                <td><span className="kelas-badge">{m.kelas}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-act btn-view" onClick={() => onView(m.id)}>Lihat</button>
                    <button className="btn-act btn-edit" onClick={() => onEdit(m)}>Edit</button>
                    <button className="btn-act btn-delete" onClick={() => onDelete(m.id)}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>Data Kosong</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;