"use client";

import { useRouter } from "next/navigation";
import { SplashScreenCarousel } from "../components/SplashScreenCarousel";
import { SplashScreenHero } from "../components/SplashScreenHero";
import { Button } from "@/src/shared/components/ui/Button";

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-between min-h-dvh h-full">
            <SplashScreenHero imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDwpZ10PWomN_RD5zz-GX23SoeIN0281ZpKFiYEDQZ0MaS0WWA0mZ6aXrJZt3KGoRNrZMUpnR0bQug6wJk2fPWX1msbyaXjiYh1XtxmacCjO7f2ROJmjklPP_q--DL6mD9Xs0b9mTw4rPr7Lye9QD3vee6wh7hHzhkA_WJKUMiFYp5MqJpntGPLyn9s6xtK6QNllmzMu-e_YDwLW__-lwyBB8CgInHqQ2Da8Pdac5MB-kIA5KpSGiBqcU5dqyXJtiHrWGIWuIsO2dZF" />
            <SplashScreenCarousel />
            <div className="px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))]">
                <Button
                    size="lg"
                    className="w-full h-[48px] rounded-lg font-bold shadow-sm"
                    onClick={() => router.push("/login")}
                >
                    Đăng nhập hoặc Đăng ký
                </Button>
            </div>
        </div>
    );
};

export default HomePage;