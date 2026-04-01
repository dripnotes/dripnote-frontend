import SocialLoginButton from '@/components/SocialLoginButton';

export default function Home() {
  return (
    <div className="m-auto flex w-[300px] flex-col items-center justify-center gap-4">
      <h1>Home</h1>
      <SocialLoginButton provider="google" />
      <SocialLoginButton provider="kakao" />
      <SocialLoginButton provider="naver" />
    </div>
  );
}
