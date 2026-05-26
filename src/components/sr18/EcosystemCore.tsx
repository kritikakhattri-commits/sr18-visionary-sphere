import { motion } from "motion/react";

const VERTICALS = [
  { name: "Gaming", angle: 0 },
  { name: "Technology", angle: 51.4 },
  { name: "Real Estate", angle: 102.8 },
  { name: "Textile", angle: 154.2 },
  { name: "Consultancy", angle: 205.7 },
  { name: "Investments", angle: 257.1 },
  { name: "Beverages", angle: 308.5 },
];

interface Props {
  size?: number;
  highlight?: string | null;
  showLabels?: boolean;
}

export function EcosystemCore({ size = 520, highlight = null, showLabels = true }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.88 0.07 85 / 0.55), transparent 70%)",
        }}
      />

      <svg viewBox={`0 0 ${size} ${size}`} className="relative w-full h-full">
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.95 0.04 85)" />
            <stop offset="60%" stopColor="oklch(0.82 0.08 82)" />
            <stop offset="100%" stopColor="oklch(0.55 0.09 75)" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.78 0.085 82 / 0.05)" />
            <stop offset="50%" stopColor="oklch(0.78 0.085 82 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.78 0.085 82 / 0.05)" />
          </linearGradient>
        </defs>

        {/* concentric orbits */}
        {[1, 0.78, 0.55].map((s, i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r * s}
            fill="none"
            stroke="oklch(0.78 0.085 82 / 0.18)"
            strokeWidth={0.6}
            initial={{ rotate: 0 }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 80 + i * 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* connection lines */}
        {VERTICALS.map((v) => {
          const rad = (v.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * r;
          const y = cy + Math.sin(rad) * r;
          const active = highlight === v.name;
          return (
            <motion.line
              key={v.name}
              x1={cx} y1={cy} x2={x} y2={y}
              stroke="url(#lineGrad)"
              strokeWidth={active ? 1.5 : 0.7}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: active ? 1 : 0.55 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          );
        })}

        {/* node points */}
        {VERTICALS.map((v, i) => {
          const rad = (v.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * r;
          const y = cy + Math.sin(rad) * r;
          const active = highlight === v.name;
          return (
            <g key={v.name}>
              <motion.circle
                cx={x} cy={y}
                r={active ? 9 : 5}
                fill={active ? "oklch(0.78 0.085 82)" : "oklch(0.99 0 0)"}
                stroke="oklch(0.78 0.085 82)"
                strokeWidth={1.2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "easeOut" }}
              />
              {active && (
                <motion.circle
                  cx={x} cy={y} r={5}
                  fill="oklch(0.78 0.085 82)"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
            </g>
          );
        })}

        {/* central core */}
        <motion.circle
          cx={cx} cy={cy} r={size * 0.09}
          fill="url(#coreGrad)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={cx} cy={cy} r={size * 0.13}
          fill="none"
          stroke="oklch(0.78 0.085 82 / 0.4)"
          strokeWidth={0.6}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <text
          x={cx} y={cy + 4}
          textAnchor="middle"
          className="text-display"
          style={{ fontSize: size * 0.05, fill: "oklch(0.18 0.01 250)", fontWeight: 500, letterSpacing: "-0.02em" }}
        >
          SR18
        </text>
      </svg>

      {/* labels */}
      {showLabels && VERTICALS.map((v) => {
        const rad = (v.angle * Math.PI) / 180;
        const lr = r + size * 0.08;
        const x = cx + Math.cos(rad) * lr;
        const y = cy + Math.sin(rad) * lr;
        const active = highlight === v.name;
        return (
          <motion.span
            key={v.name}
            className={`absolute text-[10px] uppercase tracking-[0.25em] transition-colors ${
              active ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
            style={{
              left: x, top: y,
              transform: `translate(-50%, -50%)`,
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {v.name}
          </motion.span>
        );
      })}
    </div>
  );
}

export const SR18_VERTICALS = VERTICALS;
