import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId || userId !== process.env.ALLOWED_CLERK_USER_ID) {
    redirect("/admin/unauthorized");
  }
  return <>{children}</>;
}
