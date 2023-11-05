import { signIn, signOut, useSession } from 'next-auth/react';

const KakaoLogin = () => {
  const {data: session} = useSession();

  const handleClick = () => {
    if (window?.Kakao !== undefined) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/login/kakao',
      });
    }
  };

  return (
    <div>
      <button
        type="button"
        className="kakao-login-button"
        onClick={handleClick}>
        Kakao로 로그인
      </button>
      {
        session ? <>
        Signed in as {JSON.stringify(session)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
      :<>Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      </>
      }
    </div>
  );
};

export default KakaoLogin;
