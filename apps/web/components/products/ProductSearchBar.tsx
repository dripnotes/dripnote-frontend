'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export default function ProductSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = '검색어를 입력하세요',
}: ProductSearchBarProps) {
  const [isComposing, setIsComposing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSubmit) onSubmit();
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full p-0.5">
      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder={placeholder}
        className="font-outfit h-10 w-full rounded-xl bg-white pr-10 pl-11 text-sm text-gray-800 shadow-sm ring-1 ring-gray-300 transition-all outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="검색어 초기화"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
