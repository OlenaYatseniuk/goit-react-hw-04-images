import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onModalOpen, children }) {
  useEffect(() => {
    const onKeydownPress = event => {
      if (event.code === 'Escape') {
        onModalOpen();
      }
    };

    window.addEventListener('keydown', onKeydownPress);
    return () => window.removeEventListener('keydown', onKeydownPress);
  }, [onModalOpen]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onModalOpen();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onModalOpen}>
          &#10006;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
