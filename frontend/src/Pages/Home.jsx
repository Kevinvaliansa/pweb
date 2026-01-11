import React from "react";

const Home = ({ data }) => {
  if (!data) return (
    <div className="empty-state-card">
      <div className="empty-icon">📂</div>
      <p>Silakan pilih mahasiswa di menu <b>Daftar</b> untuk melihat profil lengkap.</p>
    </div>
  );

  return (
    <div className="home-card-container">
      <div className="bio-card-modern">
        <div className="bio-header-gradient">
          <div className="avatar-circle-white">
            {data.nama.substring(0, 2).toUpperCase()}
          </div>
          <div className="header-text">
            <h2>{data.nama}</h2>
            <span className="badge-active">Mahasiswa Aktif</span>
          </div>
        </div>
        
        <div className="bio-body-content">
          <div className="info-grid-modern">
            <div className="info-item-card">
              <label>NPM</label>
              <p>{data.npm}</p>
            </div>
            <div className="info-item-card">
              <label>Kelas</label>
              <p>{data.kelas}</p>
            </div>
            <div className="info-item-card">
              <label>Program Studi</label>
              <p>Informatika</p>
            </div>
            <div className="info-item-card">
              <label>ID Sistem</label>
              <p className="id-highlight">#{data.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;