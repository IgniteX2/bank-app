import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ShimmerCell({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-gray-200 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

export default function TransactionsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border-none bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-300">
            <TableHead>
              <ShimmerCell className="h-4 w-16" />
            </TableHead>

            <TableHead>
              <ShimmerCell className="h-4 w-24" />
            </TableHead>

            <TableHead>
              <ShimmerCell className="h-4 w-20 " />
            </TableHead>

            <TableHead className="float-right flex items-center gap-1">
              <ShimmerCell className="h-4 w-32" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={index} className="border-gray-200">
              <TableCell>
                <ShimmerCell className="h-4 w-20" />
              </TableCell>

              <TableCell>
                <ShimmerCell className="h-4 w-28" />
              </TableCell>

              <TableCell>
                <ShimmerCell className="h-6 w-16  rounded-lg" />
              </TableCell>

              <TableCell className="float-right">
                <ShimmerCell className="h-4 w-36" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
