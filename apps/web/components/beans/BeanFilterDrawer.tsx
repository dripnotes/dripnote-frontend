import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  AROMA_TYPES,
  type AromaType,
  DEFAULT_FILTERS,
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
      aria-pressed={active}
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
  const dragControls = useDragControls();

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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 1 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150) {
                onClose();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-drawer-title"
            className="fixed right-0 bottom-0 left-0 z-50 flex h-full flex-col rounded-t-[2.5rem] bg-white md:hidden"
          >
            {/* Handle bar Area (Drag Trigger) */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="flex cursor-grab touch-none justify-center pt-5 pb-3 select-none active:cursor-grabbing"
            >
              <div className="h-1.5 w-12 rounded-full bg-gray-200" />
            </div>

            {/* Scrollable Content */}
            <div className="scrollbar-hide flex-1 overflow-y-auto px-6 pb-8">
              {/* 헤더 */}
              <div className="flex items-center justify-between py-4">
                <span
                  id="filter-drawer-title"
                  className="font-outfit text-sm font-semibold text-gray-800"
                >
                  Filter
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onReset();
                      setLocalFilters(DEFAULT_FILTERS);
                    }}
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
            </div>

            {/* 고정 적용 버튼 영역 */}
            <div className="shrink-0 border-t border-gray-100 bg-white px-6 py-5 pb-10">
              <div className="flex gap-3">
                <button
                  onClick={handleApply}
                  className="font-outfit flex-[2] rounded-2xl bg-amber-500 py-4 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-amber-600 active:scale-[0.98]"
                >
                  적용하기
                </button>
                <button
                  onClick={onClose}
                  className="font-outfit flex-1 rounded-2xl border border-gray-200 bg-gray-50 py-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 active:scale-[0.98]"
                >
                  취소하기
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
