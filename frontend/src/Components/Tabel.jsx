const Tabel = ({ data, onEdit, onDelete }) => {
  return (
    <div style={{ marginTop: "20px", overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
        <thead>
          <tr style={{ background: "#f8fafc", textAlign: "left" }}>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>NPM</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Nama</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Kelas</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((mhs) => (
            <tr key={mhs.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "12px" }}>{mhs.npm}</td>
              <td style={{ padding: "12px" }}>{mhs.nama}</td>
              <td style={{ padding: "12px" }}>{mhs.kelas}</td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                <button onClick={() => onEdit(mhs)} style={{ color: "#2563eb", marginRight: "10px", cursor: "pointer", border: "none", background: "none", fontWeight: "bold" }}>Edit</button>
                <button onClick={() => onDelete(mhs.id)} style={{ color: "#ef4444", cursor: "pointer", border: "none", background: "none", fontWeight: "bold" }}>Hapus</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="4" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>Tidak ada data mahasiswa</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Tabel;