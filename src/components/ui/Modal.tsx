import styles from "./modal.module.css";
import React from "react";

export default function Modal(props: any) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (props.visible) {
      setVisible(props.visible);
    }
  }, [props]);

  const onMouseClick = (e: any) => {
    const modalDialogContent = document.querySelector("#modalDialogContent");

    if (!modalDialogContent || !modalDialogContent.contains(e.target)) {
      setVisible(false);
    }
  };

  return (
    <div
      className={[styles.modalCustom, visible ? "show" : "fade"].join(" ")}
      style={{ zIndex: visible ? 999 : -1 }}
      onClick={onMouseClick}
    >
      <div
        className={styles.modalDialog}
        id="modalDialogContent"
        role="document"
      >
        <div className="modal-content">
          <div className={styles.modalHeader}>
            <h5 className="modal-title">
              <b>Chose a banner</b>
            </h5>
            <button
              type="button"
              className={styles.buttonClose}
              onClick={() => setVisible(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              data-dismiss="modal"
              onClick={() => {
                setVisible(false);
                if (props && props.onClose) {
                  props.onClose();
                }
              }}
            >
              Close
            </button>
            <button type="button" className={styles.confirm} onClick={() => {
                setVisible(false);
                if (props && props.onConfirm) {
                  props.onConfirm();
                }
              }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
