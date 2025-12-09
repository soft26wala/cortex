// /api/auth/[...nextauth].ts  (pages router)
// ya app/api/auth/[...nextauth]/route.ts  (app router)
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        const email = user.email;
        const name = user.name;
        const photo = user.image;

        // yahan tumhari Node.js API call hogi
        await fetch("http://localhost:4000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            photo,
            // agar phone, age, gender nahi hai to null/send later
            phone: null,
            age: null,
            gender: null,
            provider: account?.provider, // optional extra field
          }),
        });

        return true; // login allow
      } catch (e) {
        console.error("Error saving user to API", e);
        // agar error pe login block karna hai:
        // return false;
        return true;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
