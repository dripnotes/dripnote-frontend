import { buttonVariants } from '@coffee-service/ui-library';
import { Coffee } from 'lucide-react';
import Link from 'next/link';

export default function BeanNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400">
        <Coffee className="h-10 w-10" />
      </div>
      <h2 className="font-playfair text-3xl font-bold text-gray-900 md:text-5xl mb-4">
        Bean Not Found
      </h2>
      <p className="mb-8 max-w-md text-gray-600">
        요청하신 원두를 찾을 수 없습니다. 주소가 잘못되었거나 현재 준비 중인 원두일 수 있습니다.
      </p>
      <Link
        href="/beans"
        className={buttonVariants({ variant: 'default', size: 'lg', className: 'rounded-full px-8' })}
      >
        원두 둘러보기
      </Link>
    </div>
  );
}
