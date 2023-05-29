import "./Modal.css";

interface ModalProps {
  etat: number;
}

function Modal({ etat }: ModalProps) {
  let content: string;
  let contentClass: string;

  if (etat === 1) {
    contentClass = "modal-blue";
    content = "Employee Created!";
  } else if (etat === 2) {
    contentClass = "modal-red";
    content =
      "Error somewhere in the form, really clear error message you're welcome";
  }

  return (
    <>
      <div className={contentClass}>
        <div>cross</div>
        <div>{content}</div>
      </div>
    </>
  );
}

export default Modal;
