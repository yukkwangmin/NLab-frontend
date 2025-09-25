// app/my-bookings/page.tsx

import { Button } from "@/components/ui/button";
import { Header } from "@/components/header"; // 기존 Header 컴포넌트를 import 합니다.

export default function MyBookingsPage() {
  return (
    <>
      {/* Header를 포함하여 일관된 레이아웃을 유지합니다. */}
      <Header /> 
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">
          내 예매 내역
        </h1>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p className="text-lg text-muted-foreground">
            아직 예매 내역이 없습니다.
          </p>
          <Button asChild className="mt-6">
            <a href="/">티켓 예매하러 가기</a>
          </Button>
        </div>
      </main>
    </>
  );
}