import React from 'react';
import { Modal } from 'react-responsive-modal';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => (
  <Modal open={isOpen} center closeIcon={null}>
    <h2 className='p-10'>Are you sure you want to delete the task?</h2>
    <div className="flex justify-center gap-4 mt-4">
      <button className="btn btn-danger" onClick={onConfirm}>Yes, delete</button>
      <button className="btn btn-primary" onClick={onClose}>Cancel</button>
    </div>
  </Modal>
);

export default ConfirmDeleteModal;
