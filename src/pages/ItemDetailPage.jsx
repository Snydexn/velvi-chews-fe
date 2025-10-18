import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

// Import hanya gambar yang dibutuhkan
import DinoGummy from '../assets/dino-gummy.png';

const ItemDetailPage = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const item = {
    title: 'Buy 1 Get 1 Dino Edition',
    expiry: '19/09/2025',
    description: 'Pembelian sdsadsadsbodsajdsahdsajdhasljdhsajdhas',
  };

  return (
    <div className="min-h-screen w-full bg-[#B4E2F2]">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-20 w-full px-4 py-5 shadow-sm">
        <div className="relative flex items-center justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <IoChevronBack className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Item Detail</h1>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="p-4">
        <div className="flex flex-col rounded-3xl bg-white p-6 shadow-lg">
          {/* Image Section */}
          <div className="relative mb-4">
            <img src={DinoGummy} alt={item.title} className="w-full rounded-xl object-cover" />
            {/* Logo Dino sudah dihapus dari sini */}
          </div>

          {/* Item Info */}
          <h2 className="text-xl font-bold text-[#FF89AC]">{item.title}</h2>
          <p className="mt-1 text-xs text-gray-400">Voucher berlaku sampai {item.expiry}</p>

          <div className="mt-6">
            <h3 className="font-semibold text-[#FF89AC]">Description</h3>
            <p className="mt-1 text-sm text-gray-600">
              {item.description}
            </p>
          </div>

          {/* Redeem Button */}
          <div className="mt-8 flex w-full justify-center">
            <button className="w-full max-w-xs rounded-full bg-[#FF89AC] py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#FCAFC1]">
              Redeem
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDetailPage;