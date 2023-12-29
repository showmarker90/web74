import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import useAuth from "../../hooks/useAuth";

const Layout = ({ children }) => {
  const { getMe } = useAuth();

  useEffect(() => {
    getMe();
  }, []);
  return (
    <div>
      <Header />
      <MainContent>{children}</MainContent>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
