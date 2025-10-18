import React from 'react';
// Perubahan 1: Impor 'Link' untuk navigasi
import { useNavigate, Link } from 'react-router-dom'; 
import { IoChevronBack } from 'react-icons/io5';
import DinoGummy from '../assets/dino-gummy.png'; 

// Perubahan 2: Terima prop 'id' untuk membuat link dinamis
const RedeemCard = ({ id, title, expiryDate, imageSrc }) => (
  <div className="w-full max-w-sm rounded-2xl bg-white p-3 shadow-lg">
    <img src={imageSrc} alt={title} className="mb-3 w-full rounded-xl object-cover" />
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-400">Voucher berlaku sampai {expiryDate}</p>
      </div>
      {/* Perubahan 3: Ganti <button> dengan <Link> dan arahkan ke halaman detail */}
      <Link 
        to={`/redeem/${id}`} 
        className="rounded-lg bg-[#FF89AC] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FCAFC1]"
      >
        Redeem
      </Link>
    </div>
  </div>
);

const RedeemPage = () => {
  const navigate = useNavigate(); 
  const vouchers = [
    { id: 1, title: 'Buy 1 Get 1 Dino Edition', expiry: '19/09/2025' },
    { id: 2, title: 'Buy 1 Get 1 Dino Edition', expiry: '19/09/2025' },
    { id: 3, title: 'Buy 1 Get 1 Dino Edition', expiry: '19/09/2025' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-24">
      <header className="sticky top-0 z-20 w-full rounded-b-3xl bg-[#B4E2F2] px-4 py-5 shadow-md">
        <div className="relative flex items-center justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <IoChevronBack className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Redeem</h1>
        </div>
      </header>

      <main className="flex flex-col items-center gap-4 p-6">
        {vouchers.map((voucher) => (
          <RedeemCard
            key={voucher.id}
            id={voucher.id} // Perubahan 2: Kirim 'id' sebagai prop
            title={voucher.title}
            expiryDate={voucher.expiry}
            imageSrc={DinoGummy}
          />
        ))}
      </main>
    </div>
  );
};

export default RedeemPage;