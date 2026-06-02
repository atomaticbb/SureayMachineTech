/*
 * HomeTestimonials — Customer trust section
 * Left: label + headline + CTA. Right: 2 testimonial cards.
 */

import { useTranslation } from "@/lib/useTranslation";

interface TestimonialCard {
  quoteKey: string;
  name: string;
  roleKey: string;
  initials: string;
}

const TESTIMONIALS: TestimonialCard[] = [
  {
    quoteKey: "home.testimonials.t1.quote",
    name: "Mark T.",
    roleKey: "home.testimonials.t1.role",
    initials: "MT",
  },
  {
    quoteKey: "home.testimonials.t2.quote",
    name: "Kevin L.",
    roleKey: "home.testimonials.t2.role",
    initials: "KL",
  },
];

export default function HomeTestimonials() {
  const { t: trans } = useTranslation();
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-12 lg:gap-16">
          {/* Left — heading */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between gap-8">
            <div>
              <p className="text-slate-500 font-bold text-xs tracking-[0.3em] uppercase mb-4">
                {trans("home.testimonials.eyebrow")}
              </p>
              <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] tracking-tight leading-[1.05]">
                {trans("home.testimonials.headline")}
              </h2>
              <div className="w-14 h-[3px] bg-slate-300 mt-6" />
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#001f4d] text-white border border-[#001f4d] hover:bg-transparent hover:text-[#001f4d] px-6 py-3 text-[14px] font-black tracking-[0.2em] transition-colors duration-200 self-start"
            >
              {trans("nav.contact").toUpperCase()}
            </a>
          </div>

          {/* Right — cards */}
          <div className="w-full lg:w-2/3 grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((card) => (
              <div
                key={card.name}
                className="bg-slate-50 p-8 flex flex-col justify-between gap-8"
              >
                <p className="text-slate-600 text-[15px] leading-relaxed italic">
                  &ldquo;{trans(card.quoteKey)}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#001f4d]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-black text-[#001f4d] tracking-wide">
                      {card.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-black text-[14px] text-[#001f4d]">
                      {card.name}
                    </p>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      {trans(card.roleKey)}
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
