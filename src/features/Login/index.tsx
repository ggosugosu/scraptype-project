import PageTitle from 'components/PageTitle';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  return (
    <>
      <PageTitle title="Login" onClick={() => router.push('/')} />
      <section>로그인하자</section>
    </>
  );
};

export default Login;
