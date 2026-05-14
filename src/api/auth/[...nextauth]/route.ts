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
  async signIn({ user, account, profile }) {
    if (account?.provider === "google" || account?.provider === "github") {
      try {
        // Backend ke social-login endpoint par data bhejien
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
        
        if (response.ok) return true; // DB mein data chala gaya
        else return false; // Login cancel kar do agar DB fail ho jaye
      } catch (error) {
        console.error("DB Error:", error);
        return false;
      }
    }
    return true;
  }
},

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
