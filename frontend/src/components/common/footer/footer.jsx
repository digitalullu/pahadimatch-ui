import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-rose-600">
            <Heart className="h-5 w-5 fill-current" />
            <span className="font-semibold">PahadiMatch</span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-rose-600 transition">About Us</a>
            <a href="#" className="hover:text-rose-600 transition">Privacy</a>
            <a href="#" className="hover:text-rose-600 transition">Terms</a>
            <a href="#" className="hover:text-rose-600 transition">Help</a>
          </div>
          
          <p className="text-sm text-gray-600">
            © 2025 PahadiMatch. Made with <Heart className="inline h-4 w-4 fill-rose-500 text-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;