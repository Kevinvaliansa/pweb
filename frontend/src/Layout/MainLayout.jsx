import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
