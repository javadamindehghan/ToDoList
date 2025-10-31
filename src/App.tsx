import "./App.css";
import { useAddList } from "./store/List";
import Hedear from "./pages/Hedear";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import { useEffect } from "react";

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
