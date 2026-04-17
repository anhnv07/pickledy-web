type SplashScreenHeroProps = {
  imageSrc: string;
};

export function SplashScreenHero({ imageSrc }: SplashScreenHeroProps) {
  return (
    <div className="relative">
      <img
        alt="Pickleball Action"
        className="w-full h-full object-cover"
        src={imageSrc}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-linear-to-t from-white to-transparent" />
      <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-[42px] font-extrabold tracking-tighter text-brand-rausch leading-none">
          PickleDy
        </h1>
        <p className="text-[17px] font-bold text-near-black mt-1">
          Chơi tốt hơn. Quản lý dễ hơn.
        </p>
      </div>
    </div>
  );
}

