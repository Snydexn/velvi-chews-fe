import React from 'react';
import { IoScan, IoTicketOutline, IoCartOutline } from 'react-icons/io5'; 

import TopShape from '../assets/uppermembership.png'; 
import BottomWave from '../assets/bottomwave.png'; 
import Navbar from '../components/NavBar';
import { NavLink } from 'react-router-dom';

const MembershipPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-50 pb-24">
    <Navbar />
      <img 
        src={TopShape} 
        alt="Top background shape" 
        className="absolute top-0 left-0 w-full -z-0"
      />
      
      <header className="relative z-10 flex justify-center pt-12">
        <div className="flex h-56 w-56 items-center justify-center rounded-full bg-[#EAF7FF] shadow-xl"> 
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/40 shadow-xl">
            <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white shadow-[inset_0_0_8px_rgba(0,0,0,0.08)]">
              <span className="text-base text-[#B4E2F2]">Your Point</span>
              <span className="text-6xl font-bold text-[#B4E2F2]">17</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 -mt-10 flex flex-col items-center gap-8 px-6">
        <div className="flex w-full max-w-xs justify-around rounded-2xl bg-[#FCAFC1] mt-15 p-3 shadow-lg">
          <div className="flex flex-col items-center gap-2">
            <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-white">
              <IoScan className="h-7 w-7 text-[#FCAFC1]" />
            </button>
            <span className="text-sm font-medium text-white">Scan</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <NavLink to="/redeem" className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white">
                <IoTicketOutline className="h-7 w-7 text-[#FCAFC1]" />
              </div>
              <span className="text-sm font-medium text-white">Redeem</span>
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-white">
              <IoCartOutline className="h-7 w-7 text-[#FCAFC1]" />
            </button>
            <span className="text-sm font-medium text-white">Shop</span>
          </div>
        </div>

        {/* Riwayat Redeem */}
        <div className="w-full max-w-xs self-center">
          <h2 className="mb-3 text-lg font-bold text-[#FCAFC1]">Redeem History</h2>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
            <div>
              <p className="font-semibold text-gray-800">Voucher B1G1</p>
              <p className="text-xs text-gray-400">13/09/2025</p>
            </div>
            <p className="text-xl font-bold text-gray-700">-10</p>
          </div>
        </div>

      </main>

      {/* 4. Background Bawah */}
      <img 
        src={BottomWave} 
        alt="Bottom background wave" 
        className="absolute bottom-0 left-0 w-full -z-0"
      />
    </div>
  );
};

export default MembershipPage;