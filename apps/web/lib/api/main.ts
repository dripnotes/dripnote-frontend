import { AROMA_DEFINITIONS, type BeanInfo, mockBeansData } from './beans';

export interface AromaNote {
  id: string; // 영문 ID (예: 'caramel')
  name: string; // 한국어 명칭 (예: '캐러멜')
  imageUrl: string;
  link: string;
}

/**
 * RecommendedBean - 메인 페이지용 추천 원두 타입.
 * BeanInfo의 핵심 필드를 포함하여 BeanCard와 호환되도록 구성합니다.
 */
export interface RecommendedBean
  extends Pick<
    BeanInfo,
    | 'id'
    | 'name'
    | 'origin'
    | 'primaryAroma'
    | 'aromaImageUrl'
    | 'link'
    | 'balance'
    | 'sweetness'
    | 'acidity'
    | 'body'
    | 'roasting'
  > {}

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
  recommendedBeans: mockBeansData.slice(0, 4).map((bean) => ({
    id: bean.id,
    name: bean.name,
    origin: bean.origin,
    primaryAroma: bean.primaryAroma,
    aromaImageUrl: bean.aromaImageUrl,
    link: `/beans/${bean.id}`,
    balance: bean.balance,
    sweetness: bean.sweetness,
    acidity: bean.acidity,
    body: bean.body,
    roasting: bean.roasting,
  })),
};
