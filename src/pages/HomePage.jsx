import React from "react";
import Logo from "../assets/logo.png";
import WaveTop from "../assets/upper.png";
import WaveBottom from "../assets/homebottom.png";
import WaveBg from "../assets/wave.png";
import Navbar from "../components/Navbar";
import GummyProductImage from "../assets/gummy-product.png";

// Komponen SVG untuk shape gelombang "Our Product"
const ProductWave = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 375 300"
        fill="#FCAFC1"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <path d="M0 50 C100 0, 250 100, 375 50 L375 300 L0 300 Z" />
    </svg>
);

const HomePage = () => {
    return (
      <div className="relative min-h-screen w-full bg-white pb-24">
        <Navbar />
        {/* HEADER SECTION */}
        <header className="relative w-full -mt-30">
          <img src={WaveTop} alt="Top wave" className="w-full" />
          <div className="absolute top-48 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-4 px-6">
            <img
              src={Logo}
              alt="Velvi Chews Logo"
              className="w-24 flex-shrink-0 md:w-32"
            />
            <h2 className="text-left text-lg font-semibold text-[#FF89AC] text-justify">
              Velvi Chews,
              <br />
              <span className="font-normal text-white">
                healthier option for you to chew!
              </span>
            </h2>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex flex-col items-center px-6 text-center">
          {/* --- PERUBAHAN DI SINI UNTUK LAYOUT INTRO --- */}
          <section className="mt-8 flex flex-col items-center gap-4 max-w-lg mx-auto">
            {/* Teks Intro */}
            <div className="w-full text-center">
              <p className="text-xs text-[#FCAFC1] mb-1 text-justify">
                Diawali dengan kesadaran akan kesehatan yang semakin meningkat,
                Velvi Chews menghadirkan opsi snack atau dessert yang lebih
                sehat untuk kamu yang tetap ingin ngemil yang manis namun tidak
                mau meresikokan kesehatan.
              </p>
            </div>
            {/* Gambar Produk */}
            <div className="w-4/5 mx-auto">
              <img
                src={GummyProductImage}
                alt="Velvi Chews Gummies"
                className="w-full rounded-lg shadow-md object-cover"
              />
            </div>
          </section>
          {/* --- AKHIR PERUBAHAN LAYOUT INTRO --- */}

          {/* Info Card Pink */}
          <div className="mt-6 w-full max-w-lg rounded-xl bg-[#FCAFC1]/90 p-4 text-white shadow-md mx-auto">
            <p className="text-xs text-justify">
              Velvi Chews menjamin setiap produk kami tidak memakai pengawet
              buatan maupun pemanis atau gula tambahan, memakai bahan buah asli
              sehingga lebih aman untuk dikonsumsi sehari-hari.
            </p>
          </div>

          {/* Our Product Section */}
          <section className="relative mt-2 w-screen">
            <ProductWave className="absolute top-0 left-0 w-full h-full" />
            <div className="relative z-10 py-16 px-6">
              <h3 className="text-lg font-bold text-[#FF89AC]">OUR PRODUCT</h3>
              <p className="mt-1 text-sm font-semibold text-white text-justify">
                Homemade Gummy
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-white text-justify">
                Gummy yang mengandung vitamin dari buah asli; gelatin yang baik
                untuk kesehatan kulit, rambut, sendi, dan tulang; serta madu
                asli yang baik untuk imunitas dan pencernaan menjadikan produk
                homemade gummy Velvi Chews sebagai pilihan yang cocok sebagai
                pengganti permen untuk kamu konsumsi.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <div className="w-full max-w-md">
            <section className="mt-5 mb-5">
              <h3 className="text-lg font-bold text-[#FF89AC]">OUR VISION</h3>
              <p className="mt-2 text-xs text-[#FCAFC1] text-justify">
                Visi kami adalah menjadi pelopor camilan sehat berbasis buah dan
                sayur tanpa gula maupun pengawet untuk kesehatan yang lebih
                baik.
              </p>
            </section>
          </div>

          {/* Mission & Contribution Section */}
          <div className="relative w-screen overflow-hidden">
            {/* Wave pembatas di atas */}
            <img
              src={WaveBottom}
              alt="Top wave"
              className="absolute top-[-1px] left-0 z-0 w-full"
            />

            {/* Konten biru */}
            <div className="relative z-10 mx-auto max-w-md py-10">
              <section>
                <h3 className="text-lg font-bold text-[#FF89AC]">
                  OUR MISSION
                </h3>
                <p className="mt-3 text-[13px] text-white text-justify leading-relaxed tracking-wide px-4">
                  Misi kami ialah menghadirkan produk yang lebih sehat dan
                  alami, mendorong gaya hidup yang sehat, serta mengedepankan
                  konsumen.
                </p>
              </section>

              <section className="mt-10 mb-0 px-4">
                <h3 className="text-lg font-bold text-[#FF89AC]">
                  OUR CONTRIBUTION TO THE EARTH
                </h3>
                <p className="mt-2 text-xs text-white text-justify">
                  Velvi Chews akan berusaha semampu kami untuk selalu
                  bertanggung jawab dengan produksi kami. Maka dari itu, kami
                  menggunakan biodegradable packaging yang bisa terurai sendiri
                  di alam dalam waktu 2 tahun.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
};

export default HomePage;
