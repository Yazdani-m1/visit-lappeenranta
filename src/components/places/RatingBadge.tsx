// src/components/places/RatingBadge.tsx
interface RatingBadgeProps {
  rating: number;
}

export function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
      <span>★</span>
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}
