import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import "./Modal.css";
import { ModalContext } from "./ModalProvider";

/*
 * Props for the Modal component.
 * @member {string} mode - info / warning / error
 * @member {string} title - The title of the modal.
 * @member {ReactNode | null} children - The children components to be rendered inside the modal.
 * @member {string} className - The additional class name for styling the modal.
 * @member {Function | null} onClose - callback requiring a "true" value to actuallu close the modal
 * @member {Function | null} onClosed - callback append on modal closed
 * @member {boolean} enableFadeIn - optional
 * @member {boolean} enableFadeOut - optional
 */
/*
interface ModalProps {
  open?: boolean;
  mode?: string; // "info", "error" , "warning", ""
  title?: string;
  children?: ReactNode | null;
  className?: string;
  onClosed?: (() => void) | null;
  onClose?: (() => boolean) | null;
  enableFadeIn?: boolean;
  enableFadeOut?: boolean;
}
*/

/**
 * Renders the close button of the modal.
 * @member {Function} onClick - The callback function to be called when the close button is clicked.
 */
interface CrossProps {
  onClick: () => void;
  closePosition: string;
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

function Cross({ onClick, closePosition }: CrossProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function CloseModal(_event: React.MouseEvent<HTMLDivElement>) {
    onClick();
  }
  return (
    <div
      onClick={CloseModal}
      className={
        closePosition
          ? "modal-close" + " " + `modal-close-${closePosition}`
          : "modal-close" + " " + "modal-close-outside-right"
      }
    >
      ⨯
    </div>
  );
}

// const cssClasses = ["", "modal-blue", "modal-red"];
const cssClasses = new Map<string, string>();
cssClasses.set("info", "modal-blue");
cssClasses.set("warning", "modal-orange");
cssClasses.set("error", "modal-red");

//TODO
//modal-main-center : fixed causes display bug
cssClasses.set("custom", "modal-custom");
cssClasses.set("default", "modal-default");

function Modal() {
  const {
    open,
    delay,
    mode,
    modalPosition,
    title,
    height,
    width,
    backgroundColor,
    backgroundColorTitle,
    closePosition,
    textColor,
    borderRadius,
    boxShadow,
    border,
    borderColor,
    orientation,
    subChildren,
    enableFadeIn,
    enableFadeOut,
    onClose,
    onClosed,
    CloseModal,
  } = useContext(ModalContext);

  const contentClass = mode ? cssClasses.get(mode.toLowerCase()) || "" : "";

  const modalRef = useRef<HTMLDivElement>(null);
  const [isFadeOut, setIsFadeOut] = useState(false);
  if (delay > 0) {
    setTimeout(() => {
      closeModal();
    }, delay + (enableFadeIn ? 1000 : 0));
  }

  const closeModal = useCallback(() => {
    if (enableFadeOut) {
      if (!isFadeOut) {
        if ((onClose && onClose()) || !onClose) {
          setIsFadeOut(true);
          setTimeout(() => {
            onClosed && onClosed();
            setIsFadeOut(false);
            CloseModal();
          }, 1000);
        }
      }
    } else {
      if ((onClose && onClose()) || !onClose) {
        setIsFadeOut(false);
        onClosed && onClosed();
        CloseModal();
      }
    }
  }, [CloseModal, enableFadeOut, isFadeOut, onClose, onClosed]);

  useEffect(() => {
    if (!modalRef.current) {
      console.log("current");
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
  }, [closeModal]);

  return (
    <>
      {open && (
        <div
          ref={modalRef}
          className={
            (mode === "error" ||
            mode === "warning" ||
            mode === "info" ||
            mode === "" ||
            mode === "default"
              ? `modal-main${orientation}`
              : "") +
            " " +
            (contentClass ? contentClass : "") +
            (enableFadeIn ? " modal-fade-in" : "") +
            (isFadeOut ? " modal-fade-out" : "") +
            " " +
            (modalPosition
              ? `modal-main-${modalPosition}`
              : "modal-main-center")
          }
          style={{
            ...(height ? { height: height } : null),
            ...(width ? { width: width } : null),
            ...(backgroundColor ? { backgroundColor: backgroundColor } : null),
            ...(textColor ? { color: textColor } : null),
            ...(borderRadius ? { borderRadius: borderRadius } : null),
            ...(boxShadow ? { boxShadow: boxShadow } : null),
            ...(border ? { border: border } : null),
          }}
        >
          <div
            className="modal-title"
            style={{
              paddingLeft: title && orientation === "horizontal" ? "10px" : 0,
              paddingRight: title && orientation === "horizontal" ? "10px" : 0,
              ...(backgroundColorTitle
                ? { backgroundColor: backgroundColorTitle }
                : null),
            }}
          >
            {title && title !== "" ? <Title text={title} /> : null}
            {mode === "error" ||
            mode === "warning" ||
            mode === "info" ||
            mode === "" ||
            mode === "default" ? (
              <Cross onClick={closeModal} closePosition={closePosition} />
            ) : (
              ""
            )}
          </div>
          <div
            className={
              "modal-body" +
              (title ? " modal-title-exist" : "") +
              (orientation === "horizontal" ? " modal-horizontal" : "")
            }
            style={
              orientation === "horizontal"
                ? borderColor
                  ? { borderLeft: borderColor }
                  : {}
                : borderColor
                ? { borderTop: borderColor }
                : {}
            }
          >
            {subChildren}
          </div>
          {/* <div
            className={(
              title ? "modal-body" + " " + "modal-title-exist" : "modal-body") +
              (orientation === "horizontal" ? "test" : "")
            }
          >
            {subChildren}
          </div> */}
        </div>
      )}
    </>
  );
}

export default Modal;
