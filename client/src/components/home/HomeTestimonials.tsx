/*
 * HomeTestimonials — Customer trust section
 * Left: label + headline + CTA. Right: 2 testimonial cards.
 */

const TESTIMONIALS = [
  {
    quote:
      "The engineering support and consistent product quality from Sureay has been instrumental in our shift to automated production lines. Their responsiveness is unmatched.",
    name: "Mark T.",
    role: "Production Manager, EU Recycling Plant",
    initials: "MT",
  },
  {
    quote:
      "Their expertise in metallurgy provided a blade solution that lasted 50% longer than our previous supplier. We saw significant savings in downtime and replacement costs.",
    name: "Kevin L.",
    role: "Procurement, Film Converting Line",
    initials: "KL",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-12 lg:gap-16">
          {/* Left — heading */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between gap-8">
            <div>
              <p className="text-slate-500 font-bold text-xs tracking-[0.3em] uppercase mb-4">
                Customer Trust
              </p>
              <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] tracking-tight leading-[1.05]">
                What Our Customers Say – Trusted by Manufacturers Worldwide
              </h2>
              <div className="w-14 h-[3px] bg-slate-300 mt-6" />
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#001f4d] text-white border border-[#001f4d] hover:bg-transparent hover:text-[#001f4d] px-6 py-3 text-[14px] font-black tracking-[0.2em] transition-colors duration-200 self-start"
            >
              CONTACT US
            </a>
          </div>

          {/* Right — cards */}
          <div className="w-full lg:w-2/3 grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 p-8 flex flex-col justify-between gap-8"
              >
                <p className="text-slate-600 text-[15px] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#001f4d]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-black text-[#001f4d] tracking-wide">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-black text-[14px] text-[#001f4d]">
                      {t.name}
                    </p>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
