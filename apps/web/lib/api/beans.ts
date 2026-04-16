// Temporary Mock Data for Beans Page until backend API is ready

export type AromaType =
  | '캐러멜'
  | '와인'
  | '초콜릿'
  | '과일'
  | '허브'
  | '맥아'
  | '견과'
  | '꽃'
  | '스모크';
export type RoastingType = 'Light' | 'Medium' | 'Dark';

export interface BeanInfo {
  id: number;
  name: string;
  origin: string;
  primaryAroma: AromaType;
  aromaImageUrl: string;
  roasting: RoastingType;
  body: 1 | 2 | 3;
  /** 쓴맛 1~5 */
  bitterness: number;
  /** 단맛 1~5 */
  sweetness: number;
  /** 산미 1~5 */
  acidity: number;
  link: string;
}

export interface BeanFilterState {
  aromas: AromaType[];
  flavor: {
    bitterness: number; // 0 = 미선택
    sweetness: number;
    acidity: number;
  };
  body: 0 | 1 | 2 | 3; // 0 = 미선택
  roasting: RoastingType[];
}

export const DEFAULT_FILTERS: BeanFilterState = {
  aromas: [],
  flavor: { bitterness: 0, sweetness: 0, acidity: 0 },
  body: 0,
  roasting: [],
};

/** AromaType → Tailwind 배경 클래스 매핑 */
export const AROMA_BG_CLASS: Record<AromaType, string> = {
  캐러멜: 'bg-aroma-caramel',
  와인: 'bg-aroma-wine',
  초콜릿: 'bg-aroma-chocolate',
  과일: 'bg-aroma-fruit',
  허브: 'bg-aroma-herb',
  맥아: 'bg-aroma-malt',
  견과: 'bg-aroma-nutty',
  꽃: 'bg-aroma-floral',
  스모크: 'bg-aroma-smoky',
};

export const AROMA_TYPES: AromaType[] = [
  '캐러멜',
  '와인',
  '초콜릿',
  '과일',
  '허브',
  '맥아',
  '견과',
  '꽃',
  '스모크',
];
export const ROASTING_TYPES: RoastingType[] = ['Light', 'Medium', 'Dark'];

