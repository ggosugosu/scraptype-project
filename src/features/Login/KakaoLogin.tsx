const KakaoLogin = () => {
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
        onClick={handleClick}
      >
        Kakao로 로그인
      </button>
    </div>
  );
};

export default KakaoLogin;
