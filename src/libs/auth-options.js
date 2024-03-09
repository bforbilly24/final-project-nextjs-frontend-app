// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/libs/prisma";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
// import jwt from "jsonwebtoken";

// const authOptions = {
// 	adapter: PrismaAdapter(prisma),
// 	pages: {
// 		signIn: "/admin/auth/login",
// 	},
// 	session: {
// 		strategy: "jwt",
// 		// d * h * m * s
// 		maxAge: 3 * 24 * 60 * 60, // 3 days
// 	},
// 	// jwt: {
// 	// 	// d * h * m * s
// 	// 	maxAge: 3 * 24 * 60 * 60, // 30 days

// 	// 	async encode({ token, secret, maxAge }) {
// 	// 		const claimToken = {
// 	// 			id: token.id,
// 	// 			name: token.username,
// 	// 			username: token.username,
// 	// 			email: token.email,
// 	// 		};
// 	// 		const encodedToken = jwt.sign(claimToken, secret, { expiresIn: maxAge });
// 	// 		return encodedToken;
// 	// 	},

// 	// 	async decode({ token, secret, maxAge }) {
// 	// 		const verifiedToken = jwt.verify(token, secret);
// 	// 		return verifiedToken;
// 	// 	},
// 	// },
// 	providers: [
// 		CredentialsProvider({
// 			name: "credentials",
// 			credentials: {
// 				email: { label: "Email", type: "email" },
// 				password: { label: "Password", type: "password" },
// 			},

// 			async authorize(credentials, req) {
// 				try {
// 					if (!credentials?.email || !credentials?.password) return null;
// 					const existingUser = await prisma.admin.findUnique({
// 						where: { email: credentials.email },
// 					});

// 					if (!existingUser) return null;

// 					const passwordMatch = await compare(credentials?.password, existingUser?.password);

// 					if (!passwordMatch) return null;

// 					return {
// 						id: existingUser?.id,
// 						name: existingUser?.name,
// 						username: existingUser?.username,
// 						email: existingUser?.email,
// 					};
// 				} catch (error) {
// 					console.log(error);
// 				}
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		// async signIn({ user, account, profile, email, credentials }) {
// 		// 	return true;
// 		// },

// 		// async redirect({ url, baseUrl }) {
// 		// 	return baseUrl;
// 		// },

// 		async session({ session, token, user }) {
// 			const data = {
// 				id: token.id,
// 				name: token.name,
// 				username: token.username,
// 				email: token.email,
// 			};
// 			return data;
// 		},
// 		async jwt({ token, user, account, profile, isNewUser }) {
// 			if (user) {
// 				token.id = user.id;
// 				token.name = user.name;
// 				token.username = user.username;
// 				token.email = user.email;
// 			}
// 			return token;
// 		},
// 	},
// };

// export { authOptions };
