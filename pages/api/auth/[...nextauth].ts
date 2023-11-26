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
      fetch(process.env.NEXT_PUBLIC_HOST ?? '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CREATE_USER({
            kakao_id: data.user.id,
            name: data.user.name,
            email: data.user.email,
          }),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.error(err));

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
});
