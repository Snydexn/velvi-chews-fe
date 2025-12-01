import React from 'react';
// Impor gambar untuk background
import UpperWave from '../assets/upper.png';
import BottomWave from '../assets/bottomwave.png';
import Navbar from '../components/Navbar';

// Komponen Kartu Riwayat
const HistoryCard = ({ item }) => {
  const isPositive = item.points > 0;
  const pointsColor = isPositive ? 'text-[#B4E2F2]' : 'text-[#FF89AC]';
  const pointsSign = isPositive ? '+' : '';

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
      <Navbar />
      <div>
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-xs text-gray-400">{formattedDate}, {formattedTime}</p>
      </div>
      <p className={`text-xl font-bold ${pointsColor}`}>
        {pointsSign}{item.points}
      </p>
    </div>
  );
};

// Komponen Halaman Riwayat Utama
const HistoryPage = () => {
  const historyData = [
    { id: 1, title: 'Scan AR', created_at: '2025-10-17T10:30:00Z', points: 10 },
    { id: 2, title: 'Redeem Voucher B1G1', created_at: '2025-10-16T18:45:15Z', points: -10 },
    { id: 3, title: 'Scan AR', created_at: '2025-10-15T09:05:30Z', points: 5 },
    { id: 4, title: 'Redeem Voucher 50%', created_at: '2025-10-14T14:12:00Z', points: -25 },
  ];

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      {/* Background Atas dan Bawah menggunakan gambar */}
      <img src={UpperWave} alt="Top wave background" className="absolute -top-20 left-0 w-full -z-0" />
      <img src={BottomWave} alt="Bottom wave background" className="absolute bottom-0 left-0 w-full -z-0" />

      {/* Konten Halaman */}
      <div className="relative z-10">
        <header className="px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">History</h1>
        </header>

        <main className="flex flex-col items-center gap-4 px-6">
          {historyData.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;