import { AROMA_DEFINITIONS, mockBeansData } from './beans';

export interface AromaNote {
  id: string; // 영문 ID (예: 'caramel')
  name: string; // 한국어 명칭 (예: '캐러멜')
  imageUrl: string;
  link: string;
}

export interface RecommendedBean {
  id: number;
  name: string;
  aromas: string[];
  imageUrl: string;
  link: string;
}

export interface MainData {
  aromas: AromaNote[];
  recommendedBeans: RecommendedBean[];
}

export const mockMainData: MainData = {
  aromas: AROMA_DEFINITIONS.map((def) => ({
    id: def.id,
    name: def.ko,
    imageUrl: def.imageUrl,
    link: `/beans?aromas=${def.id}`,
  })),
  recommendedBeans: mockBeansData.slice(0, 3).map((bean) => ({
    id: bean.id,
    name: bean.name,
    aromas: [bean.primaryAroma],
    imageUrl: bean.aromaImageUrl,
    link: `/beans/detail/${bean.id}`,
  })),
};
