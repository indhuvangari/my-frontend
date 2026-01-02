
// src/components/RatingStars.jsx
export default function RatingStars({ value = 0, size = 14 }) {
  // Calculate full, half, and empty stars
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  const starStyle = { color: '#f59e0b', fontSize: size, lineHeight: 1 };

  return (
    <div
      className="rating"
      aria-label={`Rating ${value.toFixed(1)} out of 5`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}
    >
      {/* Full stars */}
      {Array.from({ length: full }).map((_, i) => (
        <span key={`full-${i}`} style={starStyle}>★</span>
      ))}

      {/* Half star (rendered as a full star; you can replace with an SVG if you want a true half icon) */}
      {hasHalf && <span key="half" style={starStyle}>★</span>}

      {/* Empty stars */}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`empty-${i}`} style={{ ...starStyle, color: '#e5e7eb' }}>★</span>
      ))}

      {/* Numeric value */}
      <span style={{ marginLeft: 6, color: '#6b7280', fontSize: size - 1 }}>
        {value.toFixed(1)}
      </span>
    </div>
  );
}
