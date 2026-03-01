import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 w-full">
      <div className="text-white py-6 flex flex-col gap-6 max-w-7xl mx-auto px-4">
        <div className="flex justify-between gap-5">
          <div>
            <h1 className="text-2xl font-bold">Kutubxona</h1>
            <p className="text-gray-400 mt-2">
              Eng yaxshi kitoblarni toping va o'qing.
            </p>
            <p className="text-gray-400 mt-2">
              Bizning kutubxonamizda minglab <br /> kitoblar mavjud.
            </p>
            <p className="text-gray-400 mt-2">
              Har kuni yangi kitoblar qo'shiladi, <br /> shuning uchun bizni
              kuzatib boring!
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 font-semibold">Navigatsiya</h2>
            <div className="flex flex-col gap-4 text-gray-400">
              <Link to="/" className="hover:text-white">
                Bosh sahifa
              </Link>
              <Link to="/kitoblar" className="hover:text-white">
                Kitoblar
              </Link>
              <Link to="/info" className="hover:text-white">
                Yordam
              </Link>
            </div>
          </div>
          <div>
            <h2 className="mb-2 font-semibold">Aloqa</h2>
            <p className="text-gray-400">Email: info@kutubxona.uz</p>
            <p className="text-gray-400">Telefon: +998 71 123 45 67</p>
            <p className="text-gray-400">Manzil: Toshkent, O'zbekiston</p>
            <p className="text-gray-400">Ijtimoiy tarmoqlar: @kutubxona</p>
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2025 Kutubxona. Barcha huquqlar himoyalangan.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Facebook size={20} />
            </a>

            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter size={20} />
            </a>

            <a href="#" className="text-gray-400 hover:text-white transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
