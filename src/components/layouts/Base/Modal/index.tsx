import React from "react";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const Modal: React.FunctionComponent<ModalProps> = ({
                                                        show,
                                                        onClose,
                                                        onConfirm,
                                                        title = "Confirm",
                                                        message = "Are you sure you want to proceed?",
                                                    }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-title">
                    <h4>{title}</h4>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    <p>{message}</p>
                </div>
                <div className="modal-buttons">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-outline-danger" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
