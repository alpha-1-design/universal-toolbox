import React from "react";

export function Skeleton({ width, height, radius = 6, style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...style,
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 11 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Skeleton width={36} height={36} radius={8} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Skeleton width={100} height={13} />
            <Skeleton width={60} height={11} />
          </div>
        </div>
        <Skeleton width={18} height={18} radius={4} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Skeleton width="100%" height={12} />
        <Skeleton width="80%" height={12} />
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <Skeleton width={50} height={20} radius={12} />
        <Skeleton width={40} height={20} radius={12} />
        <Skeleton width={50} height={20} radius={12} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--border)", marginTop: "auto" }}>
        <Skeleton width={60} height={12} />
        <Skeleton width={55} height={26} radius={6} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="tool-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
