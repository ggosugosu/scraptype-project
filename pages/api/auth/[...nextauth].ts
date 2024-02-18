import { cloneDeep, isEmpty } from 'lodash-es';
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const CREATE_USER = ({ kakao_id, name, email, token, expired_at }) => `
    mutation {
        createUser(kakao_id: "${kakao_id}", name: "${name}", email: "${email}", token: "${token}", expired_at: "${expired_at}") {
            user_id
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
    async signIn({ user, account }) {
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
            token: account?.access_token ?? '',
            expired_at: account?.expires_at ?? '',
          }),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.error(err));

      if (isEmpty(loginData)) {
      if (isEmpty(loginData.createUser)) {
        return false;
      }

      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      return cloneDeep({ ...session, accessToken: token.accessToken });
    },
  },
});
