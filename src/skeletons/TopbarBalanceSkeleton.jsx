export default function TopbarBalanceSkeleton() {
  return (
    <div className="relative overflow-hidden h-6 w-25 rounded-sm bg-gray-200">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}
