import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { checkAdminAuth } from "@/app/actions/adminActions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname") || "";
  const isLoginPage = pathname === "/admin/login";
  const isAuth = await checkAdminAuth();

  // Redirect to login if unauthorized and not on the login page itself
  if (!isAuth && !isLoginPage) {
    redirect("/admin/login");
  }

  // Render children on the login page without the admin sidebar/navigation wrappers
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-cream font-body antialiased text-charcoal">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
