import { isEmpty } from 'lodash-es';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { styleAccountContainer } from './styles.css';

const Account = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (isEmpty(session)) {
      localStorage.setItem('token', '');
      return;
    }

    localStorage.setItem('token', session.accessToken);
  }, [session]);

  if (isEmpty(session)) {
    return (
      <div className={styleAccountContainer}>
        <span>로그인이 필요합니다.</span>
        <button onClick={() => signIn()}>로그인</button>
      </div>
    );
  }

  return (
    <div className={styleAccountContainer}>
      <span>{session.user?.name} 님</span>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
};

export default Account;
