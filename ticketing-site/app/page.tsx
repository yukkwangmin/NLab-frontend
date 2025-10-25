// app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // lib 폴더의 클라이언트 사용

// 기존 UI 컴포넌트들을 그대로 불러옵니다.
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
// import { EventGrid } from "@/components/event-grid"; // <- DB 데이터를 직접 쓰므로 더 이상 필요 없습니다.
import { Categories } from "@/components/categories";
import { Footer } from "@/components/footer";

// Ticket 데이터의 타입을 정의합니다
interface Ticket {
  id: number;
  name: string;
  price: number;
  available_seats: number;
}

export default function HomePage() {
  // DB에서 가져온 티켓 목록을 저장할 변수
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // 데이터를 불러오는 중인지 표시할 변수
  const [loading, setLoading] = useState(true);

  // 페이지가 처음 로드될 때 한 번만 실행됩니다
  useEffect(() => {
    async function getTickets() {
      const { data, error } = await supabase
        .from('tickets') // SQL로 만든 테이블 이름
        .select('*');

      if (error) {
        console.error('Error fetching tickets:', error);
      } else if (data) {
        setTickets(data);
      }
      setLoading(false); // 로딩 완료
    }

    getTickets();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        
        {/* --- 이 부분이 EventGrid를 대체하는 DB 연동 부분입니다 --- */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">진행중인 공연</h2>
          {loading ? (
            <p>공연 목록을 불러오는 중...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg shadow-lg overflow-hidden bg-card text-card-foreground">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{ticket.name}</h3>
                    <p>가격: {ticket.price.toLocaleString()} 원</p>
                    <p className="text-sm text-muted-foreground">남은 좌석: {ticket.available_seats}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        {/* --- 여기까지 --- */}
        
      </main>
      <Footer />
    </div>
  )
}