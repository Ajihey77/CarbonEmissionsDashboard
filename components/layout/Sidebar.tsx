"use client";

import { useCompanyStore } from "@/store/company";
import { LayoutDashboard, BarChart3, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const { companyName, country } = useCompanyStore();
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: BarChart3,
      label: "Reports",
      href: "/reports",
    },
  ];

  return (
    <aside className="w-48 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r  rounded-lg flex items-center justify-center text-white font-bold text-sm">
            <Image src="/image/logo.png" alt="Logo" width={200} height={200} />
          </div>
          <span className="font-semibold text-gray-900">HanaLoop</span>
        </Link>
      </div>

      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {companyName}
            </div>
            <div className="text-xs text-gray-500">{country}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
