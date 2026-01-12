import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import FormInput from "./Components/FormInput";
import Tabel from "./Components/Tabel";
import Footer from "./Components/Footer";
import ReadByID from "./Pages/ReadByID";
import Home from "./Pages/Home";
import Biodata from "./Pages/Biodata"; // Import halaman Biodata baru
import "./App.css";

const App = () => {
  // --- State Management ---
  const [listData, setListData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardId, setDashboardId] = useState(null);
  const [form, setForm] = useState({ id: "", npm: "", nama: "", kelas: "" });
  const [view, setView] = useState("home");
  const [modal, setModal] = useState({ 
    show: false, 
    message: "", 
    onConfirm: null 
  });

  const API_URL = "http://localhost/pweb/backend/api.php";

  // --- Fungsi Modal Kustom ---
  const showModal = (msg, confirmFn = null) => {
    setModal({ show: true, message: msg, onConfirm: confirmFn });
  };

  // --- Data Fetching ---
  const loadData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setListData(data);
    } catch (err) {
      console.error("Gagal memuat daftar data:", err);
    }
  };

  const loadDashboardData = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`${API_URL}?id=${id}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setDashboardData(data[0]);
      }
    } catch (err) {
      console.error("Gagal memuat data dashboard:", err);
    }
  };

  useEffect(() => {
    loadData();
    if (dashboardId) loadDashboardData(dashboardId);
  }, [dashboardId]);

  // --- Form Handling ---
  const handleSubmit = async () => {
    if (!form.npm || !form.nama || !form.kelas) {
      return showModal("Ups! Harap lengkapi semua data mahasiswa ya.");
    }
    
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      setForm({ id: "", npm: "", nama: "", kelas: "" });
      loadData();
      setView("tampil");
      showModal("Bagus! Data berhasil disimpan ✨");
    } catch (err) {
      showModal("Gagal menyimpan data. Cek koneksi backend.");
    }
  };

  return (
    <div className="app-container">
      {/* --- Pop-up Modern (Modal) --- */}
      {modal.show && (
        <div className="modal-overlay">
          <div className={`modal-box-modern ${modal.onConfirm ? 'modal-confirm' : 'modal-info'}`}>
            <div className="modal-icon-circle">
              {modal.onConfirm ? "⚠️" : "✨"}
            </div>
            <div className="modal-text">
              <h3>{modal.onConfirm ? "Konfirmasi" : "Pemberitahuan"}</h3>
              <p>{modal.message}</p>
            </div>
            <div className="modal-actions-modern">
              {modal.onConfirm ? (
                <>
                  <button 
                    className="btn-modal-no" 
                    onClick={() => setModal({ show: false, message: "", onConfirm: null })}
                  >
                    Tidak
                  </button>
                  <button 
                    className="btn-modal-yes" 
                    onClick={() => { 
                      modal.onConfirm(); 
                      setModal({ ...modal, show: false }); 
                    }}
                  >
                    Ya, Hapus
                  </button>
                </>
              ) : (
                <button 
                  className="btn-modal-ok" 
                  onClick={() => setModal({ show: false, message: "", onConfirm: null })}
                >
                  Mengerti
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="main-card">
        <Navbar />
        
        {/* --- Navigasi Tab --- */}
        <nav className="tab-navigation">
          {[
            { id: 'home', label: '🏠 Dashboard' },
            { id: 'input', label: '➕ Tambah' },
            { id: 'tampil', label: '📋 Daftar' },
            { id: 'detail', label: '🔍 Cari' },
            { id: 'bio', label: '👤 Biodata' } // Tombol navigasi ke Biodata
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setView(tab.id)} 
              className={view === tab.id ? "tab-active" : ""}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* --- Konten Utama --- */}
        <main className="section-fade">
          {view === "home" && (
            <Home data={dashboardData} />
          )}

          {view === "input" && (
            <div className="form-wrapper-modern">
              <div className="form-card-modern">
                <h3 className="section-title-modern">
                  {form.id ? "✏️ Edit Data" : "📝 Tambah Mahasiswa"}
                </h3>
                <FormInput 
                  label="NPM" 
                  value={form.npm} 
                  onChange={(e) => setForm({...form, npm: e.target.value})} 
                  placeholder="Contoh: 50422123" 
                />
                <FormInput 
                  label="Nama" 
                  value={form.nama} 
                  onChange={(e) => setForm({...form, nama: e.target.value})} 
                  placeholder="Nama Lengkap" 
                />
                <FormInput 
                  label="Kelas" 
                  value={form.kelas} 
                  onChange={(e) => setForm({...form, kelas: e.target.value})} 
                  placeholder="Contoh: 4IA01" 
                />
                
                <button onClick={handleSubmit} className="btn-submit-modern">
                  <span>Simpan Data Mahasiswa</span>
                </button>
              </div>
            </div>
          )}

          {view === "tampil" && (
            <Tabel
              data={listData}
              onEdit={(m) => { setForm(m); setView("input"); }} 
              onDelete={(id) => showModal("Hapus data mahasiswa ini secara permanen?", async () => {
                await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
                loadData();
              })} 
              onView={(id) => { 
                setDashboardId(id); 
                setView("home"); 
              }}
            />
          )}

          {view === "detail" && (
            <ReadByID />
          )}

          {/* Render halaman Biodata */}
          {view === "bio" && (
            <Biodata />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;