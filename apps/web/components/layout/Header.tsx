'use client';

import { motion } from 'framer-motion';
import { Bookmark, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-gray-200/50 bg-white/80 text-gray-900 shadow-sm backdrop-blur-md'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          Dripnote
        </Link>
        <nav className="hidden space-x-8 text-sm font-medium md:flex">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/beans" className="hover:text-primary transition-colors">
            Bean Info
          </Link>
          <Link href="/classes" className="hover:text-primary transition-colors">
            Classes
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            className="rounded-full p-2 transition-colors hover:bg-black/5"
            aria-label="저장된 원두 및 클래스 북마크 보기"
          >
            <Bookmark className="h-5 w-5" />
          </button>
          <Link
            href="/login"
            className="rounded-full p-2 transition-colors hover:bg-black/5"
            aria-label="로그인 및 내 정보 확인"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
