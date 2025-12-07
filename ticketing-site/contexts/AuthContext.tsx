// contexts/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

// Context 생성: user 정보와 로딩 상태를 가집니다.
const AuthContext = createContext<{ user: User | null; loading: boolean }>({ 
  user: null, 
  loading: true 
});

// Provider 컴포넌트: 앱 전체를 감싸서 인증 상태를 제공합니다.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 현재 세션 정보를 가져옵니다.
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    
    getSession();

    // Supabase의 인증 상태 변경(로그인, 로그아웃 등)을 감지하는 리스너를 설정합니다.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // 컴포넌트가 언마운트될 때 리스너를 정리합니다.
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth 훅: 다른 컴포넌트에서 쉽게 user 정보에 접근할 수 있게 합니다.
export function useAuth() {
  return useContext(AuthContext);
}