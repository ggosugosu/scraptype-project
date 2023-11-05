import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
    providers: [
        KakaoProvider({
            clientId: process.env.NEXT_PUBLIC_KAKAO_APP_KEY ?? '',
            clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET_KEY ?? ''
        }),
    ]
});