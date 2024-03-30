import { Navbar } from "./_componets/navbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default DashboardLayout;
