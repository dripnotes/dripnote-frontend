'use client';

import { motion } from 'framer-motion';
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

interface BeanFilterPanelProps {
  filters: BeanFilterState;
  onChange: (filters: BeanFilterState) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const isFiltered = (filters: BeanFilterState) =>
  filters.aromas.length > 0 ||
  filters.flavor.bitterness > 0 ||
  filters.flavor.sweetness > 0 ||
  filters.flavor.acidity > 0 ||
  filters.body > 0 ||
  filters.roasting.length > 0;

const SECTION_TITLE =
  'font-outfit mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500';

/** 아로마·로스팅 Chip */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-all ${
        active
          ? 'bg-amber-500 font-semibold text-white shadow-sm'
          : 'border border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100'
      }`}
    >
      {label}
    </motion.button>
  );
}

/** N등분 Rating Bar */
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
    <div className="flex w-full gap-1 rounded-md bg-transparent">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const isActive = n <= value;
        const colorClass = isActive
          ? `${getActiveColor(n, max)} border-transparent`
          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300';
        return (
          <motion.button
            key={n}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(value === n ? 0 : n)}
            className={`h-7 flex-1 rounded border text-xs transition-colors duration-200 ${colorClass}`}
            aria-label={`${n}점`}
          />
        );
      })}
    </div>
  );
}

export default function BeanFilterPanel({
  filters,
  onChange,
  onReset,
  searchQuery,
  onSearchChange,
}: BeanFilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const filtered = isFiltered(localFilters);

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
  };

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-56 shrink-0 flex-col md:flex">
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {/* 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <span className="font-outfit text-sm font-semibold text-gray-800">Filter</span>
          {filtered && (
            <motion.button
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
            >
              <RotateCcw className="h-3 w-3" />
              초기화
            </motion.button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <BeanSearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Aroma */}
        <div className="border-b border-gray-100 pb-5">
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
        <div className="border-b border-gray-100 py-5">
          <p className={SECTION_TITLE}>Flavor</p>
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs text-gray-500">쓴맛</p>
              <RatingBar
                max={5}
                value={localFilters.flavor.bitterness}
                onChange={(v) =>
                  setLocalFilters({
                    ...localFilters,
                    flavor: { ...localFilters.flavor, bitterness: v },
                  })
                }
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs text-gray-500">단맛</p>
              <RatingBar
                max={5}
                value={localFilters.flavor.sweetness}
                onChange={(v) =>
                  setLocalFilters({
                    ...localFilters,
                    flavor: { ...localFilters.flavor, sweetness: v },
                  })
                }
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs text-gray-500">산미</p>
              <RatingBar
                max={5}
                value={localFilters.flavor.acidity}
                onChange={(v) =>
                  setLocalFilters({
                    ...localFilters,
                    flavor: { ...localFilters.flavor, acidity: v },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="border-b border-gray-100 py-5">
          <div className="flex items-center justify-between">
            <p className={SECTION_TITLE}>Body</p>
            <p className="text-xs text-gray-400">
              {localFilters.body === 1
                ? '가벼움'
                : localFilters.body === 2
                  ? '보통'
                  : localFilters.body === 3
                    ? '묵직함'
                    : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex w-full flex-1 flex-col gap-1.5">
              <RatingBar
                max={3}
                value={localFilters.body}
                onChange={(v) =>
                  setLocalFilters({ ...localFilters, body: v as BeanFilterState['body'] })
                }
              />
            </div>
          </div>
        </div>

        {/* Roasting */}
        <div className="pt-5 pb-5">
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
      </div>

      {/* 스티키 적용 버튼 */}
      <div className="shrink-0 border-t border-gray-100 bg-white pt-4 pb-2">
        <button
          onClick={handleApply}
          className="font-outfit w-full rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
        >
          적용하기
        </button>
      </div>
    </aside>
  );
}
