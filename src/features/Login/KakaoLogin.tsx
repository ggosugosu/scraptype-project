import Script from 'next/script';

const KakaoLogin = () => {
  const handleClick = () => {
    if (window?.Kakao !== undefined) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

      window.Kakao.Auth.authorize();
    }
  };

  return (
    <div>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
        integrity="sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH"
        crossOrigin="anonymous"
      ></Script>

      <button
        type="button"
        className="kakao-login-button"
        onClick={handleClick}
      >
        Kakao로 로그인
      </button>
    </div>
  );
};

export default KakaoLogin;
