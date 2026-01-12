import React from "react";
// Pastikan file pasfoto.jpg sudah ada di folder src/assets
import fotoProfil from "../assets/pasfoto.jpg"; 

const Biodata = () => {
  return (
    <div className="home-card-container">
      <div className="bio-card-modern">
        {/* Header - Hanya Foto dan Badge */}
        <div className="bio-header-gradient" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '40px 20px', 
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' 
        }}>
          <div className="profile-pic-wrapper" style={{ marginBottom: '15px' }}>
            <img 
              src={fotoProfil} 
              alt="Profile Kevin"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "5px solid white",
                objectFit: "cover",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                backgroundColor: "#fff"
              }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Kevin"; }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="badge-active" style={{ 
              background: '#10b981', 
              color: 'white', 
              padding: '5px 20px', 
              borderRadius: '20px', 
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              MAHASISWA
            </span>
          </div>
        </div>
        
        {/* Detail Informasi - Nama, Kelas, NPM, Jurusan (Semua Seragam) */}
        <div className="bio-body-content" style={{ padding: '30px' }}>
          <div className="info-grid-modern" style={{ display: 'grid', gap: '15px' }}>
            
            {/* Nama Lengkap */}
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Nama Lengkap</label>
              <p style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#1e293b' }}>Kevin Valians</p>
            </div>

            {/* Kelas */}
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Kelas</label>
              <p style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#1e293b' }}>3IA23</p>
            </div>

            {/* NPM */}
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>NPM</label>
              <p style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#1e293b' }}>50423689</p>
            </div>
            
            {/* Jurusan */}
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Jurusan</label>
              <p style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#2563eb' }}>Informatika</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodata;