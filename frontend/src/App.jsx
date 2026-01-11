import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import FormInput from "./Components/FormInput";
import Tabel from "./Components/Tabel";
import Footer from "./Components/Footer";
import ReadByID from "./Pages/ReadByID";

const App = () => {
  const [listData, setListData] = useState([]);
  const [form, setForm] = useState({ id: "", npm: "", nama: "", kelas: "" });
  const [view, setView] = useState("input");
  
  const API_URL = "http://localhost/pweb/backend/api.php";

  const loadData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setListData(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async () => {
    if (!form.npm || !form.nama || !form.kelas) return alert("Lengkapi form!");
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ id: "", npm: "", nama: "", kelas: "" });
    loadData();
    setView("tampil");
  };

  return (
    <div style={{ 
      backgroundColor: "#f0f2f5", 
      minHeight: "100vh", 
      padding: "40px 20px", 
      fontFamily: "'Inter', sans-serif",
      color: "#1a1a1a"
    }}>
      <div style={{ 
        maxWidth: "900px", 
        margin: "0 auto", 
        background: "white", 
        padding: "30px", 
        borderRadius: "24px", 
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" 
      }}>
        <Navbar />
        
        {/* Navigasi Tab Modern */}
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          margin: "30px 0", 
          background: "#f8fafc", 
          padding: "8px", 
          borderRadius: "16px",
          flexWrap: "wrap"
        }}>
          {['input', 'tampil', 'detail'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setView(tab)} 
              style={{ 
                flex: "1 1 120px", 
                padding: "12px", 
                borderRadius: "12px", 
                border: "none", 
                cursor: "pointer", 
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
                background: view === tab ? "#2563eb" : "transparent", 
                color: view === tab ? "white" : "#64748b",
                boxShadow: view === tab ? "0 4px 6px -1px rgba(37, 99, 235, 0.4)" : "none"
              }}>
              {tab === 'input' ? 'Tambah Data' : tab === 'tampil' ? 'Daftar Mahasiswa' : 'Cari Mahasiswa'}
            </button>
          ))}
        </div>

        {/* Konten dengan Animasi Fade */}
        <div style={{ animation: "fadeIn 0.5s ease" }}>
          {view === "input" && (
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
              <h3 style={{ textAlign: "center", marginBottom: "24px", fontSize: "22px" }}>
                {form.id ? "Edit Data Mahasiswa" : "Input Mahasiswa"}
              </h3>
              <FormInput label="NPM" value={form.npm} onChange={(e) => setForm({...form, npm: e.target.value})} placeholder="..." />
              <FormInput label="Nama Lengkap" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} placeholder="..." />
              <FormInput label="Kelas" value={form.kelas} onChange={(e) => setForm({...form, kelas: e.target.value})} placeholder="..." />
              <button 
                onClick={handleSubmit} 
                style={{ 
                  width: "100%", 
                  padding: "14px", 
                  background: "#2563eb", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "12px", 
                  marginTop: "20px", 
                  fontWeight: "bold", 
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = "#1d4ed8"}
                onMouseOut={(e) => e.target.style.background = "#2563eb"}
              >
                {form.id ? "Simpan Perubahan" : "Simpan Mahasiswa"}
              </button>
            </div>
          )}

          {view === "tampil" && (
            <Tabel 
              data={listData} 
              onEdit={(m) => { setForm(m); setView("input"); }} 
              onDelete={async (id) => { 
                if(window.confirm("Hapus data ini?")) {
                  await fetch(`${API_URL}?id=${id}`, {method: "DELETE"}); 
                  loadData(); 
                }
              }} 
            />
          )}

          {view === "detail" && <ReadByID />}
        </div>

        <Footer />
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};
export default App;