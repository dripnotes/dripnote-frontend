'use client';

import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Droplets, Layers, RotateCcw, Scale, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DEFAULT_FILTERS, type FlavorType, type ProductFilterState } from '@/lib/api/products';

import { FlavorFilter, MetricFilter, RoastingFilter, isFiltered } from './filters/FilterSections';
import ProductSearchBar from './ProductSearchBar';

interface ProductFiltersProps {
  filters: ProductFilterState;
  onApply: (payload: { filters: ProductFilterState; search: string }) => void;
  onReset: () => void;
  searchQuery: string;
  // 모바일 전용
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function ProductFilters({
  filters,
  onApply,
  onReset,
  searchQuery,
  isMobileOpen,
  onMobileClose,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const dragControls = useDragControls();

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // body 스크롤 잠금 (모바일 Drawer)
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const filtered = isFiltered(localFilters);

  const toggleFlavor = (flavor: FlavorType) => {
    setLocalFilters({
      ...localFilters,
      flavorCategory: localFilters.flavorCategory === flavor ? null : flavor,
    });
  };

  const handleApply = () => {
    onApply({ filters: localFilters, search: localSearchQuery });
    if (isMobileOpen) onMobileClose();
  };

  const handleReset = () => {
    onReset();
    setLocalFilters(DEFAULT_FILTERS);
    setLocalSearchQuery('');
  };

  // 공통으로 사용되는 필터 내용
  const renderFilterContent = (isMobile: boolean = false) => (
    <>
      <div className={isMobile ? 'border-t border-gray-100 py-4' : 'border-b border-gray-100 pb-4'}>
        <FlavorFilter selectedFlavor={localFilters.flavorCategory} onToggle={toggleFlavor} />
      </div>

      <div className={isMobile ? 'space-y-0.5' : 'space-y-1 py-3'}>
        <div className={isMobile ? 'border-t border-gray-100' : ''}>
          <MetricFilter
            label="산미"
            icon={Droplets}
            value={localFilters.flavor.acidity}
            colorPalette="acidity"
            onChange={(v) =>
              setLocalFilters({ ...localFilters, flavor: { ...localFilters.flavor, acidity: v } })
            }
          />
        </div>

        <div className={isMobile ? 'border-t border-gray-100' : ''}>
          <MetricFilter
            label="감미"
            icon={Sparkles}
            value={localFilters.flavor.sweetness}
            colorPalette="sweetness"
            onChange={(v) =>
              setLocalFilters({ ...localFilters, flavor: { ...localFilters.flavor, sweetness: v } })
            }
          />
        </div>

        <div className={isMobile ? 'border-t border-gray-100' : ''}>
          <MetricFilter
            label="바디감"
            icon={Layers}
            value={localFilters.body}
            colorPalette="body"
            onChange={(v) => setLocalFilters({ ...localFilters, body: v })}
          />
        </div>

        <div className={isMobile ? 'border-t border-gray-100' : ''}>
          <MetricFilter
            label="밸런스"
            icon={Scale}
            value={localFilters.flavor.balance}
            colorPalette="balance"
            onChange={(v) =>
              setLocalFilters({ ...localFilters, flavor: { ...localFilters.flavor, balance: v } })
            }
          />
        </div>

        <div className={isMobile ? 'border-t border-gray-100' : ''}>
          <RoastingFilter
            value={localFilters.roasting}
            onChange={(v) => setLocalFilters({ ...localFilters, roasting: v })}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ── 데스크톱 전용 패널 ── */}
      <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-56 shrink-0 flex-col md:flex">
        <div className="scrollbar-hide flex-1 overflow-x-visible overflow-y-auto px-4 pb-4">
          <div className="mb-5 flex items-center justify-between">
            <span className="font-outfit text-sm font-semibold text-gray-800">Filter</span>
            {filtered && (
              <motion.button
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
              >
                <RotateCcw className="h-3 w-3" />
                초기화
              </motion.button>
            )}
          </div>

          <div className="mb-6">
            <ProductSearchBar
              value={localSearchQuery}
              onChange={setLocalSearchQuery}
              onSubmit={handleApply}
            />
          </div>

          {renderFilterContent(false)}
        </div>

        <div className="shrink-0 border-t border-gray-100 bg-white pt-4 pb-2">
          <button
            onClick={handleApply}
            className="font-outfit w-full rounded-xl bg-amber-500 py-3.5 text-sm font-semibold text-white transition-all hover:bg-amber-600 hover:shadow-lg active:scale-[0.98]"
          >
            적용하기
          </button>
        </div>
      </aside>

      {/* ── 모바일 전용 드로어 ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />

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
                if (info.offset.y > 150) onMobileClose();
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="filter-drawer-title"
              className="fixed right-0 bottom-0 left-0 z-50 flex h-full flex-col rounded-t-[2.5rem] bg-white md:hidden"
            >
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="flex cursor-grab touch-none justify-center pt-5 pb-3 select-none active:cursor-grabbing"
              >
                <div className="h-1.5 w-12 rounded-full bg-gray-200" />
              </div>

              <div className="scrollbar-hide flex-1 overflow-y-auto px-6 pb-8">
                <div className="flex items-center justify-between py-4">
                  <span
                    id="filter-drawer-title"
                    className="font-outfit text-sm font-semibold text-gray-800"
                  >
                    Filter
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
                    >
                      <RotateCcw className="h-3 w-3" />
                      초기화
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <ProductSearchBar
                    value={localSearchQuery}
                    onChange={setLocalSearchQuery}
                    onSubmit={handleApply}
                  />
                </div>

                {renderFilterContent(true)}
              </div>

              <div className="shrink-0 border-t border-gray-100 bg-white px-6 py-5 pb-10">
                <div className="flex gap-3">
                  <button
                    onClick={handleApply}
                    className="font-outfit flex-[2] rounded-2xl bg-amber-500 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-600 active:scale-[0.98]"
                  >
                    적용하기
                  </button>
                  <button
                    onClick={onMobileClose}
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
    </>
  );
}
