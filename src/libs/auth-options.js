import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                        email: credentials.email,
                        password: credentials.password
                    });

                    if (response.data.token) {
                        return { ...response.data.user, token: response.data.token };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.name = user.name;
                token.accessToken = user.token;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.name = token.name;
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: '/admin/auth/login',
        signOut: '/admin/auth/login',
    }
};

export { authOptions };
