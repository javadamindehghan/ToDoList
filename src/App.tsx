import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Form from "./components/Form";
import { useAddList } from "./store/List";
import ListTable from "./components/ListTable";
import Hedear from "./Hedear";
import Footer from "./Footer";

const App: React.FC = () => {
  const { count } = useAddList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(count));
  }, [count]);

  return (
    <>
      <Hedear />
      <main className="flex items-center  flex-col">
        <button
          style={{ backgroundColor: "black" }}
          onClick={openModal}
          className="text-emerald-50"
        >
          ایجاد لیست کار جدید
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title=" فرم ایجاد  کار جدید"
        >
          <Form />
        </Modal>

        <ListTable count={count} />
      </main>
      <Footer />
    </>
  );
};

export default App;
