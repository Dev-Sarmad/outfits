import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center overflow-hidden relative">
        <h1 className="text-center font-bold tracking-wide text-7xl md:text-[22vw] leading-none">
          OUTFIT
        </h1>
        <span className="text-2xl md:text-5xl font-bold absolute bottom-0 right-0 md:right-15 lg:right-22">
          &reg;
        </span>
      </div>
      <div className="mt-5 h-2 bg-white" />
      <footer className="max-w-6xl grid grid-cols-2 gap-3 py-8 md:flex md:items-center md:justify-between md:py-10">
        <div className="md:mb-20 font-semibold tracking-tighter">OUTFIT</div>

        <div className="flex flex-col gap-2 font-semibold">
          Why
          <p className="text-left md:max-w-sm text-sm">
            Created by the ++hellohello team, this store and signature
            collection celebrates our collective creativity and passion for
            apparel. Carefully designed.
          </p>
        </div>

        <div className="md:mb-20 font-semibold"> Shipping & Returns</div>

        <div className="md:mb-20 font-semibold">© 2026</div>
      </footer>
    </DefaultLayout>
  );
}
