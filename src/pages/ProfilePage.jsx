import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaQuestionCircle,
  FaCoins,
  FaPencilAlt,
} from "react-icons/fa";
import { IoLogOutOutline, IoAddCircleOutline, IoScan } from "react-icons/io5";
import ProfileWave from "../assets/profilewave.png";
import DefaultAvatar from "../assets/default-avatar.png";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(DefaultAvatar);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // === Ambil profil user dari backend ===
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil profil");

        const data = await res.json();
        setUser(data);
        setNewName(data.name);
        if (data.profile_picture) {
        setImagePreview(data.profile_picture);
      }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL, navigate]);

  // === Upload foto atau update nama ===
  const handleUpdateProfile = async (file) => {
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (newName) formData.append("name", newName);
      if (file) formData.append("file", file);

      const res = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal memperbarui profil");

      const updated = await res.json();
      setUser(updated);
      if (updated.profile_picture) {
        setImagePreview(`${API_URL}/${updated.profile_picture}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      handleUpdateProfile(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;
  if (!user) return null;

  const MenuItem = ({ icon, text, onClick, isLogout = false }) => (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 py-4 text-left text-sm font-semibold ${
        !isLogout ? "border-b" : ""
      } ${isLogout ? "text-red-500" : "text-gray-700"}`}
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
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={() => handleUpdateProfile()}
            className="text-2xl font-bold text-center bg-transparent border-none focus:outline-none"
          />
          <p className="text-sm font-light">{user.email}</p>
        </header>

        <div className="mt-6 flex w-full max-w-xs items-center justify-around rounded-2xl bg-white p-4 shadow-lg">
          <div className="flex w-1/2 items-center justify-center gap-3">
            <FaCoins className="h-7 w-7 flex-shrink-0 text-[#B4E2F2]" />
            <div className="text-left">
              <p className="text-4xl font-bold text-[#B4E2F2]">
                {user.total_points}
              </p>
              <p className="text-sm text-gray-400 -mt-1">Point</p>
            </div>
          </div>
          <div className="h-12 border-l border-gray-200"></div>
          <div className="flex w-1/2 items-center justify-center gap-3">
            <IoScan className="h-7 w-7 flex-shrink-0 text-[#B4E2F2]" />
            <div className="text-left">
              <p className="text-4xl font-bold text-[#B4E2F2]">
                {user.scanned || 0}
              </p>
              <p className="text-sm text-gray-400 -mt-1">Scanned</p>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-xs rounded-2xl bg-white p-4 pt-0 shadow-lg">
          <MenuItem
            icon={<FaUserCircle size={20} />}
            text="Account Information"
            onClick={() => navigate("/profile/account-info")}
          />
          <MenuItem
            icon={<FaQuestionCircle size={20} />}
            text="Frequently Ask Question"
          />
          {user.role === "admin" && (
            <MenuItem
              icon={<IoAddCircleOutline size={22} />}
              text="Add Item Redeem"
              onClick={() => navigate("/profile/add-item")}
            />
          )}
          <MenuItem
            icon={<IoLogOutOutline size={22} />}
            text="Log Out"
            isLogout
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          />
        </div>
      </div>
      {uploading && (
        <p className="fixed bottom-4 text-center w-full text-sm text-gray-500">
          Uploading...
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
