'use client';

import { Button } from '@coffee-service/ui-library';
import { motion } from 'framer-motion';
import { Bookmark, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { authUtils } from '@/lib/utils/auth-utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // 초기 인증 상태 확인
    setIsAuthenticated(authUtils.isAuthenticated());

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    authUtils.removeToken();
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#1A1614]/85 text-white shadow-sm backdrop-blur-md'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-tighter">
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
          <Button variant="ghost" size="icon" aria-label="저장된 원두 및 클래스 북마크 보기">
            <Bookmark className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="로그아웃">
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button asChild variant="ghost" size="icon">
              <Link href="/login" aria-label="로그인 및 내 정보 확인">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
