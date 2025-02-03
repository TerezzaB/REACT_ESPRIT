import React from 'react';
import { createPortal } from 'react-dom';

export default function InfoModal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 z-index-50">
      <div className="p-4 rounded shadow-lg w-100 max-w-sm max-w-md-sm w-100 max-w-lg w-100 max-w-xl max-h-90 overflow-auto _modal">
        <h2 className="h4 fw-bold my-3">Info</h2>
        <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: content }}></div>
        <button className="my-4 px-4 py-2 bg-danger text-white rounded" onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};
