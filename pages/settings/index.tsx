import { ButtonPositive } from 'components/Button';
import PageTitle from 'components/PageTitle';
import useDbStateMutation from 'mutations/useDbStateMutation';
import { useRouter } from 'next/router';
import useDbStateQuery from 'queries/useDbStateQuery';
import React from 'react';

type DbStateType = 'starting' | 'available' | 'stopping' | 'stopped';
const DB_STATES_DESCRIPTION: Record<DbStateType, string> = {
  'starting': '시작 중',
  'available': '사용 가능',
  'stopping': '정지 중',
  'stopped': '정지',
};
const SettingsPage = () => {
  const router = useRouter();
  const {data, error, isLoading, refetch} = useDbStateQuery();
  const {mutate} = useDbStateMutation();

  const handleControl = () => {
    if (data?.status === 'stopping' || data?.status === 'starting') {
      alert('이미 시작/정지 중입니다. 잠시만 기다려주세요.');
      return;
    }

    if (data?.status === 'available') {
      mutate({action: 'stop'}, {
        onSuccess: () => {
          alert('정지되었습니다.');
          refetch();
        },
        onError: () => {
          alert('에러가 발생했습니다. 담덕에게 문의하세요.');
        }
      });
      return;
    }

    if (data?.status === 'stopped') {
      mutate({action: 'start'}, {
        onSuccess: () => {
          alert('시작되었습니다.');
          refetch();
        },
        onError: () => {
          alert('에러가 발생했습니다. 담덕에게 문의하세요.');
        }
      });
      return;
    }
  };

  if (error) {
    return (
      <section>
        <h1>에러가 발생했습니다. 담덕에게 문의하세요.</h1>
        <p>{JSON.stringify(error)}</p>
      </section>
    );
  }

  return (
    <>
      <PageTitle title="DB SETTING" onClick={() => router.push('/')} />
      <section>
        {
          isLoading ?
            <div>...Loading</div>
            : (
              <>
                <h2>
                  DB 상태
                </h2>
                <p>
                  {DB_STATES_DESCRIPTION[data?.status]}
                </p>
                <ButtonPositive onClick={handleControl}
                                text={data?.status === 'available' ? '정지하기' : '시작하기'}
                                enabled={data?.status === 'available' || data?.status === 'stopped'} />
              </>
            )
        }
      </section>
    </>

  );
};

export default SettingsPage;