import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaQuestionCircle, 
  FaCoins,
  FaPencilAlt 
} from 'react-icons/fa';
import { 
  IoLogOutOutline, 
  IoAddCircleOutline, 
  IoScan
} from 'react-icons/io5';

import ProfileWave from '../assets/profilewave.png'; 
import DefaultAvatar from '../assets/default-avatar.png';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [imagePreview, setImagePreview] = useState(DefaultAvatar); 
  const fileInputRef = useRef(null);

  // --- PERUBAHAN DI SINI ---
  // Menambahkan 'role' ke objek user untuk simulasi data dari backend
  const user = {
    name: 'Chris Jae',
    email: 'chrisjae@gmail.com',
    points: 17,
    scanned: 5,
    role: 'admin' // Ganti ini menjadi 'user' untuk menguji
  };
  // --- AKHIR PERUBAHAN ---

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };
  
  const MenuItem = ({ icon, text, onClick, isLogout = false }) => (
    <button 
      onClick={onClick} 
      className={`flex w-full items-center gap-4 py-4 text-left text-sm font-semibold ${!isLogout ? 'border-b' : ''} ${isLogout ? 'text-red-500' : 'text-gray-700'}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );

  return (
    <div className="relative min-h-screen w-full bg-gray-50 pb-24">
    <Navbar />
      <img 
        src={ProfileWave} 
        alt="Profile background wave" 
        className="absolute -top-50 left-0 -z-0 w-full h-full object-cover" 
      />
      
      <div className="relative z-10 flex flex-col items-center px-6">
        <header className="flex flex-col items-center pt-12 text-center text-white">
          <div className="relative mb-4">
            <img 
              src={imagePreview} 
              alt="Profile" 
              className="h-28 w-28 rounded-full object-cover shadow-md border-4 border-white"
            />
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
            <button 
              onClick={handleEditClick}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#FF89AC] shadow-md transition-transform hover:scale-110"
              aria-label="Change profile photo"
            >
              <FaPencilAlt size={14} /> 
            </button>
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm font-light">{user.email}</p>
        </header>

        <div className="mt-6 flex w-full max-w-xs items-center justify-around rounded-2xl bg-white p-4 shadow-lg">
          <div className="flex w-1/2 items-center justify-center gap-3">
            <FaCoins className="h-7 w-7 flex-shrink-0 text-[#B4E2F2]" />
            <div className="text-left">
              <p className="text-4xl font-bold text-[#B4E2F2]">{user.points}</p>
              <p className="text-sm text-gray-400 -mt-1">Point</p>
            </div>
          </div>
          <div className="h-12 border-l border-gray-200"></div>
          <div className="flex w-1/2 items-center justify-center gap-3">
            <IoScan className="h-7 w-7 flex-shrink-0 text-[#B4E2F2]" />
            <div className="text-left">
              <p className="text-4xl font-bold text-[#B4E2F2]">{user.scanned}</p>
              <p className="text-sm text-gray-400 -mt-1">Scanned</p>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-xs rounded-2xl bg-white p-4 pt-0 shadow-lg">
          <MenuItem icon={<FaUserCircle size={20} />} text="Account Information" onClick={() => navigate('/profile/account-info')} />
          <MenuItem icon={<FaQuestionCircle size={20} />} text="Frequently Ask Question" />
          
          {/* --- PERUBAHAN DI SINI --- */}
          {/* Menu ini hanya akan muncul jika user.role adalah 'admin' */}
          {user.role === 'admin' && (
            <MenuItem 
              icon={<IoAddCircleOutline size={22} />} 
              text="Add Item Redeem" 
              onClick={() => navigate('/profile/add-item')}
            />
          )}
          {/* --- AKHIR PERUBAHAN --- */}
          
          <MenuItem icon={<IoLogOutOutline size={22} />} text="Log Out" isLogout />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;