export const mockBeansData: BeanInfo[] = [
  {
    id: 1,
    name: 'Colombia Aristides Guarnizo',
    origin: 'HUILA, COLOMBIA',
    primaryAroma: '과일',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1568815783141-792f9dcc32fd?q=80&w=600&auto=format&fit=crop',
    roasting: 'Light',
    body: 1,
    bitterness: 1,
    sweetness: 4,
    acidity: 5,
    link: '/beans/1',
  },
  {
    id: 2,
    name: 'Ethiopia Yirgacheffe Aricha',
    origin: 'YIRGACHEFFE, ETHIOPIA',
    primaryAroma: '꽃',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1612380635121-411eda9ecbb9?q=80&w=600&auto=format&fit=crop',
    roasting: 'Light',
    body: 1,
    bitterness: 1,
    sweetness: 3,
    acidity: 4,
    link: '/beans/2',
  },
  {
    id: 3,
    name: 'Kenya AA Tatu N',
    origin: 'NYERI, KENYA',
    primaryAroma: '과일',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1639588473831-dd9d014646ae?q=80&w=600&auto=format&fit=crop',
    roasting: 'Medium',
    body: 2,
    bitterness: 2,
    sweetness: 3,
    acidity: 4,
    link: '/beans/3',
  },
  {
    id: 4,
    name: 'Guatemala El Injerto Bourbon',
    origin: 'HUEHUETENANGO, GUATEMALA',
    primaryAroma: '초콜릿',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1571091799989-e88304d6aed3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    roasting: 'Medium',
    body: 2,
    bitterness: 3,
    sweetness: 4,
    acidity: 2,
    link: '/beans/4',
  },
  {
    id: 5,
    name: 'Brazil Sul de Minas Peaberry',
    origin: 'SUL DE MINAS, BRAZIL',
    primaryAroma: '캐러멜',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1610450949065-1f2841536c88?q=80&w=600&auto=format&fit=crop',
    roasting: 'Medium',
    body: 3,
    bitterness: 3,
    sweetness: 5,
    acidity: 1,
    link: '/beans/5',
  },
  {
    id: 6,
    name: 'Sumatra Mandheling G1',
    origin: 'NORTH SUMATRA, INDONESIA',
    primaryAroma: '스모크',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1621460244277-7038c21f2f32?q=80&w=600&auto=format&fit=crop',
    roasting: 'Dark',
    body: 3,
    bitterness: 5,
    sweetness: 2,
    acidity: 1,
    link: '/beans/6',
  },
  {
    id: 7,
    name: 'Panama Geisha Elida Estate',
    origin: 'BOQUETE, PANAMA',
    primaryAroma: '꽃',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop',
    roasting: 'Light',
    body: 1,
    bitterness: 1,
    sweetness: 4,
    acidity: 5,
    link: '/beans/7',
  },
  {
    id: 8,
    name: 'Yemen Mocha Matari',
    origin: 'BANI MATAR, YEMEN',
    primaryAroma: '와인',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
    roasting: 'Medium',
    body: 2,
    bitterness: 3,
    sweetness: 3,
    acidity: 3,
    link: '/beans/8',
  },
  {
    id: 9,
    name: 'Costa Rica Tarrazu La Minita',
    origin: 'TARRAZU, COSTA RICA',
    primaryAroma: '허브',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=600&auto=format&fit=crop',
    roasting: 'Medium',
    body: 2,
    bitterness: 2,
    sweetness: 3,
    acidity: 3,
    link: '/beans/9',
  },
  {
    id: 10,
    name: 'Honduras Marcala SHG',
    origin: 'MARCALA, HONDURAS',
    primaryAroma: '맥아',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1508779018996-601e37fa274e?q=80&w=600&auto=format&fit=crop',
    roasting: 'Medium',
    body: 2,
    bitterness: 3,
    sweetness: 3,
    acidity: 2,
    link: '/beans/10',
  },
  {
    id: 11,
    name: 'Rwanda Huye Mountain',
    origin: 'HUYE, RWANDA',
    primaryAroma: '견과',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1626023873533-f5cc77cc2458?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    roasting: 'Light',
    body: 2,
    bitterness: 2,
    sweetness: 4,
    acidity: 3,
    link: '/beans/11',
  },
  {
    id: 12,
    name: 'Peru Villa Rica Organic',
    origin: 'CHANCHAMAYO, PERU',
    primaryAroma: '초콜릿',
    aromaImageUrl:
      'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=600&auto=format&fit=crop',
    roasting: 'Dark',
    body: 3,
    bitterness: 4,
    sweetness: 3,
    acidity: 2,
    link: '/beans/12',
  },
];

/** 클라이언트 사이드 필터 적용 함수 */
export function applyBeanFilters(
  beans: BeanInfo[],
  filters: BeanFilterState,
  searchQuery: string,
): BeanInfo[] {
  return beans.filter((bean) => {
    // 검색어 필터
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!bean.name.toLowerCase().includes(q) && !bean.origin.toLowerCase().includes(q)) {
        return false;
      }
    }
    // 아로마 필터 (다중 선택 → OR 조건)
    if (filters.aromas.length > 0 && !filters.aromas.includes(bean.primaryAroma)) {
      return false;
    }
    // Flavor 필터 (선택된 값 이상인 bean만 표시)
    if (filters.flavor.bitterness > 0 && bean.bitterness !== filters.flavor.bitterness)
      return false;
    if (filters.flavor.sweetness > 0 && bean.sweetness !== filters.flavor.sweetness) return false;
    if (filters.flavor.acidity > 0 && bean.acidity !== filters.flavor.acidity) return false;
    // 바디감 필터
    if (filters.body > 0 && bean.body !== filters.body) return false;
    // 로스팅 필터
    if (filters.roasting.length > 0 && !filters.roasting.includes(bean.roasting)) return false;
    return true;
  });
}
