/**
 * ZLayoutFeature — alternating image + text 2-column section block
 *
 * The PAGE is responsible for the outer container (max-w-7xl, padding, background).
 * This component renders only the grid content.
 *
 * accentColor='blue'   → #003366 accent bar before title
 * accentColor='orange' → #FF6600 accent bar before title
 * imagePosition='left' | 'right' controls column order
 */

interface ZLayoutFeatureProps {
  title: string;
  accentColor?: "blue" | "orange";
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  className?: string;
}

export default function ZLayoutFeature({
  title,
  accentColor = "blue",
  paragraphs,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  className = "",
}: ZLayoutFeatureProps) {
  const accentBg = accentColor === "orange" ? "bg-[#FF6600]" : "bg-[#003366]";

  const textBlock = (
    <div className="flex flex-col gap-6">
      <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold leading-tight flex items-center gap-3">
        <span className={`w-1.5 h-8 ${accentBg} rounded-full flex-shrink-0`}></span>
        {title}
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );

  const imageBlock = (
    <div className="w-[540px] h-[400px] max-w-full overflow-hidden flex items-center justify-center">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-[90%] h-[90%] object-contain"
        loading="lazy"
        onError={(e) => { e.currentTarget.src = "/images/products/product.webp"; }}
      />
    </div>
  );

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {imagePosition === "left" ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </div>
  );
}
