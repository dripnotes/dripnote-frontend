'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';

import BeanCardList from '@/components/beans/BeanCardList';
import BeanFilterDrawer from '@/components/beans/BeanFilterDrawer';
import BeanFilterPanel from '@/components/beans/BeanFilterPanel';
import BeanSearchBar from '@/components/beans/BeanSearchBar';
import {
  applyBeanFilters,
  DEFAULT_FILTERS,
  type BeanFilterState,
  mockBeansData,
} from '@/lib/api/beans';

export default function BeansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BeanFilterState>(DEFAULT_FILTERS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredBeans = useMemo(
    () => applyBeanFilters(mockBeansData, filters, searchQuery),
    [filters, searchQuery],
  );

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="min-h-screen bg-white">
      {/* ── 본문 ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex gap-8">
          {/* 좌측 필터 패널 (Desktop/Tablet) */}
          <BeanFilterPanel filters={filters} onChange={setFilters} onReset={handleReset} />

          {/* 우측 카드 목록 */}
          <div className="min-w-0 flex-1">
            {/* 검색 및 필터 정보 영역 */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full flex-1 items-center gap-3 sm:w-auto">
                <BeanSearchBar value={searchQuery} onChange={setSearchQuery} />

                {/* 모바일 필터 버튼 */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs text-gray-600 transition-colors hover:border-amber-300 hover:text-amber-600 md:hidden"
                  aria-label="필터 열기"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* 결과 수 */}
              <div className="font-outfit shrink-0 text-xs text-gray-400">
                {filteredBeans.length}개의 원두
              </div>
            </div>

            <BeanCardList beans={filteredBeans} isLoading={false} />
          </div>
        </div>
      </div>

      {/* 모바일 필터 Drawer */}
      <BeanFilterDrawer
        isOpen={isDrawerOpen}
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
