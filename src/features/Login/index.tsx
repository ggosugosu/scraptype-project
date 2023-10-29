import PageTitle from 'components/PageTitle';
import { useRouter } from 'next/router';
import KakaoLogin from './KakaoLogin';

const Login = () => {
  const router = useRouter();
  return (
    <>
      <PageTitle title="Login" onClick={() => router.push('/')} />
      <section>
        <h2>Tagtype</h2>
        <p>더욱 다양한 기능을 사용하려면 로그인 해주세요</p>
        <KakaoLogin />
      </section>
    </>
  );
};

export default Login;
