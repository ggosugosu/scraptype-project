import axios from 'axios';
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const CREATE_USER = ({ kakao_id, name, email }) => `
    mutation {
        createUser(kakao_id: "${kakao_id}", name: "${name}", email: "${email}") {
            kakao_id
        }
    }
`;
export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_APP_KEY ?? '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET_KEY ?? '',
    }),
  ],
  callbacks: {
    async signIn(data) {
      // console.log('기존 데이터', JSON.stringify(data));
      // console.log('endpoint', process.env.NEXT_PUBLIC_HOST);
      // console.log('kakao_id', data.user.id);
      // console.log(
      //   'body',
      //   JSON.stringify({
      //     query: CREATE_USER({
      //       kakao_id: data.user.id,
      //       name: data.user.name,
      //       email: data.user.email,
      //     }),
      //   })
      // );

      // fetch(process.env.NEXT_PUBLIC_HOST ?? '', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     query: CREATE_USER({
      //       kakao_id: data.user.id,
      //       name: data.user.name,
      //       email: data.user.email,
      //     }),
      //   }),
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((json) => console.log(JSON.stringify(json.data, null, 2)))
      //   .catch((err) => console.log(err));

      axios
        .post(
          process.env.NEXT_PUBLIC_HOST ?? '',
          {
            query: CREATE_USER({
              kakao_id: data.user.id,
              name: data.user.name,
              email: data.user.email,
            }),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('success!!', response.data);
        })
        .catch((error) => {
          console.error('Error!!', error);
        });

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
});
