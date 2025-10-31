import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex justify-between items-center p-4  ">
          <h2 className="text-lg font-semibold w-full text-center">{title}</h2>
          <button
            onClick={onClose}
            style={{ backgroundColor: "black" }}
            className="text-amber-50 bg-amber-300   hover:text-"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4 ">
          <button
            style={{ backgroundColor: "black" }}
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
