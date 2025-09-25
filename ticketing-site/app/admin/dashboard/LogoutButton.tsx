// app/admin/dashboard/LogoutButton.tsx

"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    router.push('/admin'); // 로그인 페이지로 이동
    router.refresh(); 
  };
  return (
    <Button variant="ghost" size="sm" className="w-full justify-start gap-3" onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      로그아웃
    </Button>
  );
}