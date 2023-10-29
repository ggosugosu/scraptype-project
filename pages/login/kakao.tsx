import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, [query?.code]);

  return <></>;
};

export default KakaoRedirectPage;
