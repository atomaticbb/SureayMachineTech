export default function ZLayoutFeature({
  label,
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: {
  label?: string;
  title: string;
  paragraphs: React.ReactNode[];
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}) {
  const textCol = (
    <div className="flex flex-col justify-center">
      {label && (
        <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-3">
          {label}
        </p>
      )}
      <h2 className="font-black text-3xl text-[#001f4d]  tracking-tight leading-[1.05] mb-7">
        {title}
      </h2>
      <div className="flex flex-col gap-4 border-l-2 border-slate-200 pl-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-slate-500 text-base leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );

  const imgCol = (
    <div className="p-4 lg:p-10">
      <div className="relative h-[360px] lg:h-[420px] overflow-hidden rounded-none">
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/30 to-transparent" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
        {imagePosition === "right" ? (
          <>
            {textCol}
            {imgCol}
          </>
        ) : (
          <>
            {imgCol}
            {textCol}
          </>
        )}
      </div>
    </div>
  );
}
