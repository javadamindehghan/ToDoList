
import Modal from "../components/Modal";
import Form from "../components/Form";
import ListTable from "../components/ListTable";
import { useAddList } from "./../store/List";
import { useState } from "react";
export default function Home() {
  const { count } = useAddList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
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
  );
}
