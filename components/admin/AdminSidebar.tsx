"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Receipt, 
  FolderClosed, 
  LogOut, 
  Store, 
  Menu, 
  X 
} from "lucide-react";
import { logoutAdmin } from "@/app/actions/adminActions";
import toast from "react-hot-toast";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: Receipt },
    { name: "Collections", href: "/admin/collections", icon: FolderClosed },
  ];

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navLinks = (
    <div className="flex flex-col gap-1 w-full">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-gold text-charcoal"
                : "text-warm-gray hover:bg-blush/50 hover:text-charcoal"
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <header className="lg:hidden h-16 border-b border-warm-gray/20 bg-white px-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/admin" className="font-heading text-xl italic font-bold">
          Solène Admin
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-warm-gray hover:text-charcoal rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay Drawer */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 lg:z-20 w-64 bg-white border-r border-warm-gray/20 flex flex-col h-screen transform transition-transform duration-300 lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b border-warm-gray/20 px-6 flex items-center justify-between">
          <Link href="/admin" className="font-heading text-2xl italic tracking-tight">
            Solène Candle
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 text-warm-gray hover:text-charcoal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-4 flex flex-col gap-6 overflow-y-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-warm-gray/60 px-3">
            Management
          </div>
          {navLinks}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-warm-gray/20 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-warm-gray hover:bg-blush/50 hover:text-charcoal transition-colors"
          >
            <Store className="w-4 h-4" />
            View Storefront
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
