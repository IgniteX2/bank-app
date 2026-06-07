export default function UserDetailsSkeleton() {
  return (
    <div style={{ marginBottom: "5%" }} className="flex items-center gap-3  ">
      {/* Avatar */}
      <div className="relative overflow-hidden w-12 h-12 rounded-full bg-gray-200">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <div className="relative overflow-hidden h-5 w-28 rounded bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <div className="relative overflow-hidden h-4 w-40 rounded bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
