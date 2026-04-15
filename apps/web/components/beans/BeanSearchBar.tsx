'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface BeanSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function BeanSearchBar({
  value,
  onChange,
  placeholder = '원두 이름 또는 원산지를 입력하세요',
}: BeanSearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onChange(newVal);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="font-outfit h-12 w-full rounded-xl bg-gray-50 pr-10 pl-11 text-sm text-gray-800 ring-1 ring-gray-200 transition-all outline-none placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-amber-500"
      />
      {localValue && (
        <button
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
