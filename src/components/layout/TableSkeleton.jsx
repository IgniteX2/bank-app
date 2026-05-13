function TableSkeleton({ isMobile }) {
  return (
    <>
      {isMobile ? (
        <div
          className="w-full overflow-hidden rounded-lg border border-gray-200"
          style={{ height: "400px" }}
        >
          <table
            className="min-w-full divide-y divide-gray-200 text-gray-500"
            style={{ height: "400px", textAlign: "left" }}
          >
            <thead className="bg-gray-50" style={{ height: "60px" }}>
              <tr>
                <th className="px-0 py-0 " style={{ paddingLeft: "20px" }}>
                  Transaction
                </th>

                <th className="px-6 py-3 text-left">
                  <div className=" text-gray-500">Date</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
              <tr cclassName="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="w-full overflow-hidden rounded-lg border border-gray-200"
          style={{ height: "400px" }}
        >
          <table
            className="min-w-full divide-y divide-gray-200 text-gray-500"
            style={{ height: "400px", textAlign: "left" }}
          >
            <thead className="bg-gray-50" style={{ height: "60px" }}>
              <tr>
                <th className="px-0 py-0 " style={{ paddingLeft: "20px" }}>
                  Transaction
                </th>
                <th className="px-6 py-3 text-left">
                  <div className=" text-gray-500">Amount</div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className=" text-gray-500">Date</div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className=" text-gray-500">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td
                  className="whitespace-nowrap px-6 py-4"
                  style={{ paddingLeft: "20px" }}
                >
                  <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-8 w-1/2 rounded bg-gray-200"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TableSkeleton;
