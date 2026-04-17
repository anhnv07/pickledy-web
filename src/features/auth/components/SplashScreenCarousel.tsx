import { Fragment } from "react";
import { Carousel } from "@/shared/components/ui/Carousel";

const slides = [
  {
    key: "home-carousel-0",
    title: (
      <>
        Tìm đúng trận.
        <br />
        Gặp đúng người.
      </>
    ),
    description: "Đăng ký buổi social, được xếp cùng người cùng trình độ.",
  },
  {
    key: "home-carousel-1",
    title: (
      <>
        Quản lý dễ.
        <br />
        Vận hành mượt.
      </>
    ),
    description: "Quản lý thành viên, theo dõi thu chi, xếp trận nhanh.",
  },
  {
    key: "home-carousel-2",
    title: (
      <>
        Chơi hôm nay.
        <br />
        Tổ chức ngày mai.
      </>
    ),
    description: "Một tài khoản, hai vai trò, không giới hạn.",
  },
] as const;

export function SplashScreenCarousel() {
  return (
    <Carousel
      slides={slides.map((s) => (
        <Fragment key={s.key}>
          <h2 className="text-[26px] font-bold leading-[1.1] tracking-tight text-near-black">
            {s.title}
          </h2>
          <p className="text-[15px] text-secondary-gray mt-3 leading-relaxed">
            {s.description}
          </p>
        </Fragment>
      ))}
      slideClassName="pl-4 pr-12"
    />
  );
}

