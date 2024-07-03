import { LoginUser, LoginWithGoogle } from "@/lib/services/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CREDENTIALS
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // CEK USER
        const user: any = await LoginUser({ email, password });

        if (user) {
          // CEK PASSWORD
          const checkPassword = await compare(password, user.password);
          if (!checkPassword) return null;
          return user;
        } else {
          return null;
        }
      },
    }),

    // GOOGLE AUTH
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      // login credentials
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
        token.image = user.image;
      }

      // login google auth
      if (account?.provider === "google") {
        // mendapatkan data user google
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };

        // ADD DATA KE FIREBASE/UPDATE
        await LoginWithGoogle(data);
        if (data) {
          token.email = data.email;
          token.fullname = data.fullname;
          token.role = data.role;
          token.image = data.image;
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.name = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
