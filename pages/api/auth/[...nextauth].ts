import { isEmpty, isNil } from 'lodash-es';
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const CREATE_USER = ({ kakao_id, name, email }) => `
    mutation {
        createUser(kakao_id: "${kakao_id}", name: "${name}", email: "${email}") {
            kakao_id
            role
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
    async signIn({ user }) {
      const loginData = await fetch(process.env.NEXT_PUBLIC_HOST ?? '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CREATE_USER({
            kakao_id: user.id,
            name: user.name,
            email: user.email,
          }),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.error(err));

      if (isEmpty(loginData)) {
        return false;
      }

      const loginRole = loginData.data.createUser.role;

      if (isNil(loginRole)) {
        return false;
      }

      return true;
    },
  },
});
