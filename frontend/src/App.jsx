import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import FormInput from "./Components/FormInput";
import Tabel from "./Components/Tabel";
import Footer from "./Components/Footer";

const App = () => {
  const [listData, setListData] = useState([]);
  const [form, setForm] = useState({ id: "", npm: "", nama: "", kelas: "" });
  const [showData, setShowData] = useState(false); // State untuk toggle tampilkan data
  
  const API_URL = "http://localhost/pweb/backend/api.php";

  const loadData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setListData(data);
    } catch (err) { console.error("Error load data"); }
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
    setShowData(true); // Otomatis tampilkan tabel setelah simpan
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus data mahasiswa ini?")) {
      await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
      loadData();
    }
  };

  const handleEdit = (mhs) => {
    setForm(mhs);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas saat edit
  };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
        <Navbar />
        
        {/* Form Section */}
        <div style={{ marginBottom: "30px" }}>
          <FormInput label="NPM" value={form.npm} onChange={(e) => setForm({...form, npm: e.target.value})} placeholder="Masukkan NPM..." />
          <FormInput label="Nama Mahasiswa" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} placeholder="Masukkan Nama..." />
          <FormInput label="Kelas" value={form.kelas} onChange={(e) => setForm({...form, kelas: e.target.value})} placeholder="Masukkan Kelas..." />
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleSubmit} style={{ flex: 2, padding: "12px", background: form.id ? "#10b981" : "#2563eb", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>
              {form.id ? "Update Mahasiswa" : "Simpan Mahasiswa"}
            </button>
            
            <button onClick={() => setShowData(!showData)} style={{ flex: 1, padding: "12px", background: "#64748b", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>
              {showData ? "Sembunyikan" : "Tampilkan Data"}
            </button>
          </div>
        </div>

        {/* Tabel Section - Kondisional Render */}
        {showData && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            <h3 style={{ color: "#334155", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>Daftar Mahasiswa</h3>
            <Tabel data={listData} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default App;