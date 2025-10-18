import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { FaPencilAlt } from 'react-icons/fa';
import DefaultAvatar from '../assets/default-avatar.png';

const AccountInfoPage = () => {
    const navigate = useNavigate();

    const currentUser = {
        name: 'Chris Jae',
        email: 'chrisjae@gmail.com',
        avatar: DefaultAvatar,
    };

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [imagePreview, setImagePreview] = useState(currentUser.avatar);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('Updated Info:', { name });
        alert('Profile updated successfully!');
        navigate(-1);
    };

    return (
        // Perubahan 1: Background utama halaman diubah menjadi putih
        <div className="relative min-h-screen w-full bg-white pb-24">
            {/* Header sekarang simpel di atas background putih */}
            <header className="relative w-full px-4 pt-5 pb-16">
                <div className="relative flex items-center justify-center">
                    <button onClick={() => navigate(-1)} className="absolute left-0">
                        <IoChevronBack className="h-6 w-6 text-[#B4E2F2]" />
                    </button>
                    <h1 className="text-xl font-bold text-[#B4E2F2]">Account Information</h1>
                </div>
            </header>

            {/* Perubahan 2: Shape biru diposisikan di bagian bawah */}
            <div className="absolute bottom-15 left-0 -z-0 h-3/4 w-full rounded-t-[50px] bg-[#B4E2F2]"></div>

            {/* Konten Utama */}
            <main className="relative z-10 -mt-12 flex flex-col items-center gap-6 px-6">
                {/* Foto Profil */}
                <div className="relative">
                    <img
                        src={imagePreview}
                        alt="Profile"
                        className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
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
                        className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF89AC] text-white shadow-md transition-transform hover:scale-110"
                        aria-label="Change profile photo"
                    >
                        <FaPencilAlt size={14} />
                    </button>
                </div>

                {/* Form Section */}
                <form onSubmit={handleUpdate} className="w-full max-w-sm">
                    {/* Input Nama */}
                    <div className="w-full mb-4">
                        <label className="mb-1 block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border-0 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF89AC]"
                        />
                    </div>

                    {/* Input Email (Tidak bisa diubah) */}
                    <div className="w-full">
                        <label className="mb-1 block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full cursor-not-allowed rounded-xl border-0 bg-gray-200 p-4 text-gray-500 shadow-sm"
                        />
                    </div>

                    {/* Tombol Update */}
                    <div className="mt-8 flex w-full justify-center">
                        <button
                            type="submit"
                            className="w-full max-w-xs rounded-full bg-[#FF89AC] py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#FCAFC1]"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AccountInfoPage;