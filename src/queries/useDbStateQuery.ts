import { URLS } from 'common/urls';
import { useQuery } from 'react-query';

const useDbStateQuery = () => {
  return useQuery(['dbState'], () => {
    return fetch(URLS.DB_STATE).then((res) => res.json());
  });
};

export default useDbStateQuery;