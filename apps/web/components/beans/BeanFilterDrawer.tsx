'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  AROMA_TYPES,
  type AromaType,
  type BeanFilterState,
  ROASTING_TYPES,
  type RoastingType,
} from '@/lib/api/beans';

import BeanSearchBar from './BeanSearchBar';

interface BeanFilterDrawerProps {
  isOpen: boolean;
  filters: BeanFilterState;
  onChange: (filters: BeanFilterState) => void;
  onReset: () => void;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs transition-all ${
        active
          ? 'bg-amber-500 font-semibold text-white shadow-sm'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </motion.button>
  );
}

function RatingBar({
  max,
  value,
  onChange,
}: {
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const getActiveColor = (n: number, max: number) => {
    if (max === 5) {
      if (n === 1) return 'bg-amber-200';
      if (n === 2) return 'bg-amber-300';
      if (n === 3) return 'bg-amber-400';
      if (n === 4) return 'bg-amber-500';
      return 'bg-amber-600';
    } else if (max === 3) {
      if (n === 1) return 'bg-amber-300';
      if (n === 2) return 'bg-amber-500';
      return 'bg-amber-600';
    }
    return 'bg-amber-500';
  };

  return (
    <div className="flex w-full gap-1.5 rounded-md bg-transparent">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const isActive = n <= value;
        const colorClass = isActive ? getActiveColor(n, max) : 'bg-gray-100 hover:bg-gray-200';
        return (
          <motion.button
            key={n}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(value === n ? 0 : n)}
            className={`h-8 flex-1 rounded transition-colors duration-200 ${colorClass}`}
            aria-label={`${n}점`}
          />
        );
      })}
    </div>
  );
}

const SECTION_TITLE =
  'font-outfit mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400';

export default function BeanFilterDrawer({
  isOpen,
  filters,
  onChange,
  onReset,
  onClose,
  searchQuery,
  onSearchChange,
}: BeanFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleAroma = (aroma: AromaType) => {
    const next = localFilters.aromas.includes(aroma)
      ? localFilters.aromas.filter((a) => a !== aroma)
      : [...localFilters.aromas, aroma];
    setLocalFilters({ ...localFilters, aromas: next });
  };

  const toggleRoasting = (r: RoastingType) => {
    const next = localFilters.roasting.includes(r)
      ? localFilters.roasting.filter((x) => x !== r)
      : [...localFilters.roasting, r];
    setLocalFilters({ ...localFilters, roasting: next });
  };

  const handleApply = () => {
    onChange(localFilters);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed right-0 bottom-0 left-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white px-6 md:hidden"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            {/* 헤더 */}
            <div className="flex items-center justify-between py-4">
              <span className="font-outfit text-sm font-semibold text-gray-800">Filter</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={onReset}
                  className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
                >
                  <RotateCcw className="h-3 w-3" />
                  초기화
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <BeanSearchBar value={searchQuery} onChange={onSearchChange} />
            </div>

            {/* Aroma */}
            <div className="border-t border-gray-100 py-5">
              <p className={SECTION_TITLE}>Aroma</p>
              <div className="flex flex-wrap gap-2">
                {AROMA_TYPES.map((a) => (
                  <Chip
                    key={a}
                    label={a}
                    active={localFilters.aromas.includes(a)}
                    onClick={() => toggleAroma(a)}
                  />
                ))}
              </div>
            </div>

            {/* Flavor */}
            <div className="border-t border-gray-100 py-5">
              <p className={SECTION_TITLE}>Flavor</p>
              <div className="space-y-4">
                {(['bitterness', 'sweetness', 'acidity'] as const).map((key) => (
                  <div key={key}>
                    <p className="mb-2 text-xs text-gray-500">
                      {key === 'bitterness' ? '쓴맛' : key === 'sweetness' ? '단맛' : '산미'}
                    </p>
                    <RatingBar
                      max={5}
                      value={localFilters.flavor[key]}
                      onChange={(v) =>
                        setLocalFilters({
                          ...localFilters,
                          flavor: { ...localFilters.flavor, [key]: v },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="border-t border-gray-100 py-5">
              <p className={SECTION_TITLE}>Body</p>
              <div className="flex w-full items-center gap-3">
                <div className="flex-1">
                  <RatingBar
                    max={3}
                    value={localFilters.body}
                    onChange={(v) =>
                      setLocalFilters({ ...localFilters, body: v as BeanFilterState['body'] })
                    }
                  />
                </div>
                <span className="text-xs text-gray-400">
                  {localFilters.body === 1
                    ? '가벼움'
                    : localFilters.body === 2
                      ? '보통'
                      : localFilters.body === 3
                        ? '묵직함'
                        : ''}
                </span>
              </div>
            </div>

            {/* Roasting */}
            <div className="border-t border-gray-100 py-5 pb-8">
              <p className={SECTION_TITLE}>Roasting</p>
              <div className="flex flex-wrap gap-2">
                {ROASTING_TYPES.map((r) => (
                  <Chip
                    key={r}
                    label={r}
                    active={localFilters.roasting.includes(r)}
                    onClick={() => toggleRoasting(r)}
                  />
                ))}
              </div>
            </div>

            {/* 스티키 적용 버튼 */}
            <div className="sticky bottom-0 -mx-6 border-t border-gray-100 bg-white px-6 py-4">
              <button
                onClick={handleApply}
                className="font-outfit w-full rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
              >
                적용하기
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
