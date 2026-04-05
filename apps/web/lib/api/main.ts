// Temporary Mock Data utility to feed the Main Page until backend API is ready
export interface FlavorNote {
  tasting_name: string;
  tasting_link: string;
}

export interface RecommendedBean {
  bean_name: string;
  bean_tasting: string[];
  bean_image_link: string;
  bean_link: string;
}

export interface MainData {
  tastings: FlavorNote[];
  beans: RecommendedBean[];
}

export const mockMainData: MainData = {
  tastings: [
    { tasting_name: '카카오', tasting_link: '/api/beans?tastingId=1' },
    { tasting_name: '복숭아', tasting_link: '/api/beans?tastingId=2' },
    { tasting_name: '자스민', tasting_link: '/api/beans?tastingId=3' },
    { tasting_name: '딸기', tasting_link: '/api/beans?tastingId=4' },
    { tasting_name: '밀크초콜릿', tasting_link: '/api/beans?tastingId=5' },
    { tasting_name: '포도', tasting_link: '/api/beans?tastingId=6' },
  ],
  beans: [
    {
      bean_name: '콜롬비아 엘 파라이소',
      bean_tasting: ['리치', '요거트', '복숭아'],
      bean_image_link:
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
      bean_link: '/beans/detail/12',
    },
    {
      bean_name: '케냐 AA 타투 N',
      bean_tasting: ['자몽', '블랙커런트', '와이니'],
      bean_image_link:
        'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop',
      bean_link: '/beans/detail/11',
    },
    {
      bean_name: '에티오피아 예가체프 아리차',
      bean_tasting: ['베르가못', '살구', '꽃향'],
      bean_image_link:
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop',
      bean_link: '/beans/detail/13',
    },
  ],
};
