import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const MarcketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">
        <div> Marcketing Layout </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarcketingLayout;
