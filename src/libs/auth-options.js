import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'

const api = process.env.NEXT_PUBLIC_API_URL;

export default NextAuth({    
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(`${api}/login`, {
            email: credentials.email,
            password: credentials.password
          })

          if (res.data) {
            return { status: 'success', token: res.data.token }
          } else {
            throw new Error('Login failed')
          }
        } catch (error) {
          throw new Error('Login failed')
        }
      }
    })
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.accessToken = user.token
      }
      return token
    },
    session: async (session, user) => {
      session.accessToken = user.accessToken
      return session
    }
  }
})
