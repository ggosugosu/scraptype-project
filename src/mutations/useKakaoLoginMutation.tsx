import { toQueryParams } from 'features/utils';
import { forEach, map } from 'lodash-es';
import { useMutation } from 'react-query';

const useKakaoLoginMutation = () =>
  useMutation((code: string) =>
    fetch(
      `https://kauth.kakao.com/oauth/token?${toQueryParams({
        ...JSON_BODY,
        code: code,
      })}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    ).then((res) => res.json())
  );

const JSON_BODY = {
  grant_type: 'authorization_code',
  client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '',
  redirect_uri: 'http://localhost:3000/login/kakao',
  client_secret: process.env.NEXT_PUBLIC_KAKAO_SECRET_KEY ?? '',
};

export default useKakaoLoginMutation;
