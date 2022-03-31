import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const Q_UserList = gql`
  query {
    user {
      id
      name
      email
    }
  }
`;

function UserList() {
  const { loading, error, data } = useQuery(Q_UserList);
  const users = data ? data.user : [];

  console.log(users);
  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            {user.name}({user.email})
          </div>
        ))}
      <pre>Bad: {error && error.graphQLErrors.map(({ message }, i) => <span key={i}>{message}</span>)}</pre>
    </div>
  );
}

export default UserList;
