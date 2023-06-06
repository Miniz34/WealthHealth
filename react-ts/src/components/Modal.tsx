import { ReactNode, useRef, useEffect, useState } from "react";
import "./Modal.css";

export interface TypeFormState {
  open: number;
  errorModal?: string;
  titleModal?: string;
}

/**
 * @member {string} type
 * @member {string?} errorModal
 * @member {string} titleModal
 */
export interface TypeFormAction {
  type: string;
  errorModal?: string;
  titleModal?: string;
}

interface DispatchFunction {
  (a: TypeFormAction): void;
}

interface ModalProps {
  title?: string;
  children?: ReactNode;
  open: number;
  className?: string;
  content?: string;
  dispatch: DispatchFunction;
}

interface CrossProps {
  click: DispatchFunction;
}

interface TitleProps {
  text: string;
}

interface ContentProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <div className="modal-text">{text}</div>;
}

function Content({ text }: ContentProps) {
  return <div className="modal-content">{text}</div>;
}

function Cross({ click }: CrossProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function CloseModal(_event: React.MouseEvent<HTMLDivElement>) {
    click({ type: "0" });
  }
  return (
    <div onClick={CloseModal} className="modal-close">
      x
    </div>
  );
}

const cssClasses = ["", "modal-blue", "modal-red"];

function Modal({ title, open, className, content, dispatch }: ModalProps) {
  const contentClass =
    cssClasses[open >= 0 && open < cssClasses.length ? open : 0];

  const modalRef = useRef<HTMLDivElement>(null);

  //a utiliser
  const [opened, setOpened] = useState(open === undefined ? true : open);

  // const [opened, setOpened] = useState(true);

  useEffect(() => {
    if (!modalRef.current) {
      console.log("youhou si ce message spam c'est pas cool du tout");
      // modalRef.current = document.querySelector(
      //   ".main-modal"
      // ) as HTMLDivElement;
    }

    function closeModal() {
      dispatch({ type: "0", errorModal: "Modal closed" });
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    function handleOutsideClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dispatch]);

  return (
    <>
      {open ? (
        <div ref={modalRef} className={`${contentClass} main-modal`}>
          <div className="modal-title">
            {title && title !== "" ? <Title text={title} /> : null}
            <Cross click={dispatch} />
          </div>
          {content && content !== "" ? <Content text={content} /> : null}
        </div>
      ) : null}
    </>
  );
}

export default Modal;
