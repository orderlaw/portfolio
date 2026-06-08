import { SignIn } from "@clerk/nextjs";

export default function AdminLogin() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#fff" }}
    >
      <SignIn
        fallbackRedirectUrl="/admin/dashboard"
        signUpFallbackRedirectUrl="/admin/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#7c3aed",
            colorBackground: "#ffffff",
            colorText: "#2a2822",
            colorTextSecondary: "#78746c",
            colorInputBackground: "#ffffff",
            colorInputText: "#2a2822",
            borderRadius: "0.5rem",
            fontFamily: "var(--font-fauna)",
          },
          elements: {
            card: "shadow-none border",
            headerTitle: { fontFamily: "var(--font-playfair)", fontStyle: "italic" },
            headerSubtitle: { display: "none" },
          },
        }}
      />
    </main>
  );
}
