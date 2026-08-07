import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaClient) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                const parsed = credentialsSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const user = await prismaClient.user.findUnique({
                    where: { email: parsed.data.email },
                });

                if (!user || !user.password) return null;

                const passwordMatches = await bcrypt.compare(parsed.data.password, user.password);
                if (!passwordMatches) return null;

                return { id: user.id, name: user.name, email: user.email, image: user.image };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = { ...session.user, id: token.id as string } as { id: string, name: string, email: string }
            return session
        }
    }
}
