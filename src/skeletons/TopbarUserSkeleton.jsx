export default function TopbarUserSkeleton() {
  return (
    <div
      style={{ marginBottom: "5%" }}
      className="flex items-center gap-3 animate-pulse "
    >
      {/* Avatar */}
      <div className="relative overflow-hidden w-9 h-9 rounded-full bg-gray-200">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
    </div>
  );
}
