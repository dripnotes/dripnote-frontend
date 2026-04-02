import LoginCarousel from '@/components/LoginCarousel';
import SocialLoginButton from '@/components/SocialLoginButton';

export default function LoginPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center p-4 select-none md:p-8">
      <div className="flex h-full max-h-[580px] w-full max-w-[980px] flex-col overflow-hidden rounded-lg bg-white shadow-[0_20px_50px_rgba(139,69,19,0.15)] md:flex-row">
        {/* Left Side: Carousel (6:4 at 900px+, transitions to 5:5 until 768px/md) */}
        <div className="900:basis-[60%] hidden h-full transition-all duration-700 ease-in-out md:block md:basis-[50%]">
          <LoginCarousel />
        </div>

        {/* Right Side: Login Form (4:6 at 900px+, transitions to 5:5 until 768px/md) */}
        <div className="900:basis-[40%] z-10 flex flex-1 flex-col justify-center bg-white px-10 shadow-[-20px_0_30px_rgba(0,0,0,0.03)] transition-all duration-700 ease-in-out md:basis-[50%] md:px-14">
          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#3D2B1F] md:text-4xl">
              로그인
            </h1>
            <p className="text-[#8C5A3C]/70">소셜 계정으로 간편 로그인</p>
          </div>

          <div className="flex flex-col gap-3">
            <SocialLoginButton provider="google" />
            <SocialLoginButton provider="kakao" />
            <SocialLoginButton provider="naver" />
          </div>

          <div className="mt-8 flex justify-center gap-4 text-center text-xs leading-relaxed text-[#A67B5B]">
            <a
              href="#"
              className="underline-offset-4 transition-colors hover:text-[#6F4E37] hover:underline"
            >
              서비스 약관
            </a>
            <a
              href="#"
              className="underline-offset-4 transition-colors hover:text-[#6F4E37] hover:underline"
            >
              개인정보 처리방침
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
