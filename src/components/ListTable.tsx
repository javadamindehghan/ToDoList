import { useState } from "react";
import { useAddList } from "../store/List";
import FormEdit from "./FormEdit";
import Modal from "./Modal";


interface List {
  title: string;
  subtitle: string;
  date: string;
  id: number;
}
interface ListTableProps {
  count: List[];
}

const ListTable: React.FC<ListTableProps> = () => {
  const { count, deleteList } = useAddList();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<List>();
  const openEditModal = (item: List) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);
  const handleDelete = (id: number) => {
    deleteList(id);
  };
  return count.length >= 1 ? (
    <>
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title=" فرم ویرایش"
      >
        {currentItem &&currentItem.id && (
          <FormEdit
            id ={currentItem?.id?currentItem?.id:0} 
            initialValues={{
              title: currentItem.title,
              subtitle: currentItem.subtitle,
            }}
          />
        )}
      </Modal>
      <table className="table-auto flex-1 justify-center items-center mt-10">
        <thead className="border-2 bg-amber-300">
          <tr className="border-2">
            <th className="p-4 ">ردیف</th>
            <th className="p-4 ">عنوان</th>
            <th className="p-4 ">توضیحات</th>
            <th className="p-4 "> تاریخ ایجاد</th>
            <th className="p-4 "></th>
            <th className="p-4 "></th>
          </tr>
        </thead>
        <tbody>
          {count.map((item, index) => (
            <tr className="border-2" key={item.id}>
              <td className="p-4">{index + 1}</td>
              <td className="p-4 text-left">{item.title}</td>
              <td className="p-4">{item.subtitle}</td>
              <td className="p-4">{item.date}</td>
              <td>
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-amber-300"
                >
                  ویرایش
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-fuchsia-500"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <h1 className="m-7">لیست کاری وجود ندارد</h1>
  );
};
export default ListTable;
