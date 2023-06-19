import { ReactNode, useRef, useEffect, useState, useCallback } from "react";
import "./Modal.css";

/**
 * Props for the Modal component.
 * @member {string} mode - info / warning / error
 * @member {string} title - The title of the modal.
 * @member {ReactNode} children - The children components to be rendered inside the modal.
 * @member {string} className - The additional class name for styling the modal.
 * @member {Function} onClose - callback requiring a "true" value to actuallu close the modal
 * @member {Function} onClosed - callback append on modal closed
 * @member {boolean} enableFadeIn - optional
 * @member {boolean} enableFadeOut - optional
 */
interface ModalProps {
  mode: string; // "info", "error" , "warning"
  title?: string;
  children?: ReactNode;
  className?: string;
  onClosed?: () => void;
  onClose?: () => boolean;
  enableFadeIn?: boolean;
  enableFadeOut?: boolean;
}

/**
 * Renders the close button of the modal.
 * @member {Function} onClick - The callback function to be called when the close button is clicked.
 */
interface CrossProps {
  onClick: () => void;
}

/**
 * Renders the title of the modal.
 * @member {string} text - The text to be displayed as the title.
 */
interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <div className="modal-text">{text}</div>;
}

function Cross({ onClick }: CrossProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function CloseModal(_event: React.MouseEvent<HTMLDivElement>) {
    onClick();
  }
  return (
    <div onClick={CloseModal} className="modal-close">
      x
    </div>
  );
}

// const cssClasses = ["", "modal-blue", "modal-red"];
const cssClasses = new Map<string, string>();
cssClasses.set("info", "modal-blue");
cssClasses.set("warning", "modal-orange");
cssClasses.set("error", "modal-red");

function Modal({
  mode,
  title,
  children,
  enableFadeIn,
  enableFadeOut,
  onClose,
  onClosed,
}: ModalProps) {
  const contentClass = cssClasses.get(mode.toLowerCase()) || "";
  console.log(contentClass);

  const modalRef = useRef<HTMLDivElement>(null);

  //TODO
  const [isFadeOut, setIsFadeOut] = useState(false);

  console.log(isFadeOut);

  const closeModal = useCallback(() => {
    console.log("close modal");
    if (enableFadeOut) {
      if (!isFadeOut) {
        if ((onClose && onClose()) || !onClose) {
          setIsFadeOut(true);
          setTimeout(() => {
            console.log("%cClose NOW !", "color:cyan;");
            onClosed && onClosed();
            setIsFadeOut(false);
          }, 1000);
        }
      }
    } else {
      console.log("%cClose Without FADE OUT !", "color:orange;");
      if ((onClose && onClose()) || !onClose) {
        setIsFadeOut(false);
        onClosed && onClosed();
      }
    }
  }, [enableFadeOut, isFadeOut, onClose, onClosed]);

  useEffect(() => {
    if (!modalRef.current) {
      console.log("youhou si ce message spam c'est pas cool du tout");
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        console.log("escape down");
        closeModal();
      }
    }

    function handleOutsideClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        console.log("outside click");
        closeModal();
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return (
    <>
      <div
        ref={modalRef}
        className={
          "modal-main" +
          (contentClass
            ? " " +
              contentClass +
              (enableFadeIn ? " modal-fade-in" : "") +
              (isFadeOut ? " modal-fade-out" : "")
            : "")
        }
      >
        <div className="modal-title">
          {title && title !== "" ? <Title text={title} /> : null}
          <Cross onClick={closeModal} />
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>
  );
}

export default Modal;
