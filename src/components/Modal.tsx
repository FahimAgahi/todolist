import React, { ReactNode } from 'react';

type ModalType = {
  isAddModalOpen: boolean;
  children: Element | ReactNode;
  className: string;
  handleModal: (val: boolean) => void;
};
const Modal: React.FC<ModalType> = ({
  isAddModalOpen,
  children,
  className,
  handleModal,
}) => {
  return (
    <>
      <div
        aria-hidden="true"
        onClick={(): void => handleModal(false)}
        className="w-full h-screen bg-black bg-opacity-20 flex items-center justify-center fixed top-0 right-0"
      />

      <div
        className={`bg-white rounded-lg w-4/12 py-6 px-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${className}`}
      >
        {isAddModalOpen}
        {children}
      </div>
    </>
  );
};

export default Modal;
