// components/header.tsx

"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search, Menu, User, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Header() {
    // --- State 추가 ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    // 로그인 form state
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");

    // 회원가입 form state
    const [signUpId, setSignUpId] = useState("");
    const [signUpPw, setSignUpPw] = useState("");
    const [signUpPwConfirm, setSignUpPwConfirm] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");

    // ⭐️ 추가: 검색 관련 state와 hook
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const linkClassName = "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

    // --- 이벤트 핸들러 ---
    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (loginId === 'test' && loginPw === '1234') {
            alert('로그인 성공!');
            setIsLoggedIn(true); setUsername(loginId); setIsLoginModalOpen(false);
            setLoginId(""); setLoginPw("");
        } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    const handleLogout = () => {
        alert('로그아웃 되었습니다.');
        setIsLoggedIn(false); setUsername("");
    };

    const handleSignUp = (e: FormEvent) => {
        e.preventDefault();
        if (!signUpId || !signUpPw || !signUpEmail) {
            alert("모든 필수 필드를 입력해주세요.");
            return;
        }
        if (signUpPw !== signUpPwConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        alert(`${signUpId}님, 회원가입이 완료되었습니다. 로그인해주세요.`);
        setIsSignUpModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const switchToSignUp = () => {
        setIsLoginModalOpen(false);
        setIsSignUpModalOpen(true);
    };
    const switchToLogin = () => {
        setIsSignUpModalOpen(false);
        setIsLoginModalOpen(true);
    };

    // ⭐️ 수정: 검색 핸들러에 FC서울 조건 추가
    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        const lowerCaseQuery = searchQuery.toLowerCase().trim();

        if (lowerCaseQuery === "아이유" || lowerCaseQuery === "iu") {
            router.push(`/event/iu-concert`);
        } else if (lowerCaseQuery === "lck" || lowerCaseQuery.includes("t1") || lowerCaseQuery.includes("gen.g")) { 
            router.push(`/booking/lck-match`);
        } else if (lowerCaseQuery === "fc서울" || lowerCaseQuery.includes("전북") || lowerCaseQuery.includes("k리그")) { // ⭐️ FC서울 관련 검색어 추가
            router.push(`/event/fc-seoul-vs-jeonbuk`);
        } else {
            router.push(`/search?query=${searchQuery}`);
        }
    };


    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <a href="/" className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-primary">TicketHub</h1>
                        </a>

                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>콘서트</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid gap-3 p-6 w-[400px]">
                                            <NavigationMenuLink asChild>
                                                <a href="/event/iu-concert" className={linkClassName}>
                                                    <div className="text-sm font-medium leading-none">국내 콘서트</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        가요, 힙합, 인디 등 다양한 국내 아티스트 공연
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>스포츠</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                                            <NavigationMenuLink asChild>
                                                <a href="/booking/lck-match" className={linkClassName}>
                                                    <div className="text-sm font-medium leading-none">e스포츠 (LCK)</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        LoL Champions Korea 경기를 직관할 수 있는 기회!
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <a href="/event/fc-seoul-vs-jeonbuk" className={linkClassName}>
                                                    <div className="text-sm font-medium leading-none">K리그</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        국내 최상위 프로축구 리그의 뜨거운 열기를 느껴보세요.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="공연, 아티스트, 장소 검색"
                                    className="pl-10 bg-muted/50"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <Button
                                    onClick={handleSearch}
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            {isLoggedIn ? (
                                <>
                                    <span className="hidden md:inline text-sm font-medium">환영합니다, {username}님!</span>
                                    <Button variant="ghost" asChild className="hidden md:inline-flex"><a href="/my-bookings">내 예매 확인</a></Button>
                                    <Button variant="ghost" onClick={handleLogout} className="hidden md:inline-flex">로그아웃</Button>
                                </>
                            ) : (
                                <div className="hidden md:flex items-center space-x-2">
                                    <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)}>로그인</Button>
                                    <Button onClick={() => setIsSignUpModalOpen(true)}>회원가입</Button>
                                </div>
                            )}
                            <Button variant="ghost" size="icon" asChild><a href="/cart"><ShoppingCart className="h-5 w-5" /></a></Button>
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu className="h-5 w-5" /></Button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden border-t py-4">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        placeholder="공연, 아티스트, 장소 검색"
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                    />
                                </div>
                                {isLoggedIn ? (
                                    <>
                                        <Button variant="ghost" asChild className="w-full justify-start"><a href="/my-bookings">내 예매 확인</a></Button>
                                        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">로그아웃</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)} className="w-full justify-start">로그인</Button>
                                        <Button variant="ghost" onClick={() => setIsSignUpModalOpen(true)} className="w-full justify-start">회원가입</Button>
                                    </>
                                )}
                                <nav className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start" asChild><a href="/concert">콘서트</a></Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild><a href="/sports">스포츠</a></Button>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
                    <div className="bg-background rounded-lg shadow-xl w-full max-w-sm p-6 relative">
                        <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={() => setIsLoginModalOpen(false)}><X className="h-5 w-5" /></Button>
                        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div><Input type="text" placeholder="아이디 (test)" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full" /></div>
                            <div><Input type="password" placeholder="비밀번호 (1234)" value={loginPw} onChange={(e) => setLoginPw(e.target.value)} className="w-full" /></div>
                            <Button type="submit" className="w-full">로그인</Button>
                            <p className="text-center text-sm text-muted-foreground">
                                계정이 없으신가요? <Button variant="link" type="button" onClick={switchToSignUp} className="p-0 h-auto">회원가입</Button>
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {isSignUpModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
                    <div className="bg-background rounded-lg shadow-xl w-full max-w-sm p-6 relative">
                        <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={() => setIsSignUpModalOpen(false)}><X className="h-5 w-5" /></Button>
                        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div><Input type="text" placeholder="아이디" value={signUpId} onChange={(e) => setSignUpId(e.target.value)} /></div>
                            <div><Input type="password" placeholder="비밀번호" value={signUpPw} onChange={(e) => setSignUpPw(e.target.value)} /></div>
                            <div><Input type="password" placeholder="비밀번호 확인" value={signUpPwConfirm} onChange={(e) => setSignUpPwConfirm(e.target.value)} /></div>
                            <div><Input type="email" placeholder="이메일" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} /></div>
                            <Button type="submit" className="w-full">가입하기</Button>
                            <p className="text-center text-sm text-muted-foreground">
                                이미 계정이 있으신가요? <Button variant="link" type="button" onClick={switchToLogin} className="p-0 h-auto">로그인</Button>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}