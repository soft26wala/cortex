// /api/auth/[...nextauth].ts  (pages router)
// ya app/api/auth/[...nextauth]/route.ts  (app router)
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
    signIn: '/', // Agar aapka login button home page par hai to '/' likhein
    error: '/',  // Error aane par bhi aapka hi page dikhega
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        const email = user.email;
        const name = user.name;
        const photo = user.image;

        // yahan tumhari Node.js API call hogi
        await fetch(`${process.env.NEXT_PUBLIC_API}/user/social-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            photo,
            provider: account?.provider, // optional extra field
            password: null
          }),
        });

        return true; // login allow
      } catch (e) {
        console.error("Error saving user to API", e);
        return true;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
