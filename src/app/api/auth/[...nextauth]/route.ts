import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/',
    error: '/',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const response = await fetch("https://cortex-api-htc8.onrender.com/user/social-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              photo: user.image,
              provider: account.provider,
            }),
          });
          
          if (response.ok) {
            const json = await response.json().catch(() => ({}));
            if (json.user) {
              (user as any).role = json.user.role;
              (user as any).backendToken = json.token;
            }
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error("DB Error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        const email = (user.email || "").toLowerCase().trim();
        const isAdmin = email === "anmolsingh26ff@gmail.com" || email === "anmol@cortexwebsolutions.com";
        token.role = u.role || (isAdmin ? "ADMIN" : "USER");
        token.backendToken = u.backendToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const email = (session.user.email || "").toLowerCase().trim();
        const isAdmin = email === "anmolsingh26ff@gmail.com" || email === "anmol@cortexwebsolutions.com";
        (session.user as any).role = (token as any).role || (isAdmin ? "ADMIN" : "USER");
        (session.user as any).token = (token as any).backendToken;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
