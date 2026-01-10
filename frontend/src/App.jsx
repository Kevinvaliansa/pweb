import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import FormInput from "./Components/FormInput";
import Tabel from "./Components/Tabel";
import Footer from "./Components/Footer";

const App = () => {
  const [listData, setListData] = useState([]);
  const [form, setForm] = useState({ id: "", npm: "", nama: "", kelas: "" });
  const [view, setView] = useState("input"); // Hanya 'input' atau 'tampil'
  
  const API_URL = "http://localhost/pweb/backend/api.php";

  // Fungsi mengambil data dari database
  const loadData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setListData(data);
    } catch (err) { 
      console.error("Error load data", err); 
    }
  };

  useEffect(() => { 
    loadData(); 
  }, []);

  // Fungsi simpan atau update data
  const handleSubmit = async () => {
    if (!form.npm || !form.nama || !form.kelas) return alert("Lengkapi form!");
    
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      alert(form.id ? "Data berhasil diupdate!" : "Data berhasil disimpan!");
      setForm({ id: "", npm: "", nama: "", kelas: "" });
      loadData();
      setView("tampil"); 
    } catch (err) {
      alert("Gagal menyimpan data");
    }
  };

  // Fungsi hapus data
  const handleDelete = async (id) => {
    if (confirm("Hapus data mahasiswa ini?")) {
      await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
      loadData();
    }
  };

  // Fungsi pindah ke mode edit
  const handleEdit = (mhs) => {
    setForm(mhs);
    setView("input");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", padding: "20px 10px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "white", padding: "25px", borderRadius: "20px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
        
        <Navbar />
        
        {/* Navigasi Menu Responsif */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
          <button 
            onClick={() => setView("input")} 
            style={{ 
              flex: 1, padding: "14px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", border: "none",
              background: view === "input" ? "#2563eb" : "#e2e8f0", 
              color: view === "input" ? "white" : "#475569",
              transition: "0.3s"
            }}>
            Input Data
          </button>
          <button 
            onClick={() => setView("tampil")} 
            style={{ 
              flex: 1, padding: "14px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", border: "none",
              background: view === "tampil" ? "#2563eb" : "#e2e8f0", 
              color: view === "tampil" ? "white" : "#475569",
              transition: "0.3s"
            }}>
            Tampilkan Data
          </button>
        </div>

        {/* Area Konten Dinamis */}
        {view === "input" ? (
          <div style={{ animation: "fadeIn 0.3s" }}>
            <h3 style={{ color: "#334155", marginBottom: "20px" }}>{form.id ? "📝 Edit Data" : "➕ Tambah Mahasiswa"}</h3>
            <FormInput label="NPM" value={form.npm} onChange={(e) => setForm({...form, npm: e.target.value})} placeholder="Masukkan NPM..." />
            <FormInput label="Nama Mahasiswa" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} placeholder="Masukkan Nama..." />
            <FormInput label="Kelas" value={form.kelas} onChange={(e) => setForm({...form, kelas: e.target.value})} placeholder="Masukkan Kelas..." />
            
            <button onClick={handleSubmit} style={{ width: "100%", padding: "14px", background: form.id ? "#10b981" : "#2563eb", color: "white", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", marginTop: "15px", fontSize: "16px" }}>
              {form.id ? "Update Mahasiswa" : "Simpan Mahasiswa"}
            </button>
            
            {form.id && (
              <button onClick={() => setForm({ id: "", npm: "", nama: "", kelas: "" })} style={{ width: "100%", marginTop: "10px", background: "none", color: "#ef4444", border: "none", cursor: "pointer", fontWeight: "600" }}>
                Batal Edit
              </button>
            )}
          </div>
        ) : (
          <div style={{ animation: "fadeIn 0.3s", overflowX: "auto" }}>
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