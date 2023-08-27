import { ButtonPositive } from 'components/Button';
import PageTitle from 'components/PageTitle';
import useDbStateMutation from 'mutations/useDbStateMutation';
import { useRouter } from 'next/router';
import useDbStateQuery from 'queries/useDbStateQuery';
import React from 'react';

type DbStateType = 'starting' | 'available' | 'stopping' | 'stopped' | 'rebooting';
const DB_STATES_DESCRIPTION: Record<DbStateType, string> = {
  'starting': '시작 중',
  'available': '사용 가능',
  'stopping': '정지 중',
  'stopped': '정지',
  'rebooting': '재부팅 중'
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
          alert('시작되었습니다. 적용까지 최대 3분의 시간이 소요됩니다.');
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
                <ul>
                  <li>불필요한 과금을 막기 위해서 DB의 상태를 관리합니다. 생각보다 돈이 많이 나가더라고요.</li>
                  <li>한 시간에 두 번씩 DB가 켜져 있으면 끄는 타이머가 돌고 있으므로, 장시간 이용 중에는 갑자기 DB가 꺼질 수 있습니다.</li>
                  <li>DB가 꺼지면, 다시 [시작하기]를 눌러주세요. 최대 3분이 소요됩니다. 큰 문제 없다면 약 1분 안으로 켜집니다.</li>
                  <li>정지를 원할 때 [정지 중]인 상태면 꺼진거나 마찬가지니 안심하시고 페이지에서 나가셔도 됩니다.</li>
                </ul>
                <h2>
                  DB 상태 - {DB_STATES_DESCRIPTION[data?.status]}
                </h2>
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