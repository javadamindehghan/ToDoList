import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Form from "./components/Form";
import { useAddList } from "./store/List";
import ListTable from "./components/ListTable";
import Hedear from "./pages/Hedear";
import Footer from "./pages/Footer";
import Home from "./pages/Home";

const App: React.FC = () => {
  const { count } = useAddList();

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(count));
  }, [count]);

  return (
    <>
      <Hedear />
      <Home />
      <Footer />
    </>
  );
};

export default App;
