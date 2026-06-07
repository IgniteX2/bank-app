import { useEffect, useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "../../helperFunctions/DateFormatter";

import { useTransactionHistoryStore } from "@/stores/useTransactionsStore";
import { useAccountStore } from "../../stores/useAccountStore";
import { LuArrowDownUp } from "react-icons/lu";
import { GrMoney, GrUpdate } from "react-icons/gr";
import { RxCalendar } from "react-icons/rx";
import TransactionsTableSkeleton from "../../skeletons/transactionTableSkeleton";

export default function TransactionsTable() {
  const fetchAccount = useAccountStore((state) => state.fetchAccount);

  const fetchTransactions = useTransactionHistoryStore(
    (state) => state.fetchTransactions,
  );

  const transactions = useTransactionHistoryStore(
    (state) => state.transactions,
  );

  const isLoading = useTransactionHistoryStore((state) => state.isLoading);

  const [openRow, setOpenRow] = useState(null);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  useEffect(() => {
    fetchAccount();
    fetchTransactions();
  }, [fetchAccount, fetchTransactions]);

  if (isLoading) {
    return (
      <div className="p-4">
        <TransactionsTableSkeleton />
      </div>
    );
  }

  return (
    <div className="rounded-md border-none  bg-white  overflow-auto">
      <Table>
        <TableHeader className="bg-gray-50 border-gray-300">
          <TableRow className=" border-gray-300 text-gray-700">
            {/* <TableHead /> */}
            <TableHead>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <LuArrowDownUp /> Type
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                {" "}
                <GrMoney /> Amount
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                {" "}
                <GrUpdate /> Status
              </div>
            </TableHead>
            <TableHead className="text-right float-right flex items-center gap-1">
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                {" "}
                <RxCalendar /> Date/Time
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-xs text-gray-600">
          {transactions
            .slice()
            .sort(
              (a, b) =>
                new Date(b.transactionCreatedAt) -
                new Date(a.transactionCreatedAt),
            )
            .slice(0, 4)
            .map((tx) => (
              <Fragment key={tx.transactionId}>
                {/* MAIN ROW */}
                <TableRow
                  className="cursor-pointer hover:bg-gray-50  border-gray-200 pt-4 pb-4"
                  onClick={() => toggleRow(tx.transactionId)}
                >
                  <TableCell>{tx.transactionType}</TableCell>

                  <TableCell className="text-center font-medium">
                    ₦{Number(tx.amount).toLocaleString()}
                  </TableCell>

                  <TableCell className="text-center">
                    <span
                      style={{ padding: "5px", fontSize: "10px" }}
                      className={`${
                        tx.status === "SUCCESS"
                          ? "bg-green-500"
                          : tx.status === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      } text-white rounded-xl text-xs shadow-sm`}
                    >
                      {tx.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-right text-gray-500">
                    {formatDate(tx.transactionCreatedAt)}
                  </TableCell>
                </TableRow>

                {/* EXPANDED ROW */}
                {openRow === tx.transactionId && (
                  <TableRow className="bg-gray-50 ">
                    <TableCell colSpan={5} className="p-6 ">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-gray-500">Transaction ID</p>
                          <p className="font-medium">{tx.transactionId}</p>
                        </div>

                        <div>
                          <p className="text-gray-500">Sender Account</p>
                          <p className="font-medium">
                            {tx.senderAccountId ?? "N/A"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Receiver Account</p>
                          <p className="font-medium">
                            {tx.receiverAccountId ?? "N/A"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Description</p>
                          <p className="font-medium ">{tx.description}</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
