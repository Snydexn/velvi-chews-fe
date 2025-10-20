import React, { useEffect, useState } from 'react';
import UpperWave from '../assets/upper.png';
import BottomWave from '../assets/bottomwave.png';
import Navbar from '../components/NavBar';

const API_BASE_URL = import.meta.env.VITE_API_URL; // ambil dari .env

// === Komponen Kartu Riwayat ===
const HistoryCard = ({ item }) => {
  const pointsColor = 'text-[#FF89AC]'; // warna merah untuk pengurangan poin

  const dateObject = new Date(item.created_at);
  const formattedDate = dateObject.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = dateObject.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex w-full max-w-sm items-center justify-between rounded-2xl bg-white p-4 shadow-md">
      <div>
        <h3 className="font-semibold text-gray-800">{item.item?.name || '-'}</h3>
        <p className="text-xs text-gray-400">{formattedDate}, {formattedTime}</p>
      </div>
      <p className={`text-xl font-bold ${pointsColor}`}>
        -{item.points_spent}
      </p>
    </div>
  );
};

// === Halaman Riwayat Redeem ===
const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('⚠️ Tidak ada token login, redirect ke login page.');
          return;
        }

        const res = await fetch(`${API_BASE_URL}/redeem-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Gagal mengambil data history');
        }

        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      {/* Background */}
      <img src={UpperWave} alt="Top wave background" className="absolute -top-20 left-0 w-full -z-0" />
      <img src={BottomWave} alt="Bottom wave background" className="absolute bottom-0 left-0 w-full -z-0" />

      <Navbar />

      <div className="relative z-10">
        <header className="px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">History</h1>
        </header>

        <main className="flex flex-col items-center gap-4 px-6">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : history.length === 0 ? (
            <p className="text-gray-400">Belum ada riwayat redeem.</p>
          ) : (
            history.map((item) => <HistoryCard key={item.id} item={item} />)
          )}
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;
