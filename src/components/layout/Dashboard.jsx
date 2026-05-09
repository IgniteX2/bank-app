export default function DashboardLayout({
  sidebar,
  topbar,
  mobilebar,
  children,
}) {
  return (
    <div className="dashboard-layout flex">
      {sidebar}

      <div className="main flex-1 flex flex-col">
        {topbar}

        <div className="content p-4">{children}</div>
        {mobilebar}
      </div>
    </div>
  );
}
