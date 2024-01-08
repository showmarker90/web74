import React, { createContext, useEffect, useState } from "react";
import Header from "./shared/components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "./shared/components/Footer";
import Layout from "./shared/layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Profile from "./pages/Profile";
import useAuth from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import DetailPost from "./pages/DetailPost";

// Create a client
const queryClient = new QueryClient();

export const AppContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<DetailPost />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user/:id" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <ToastContainer />
        </BrowserRouter>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
