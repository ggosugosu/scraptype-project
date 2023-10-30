import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import useKakaoLoginMutation from '../../src/mutations/useKakaoLoginMutation';

const KakaoRedirectPage = () => {
  const { query } = useRouter();
  const { mutate } = useKakaoLoginMutation();

  useEffect(() => {
    if (query?.code === undefined) {
      return;
    }

    // Kako API 호출
    mutate(query.code.toString(), {
      onSuccess: (data) => {
        console.log('at', data['access_token']);
        document.cookie = `tagtype_user=${data['access_token']}`;
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, [query?.code]);

  return <></>;
};

export default KakaoRedirectPage;