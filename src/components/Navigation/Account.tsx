import { isEmpty } from 'lodash-es';
import { signIn, signOut, useSession } from 'next-auth/react';

const Account = () => {
  const { data: session } = useSession();

  if (isEmpty(session)) {
    return <button onClick={() => signIn()}>로그인이 필요합니다.</button>;
  }

  return (
    <div>
      <span>{session.user?.name} 님</span>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
};

export default Account;
