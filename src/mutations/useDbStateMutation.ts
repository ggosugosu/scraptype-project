import { URLS } from 'common/urls';
import { useMutation } from 'react-query';

type DbStateAction = 'start' | 'stop';
const useDbStateMutation = () => {
  return useMutation(['dbState'], ({action}: { action: DbStateAction }) => {
    return fetch(`${URLS.DB_STATE}?action=${action}`, {
      method: 'POST',
    }).then((res) => res.json());
  });
};

export default useDbStateMutation;