import React, { useState } from "react";
import warning from "../../assets/images/warning.png";

const DeleteModal = ({ show, onClose, onConfirm, messag }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-96 bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl min-h-1/4">
        <div className="bg-red-500 p-4 flex justify-center rounded-b-lg h-52">
          <img src={warning} alt={warning} className="p-10" />
        </div>
        <div className="p-6">
          <p className="text-3xl font-medium text-red-500 text-center mt-5">
            Are you sure?
          </p>
          <p className="text-lg text-gray-700 text-center mt-8">
            Are you sure you want to delete this student's information?
          </p>
          <p className="text-lg text-red-500 text-center">
            This action cannot be undone.
          </p>
          <div className="flex justify-center gap-6 mt-10 mx-5">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-6 py-4 text-lg rounded-xl hover:bg-red-600 w-full"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-6 py-4 text-lg rounded-xl hover:bg-gray-400 w-full "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
