import { ReactNode, useState, createContext } from "react";
import Modal from "./Modal";

/**
 * Props interface for the DisplayModal component.
 *
 * @interface DisplayModalProps
 * @member {number} [delay=0] - The delay in milliseconds before the modal is displayed.
 * @member {string} [mode=""] - The mode of the modal, can be one of "info", "error", "warning", or an empty string.
 * @member {string} [title=""] - The title to be displayed in the modal.
 * @member {number} [height=""] - The title to be displayed in the modal.
 * @member {number} [width=""] - The title to be displayed in the modal.
 * @member {string} [color=""] - The title to be displayed in the modal.
 * @member {string} [textColor=""] - The title to be displayed in the modal.
 * @member {string} [modalPosition=""] - The position of the modal on the screen, 5 possible options : "center", "top-left", "top-right", "bottom-left", "bottom-right"
 * @member {string} [backgroundColor=""] - The background color of the modal, specified as a CSS color string (e.g., "#ffffff", "rgba(255, 0, 0, 0.5)", etc.).
 * @member {string} [backgroundColorTitle=""] - The background color of the modal title area, specified as a CSS color string.
 * @member {string} [textColor=""] - The text color of the modal content, specified as a CSS color string.
 * @member {string} [closePosition=""] - The position of the close button within the modal, specified as a CSS string, 4 possible options : "right", "left", "outside-right", "outside-left"
 * @member {string} [borderRadius=""] - The border radius of the modal, specified as a CSS string (e.g., "4px", "50%", etc.).
 * @member {string} [boxShadow=""] - The box shadow of the modal, specified as a CSS string (e.g., "0 2px 4px rgba(0, 0, 0, 0.2)", "inset 0 1px 2px #ccc", etc.).
 * @member {string} [border=""] - The border of the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @member {string} [borderInside=""] - The border inside the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @member {string} [orientation=""] - The orientation of the modal, specified as a CSS string (e.g., "row").
 *
 *
 * @member {ReactNode | null} [children=null] - The content to be rendered inside the modal. It can be React elements or null.
 * @member {string} [className=""] - Additional CSS class name(s) to be applied to the modal container.
 * @member {function | null} [onClosed=null] - A function to be called when the modal has been closed.
 * @member {boolean | null} [onClose=null] - A function to be called when the close button is clicked.
 *                                                   Return `true` to close the modal, `false` to keep it open.
 * @member {boolean} [enableFadeIn=false] - If `true`, the modal will fade in when displayed.
 * @member {boolean} [enableFadeOut=false] - If `true`, the modal will fade out when closed.
 */

export interface DisplayModalProps {
  delay?: number;
  mode?: string; // "info", "error" , "warning", ""
  modalPosition?: string;
  title?: string;
  height?: number | string;
  width?: number | string;
  backgroundColor?: string;
  backgroundColorTitle?: string;
  textColor?: string;
  closePosition?: string; //"modal-close-right", "modal-close-outside-right", "modal-close-left", "modal-close-outside-left"
  borderRadius?: string;
  boxShadow?: string;
  border?: string;
  borderInside?: string;
  orientation?: string;
  children?: ReactNode | null;
  className?: string;
  onClosed?: (() => void) | null;
  onClose?: (() => boolean) | null;
  enableFadeIn?: boolean;
  enableFadeOut?: boolean;
}

/**
 * Props interface for the ModalContext component.
 *
 * @interface ModalContextProps
 * @property {boolean} open - Indicates whether the modal is currently open or closed.
 * @property {number} delay - The delay in milliseconds before the modal is displayed.
 * @property {string} mode - The mode of the modal, can be one of "info", "error", "warning", or an empty string.
 * @property {string} title - The title to be displayed in the modal.
 * @property {ReactNode | null} subChildren - Additional children to be rendered inside the modal.
 *                                             It can be React elements or null.
 * @property {function | null} onClosed - A function to be called when the modal has been closed.
 * @property {boolean | null} onClose - A function to be called when the close button is clicked.
 *                                              Return `true` to close the modal, `false` to keep it open.
 * @property {boolean} enableFadeIn - If `true`, the modal will fade in when displayed.
 * @property {boolean} enableFadeOut - If `true`, the modal will fade out when closed.
 * @property {(props: DisplayModalProps) function} DisplayModal - A function to trigger the display of a modal
 *                                                               with the provided props.
 * @property {function} CloseModal - A function to close the currently open modal.
 * * @property {string} modalPosition - The position of the modal on the screen, 5 possible options : "center", "top-left", "top-right", "bottom-left", "bottom-right"
 * @property {number | string} height - The height of the modal, specified as a number (in pixels) or a CSS string (e.g., "50%", "200px", etc.).
 * @property {number | string} width - The width of the modal, specified as a number (in pixels) or a CSS string (e.g., "50%", "300px", etc.).
 * @property {string} backgroundColor - The background color of the modal, specified as a CSS color string (e.g., "#ffffff", "rgba(255, 0, 0, 0.5)", etc.).
 * @property {string} backgroundColorTitle - The background color of the modal title area, specified as a CSS color string.
 * @property {string} textColor - The text color of the modal content, specified as a CSS color string.
 * @property {string} closePosition - The position of the close button within the modal, specified as a CSS string, 4 possible options : "right", "left", "outside-right", "outside-left"
 * @property {string} borderRadius - The border radius of the modal, specified as a CSS string (e.g., "4px", "50%", etc.).
 * @property {string} boxShadow - The box shadow of the modal, specified as a CSS string (e.g., "0 2px 4px rgba(0, 0, 0, 0.2)", "inset 0 1px 2px #ccc", etc.).
 * @property {string} border - The border of the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @property {string} borderInside - The border inside the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @property {string} orientation - The orientation of the modal, specified as a CSS string (e.g., "row").
 */
interface ModalContextProps {
  open: boolean;
  delay: number;
  mode: string; // "info", "error" , "warning", ""
  modalPosition: string;
  title: string;
  height: number | string;
  width: number | string;
  backgroundColor: string;
  backgroundColorTitle: string;
  textColor: string;
  closePosition: string;
  borderRadius: string;
  boxShadow: string;
  border: string;
  borderInside: string;
  orientation: string;
  subChildren: ReactNode | null;
  onClosed: (() => void) | null;
  onClose: (() => boolean) | null;
  enableFadeIn: boolean;
  enableFadeOut: boolean;
  DisplayModal: (props: DisplayModalProps) => void;
  CloseModal: () => void;
}

const initialState: ModalContextProps = {
  open: false,
  delay: -1,
  mode: "",
  modalPosition: "",
  title: "",
  height: 250,
  width: 250,
  backgroundColor: "",
  backgroundColorTitle: "",
  closePosition: "",
  textColor: "",
  borderRadius: "",
  boxShadow: "",
  border: "",
  borderInside: "",
  orientation: "",
  subChildren: null,
  enableFadeIn: true,
  enableFadeOut: true,
  onClose: null,
  onClosed: null,
  DisplayModal: () => {
    return;
  },
  CloseModal: () => {
    return;
  },
};
export const ModalContext = createContext<ModalContextProps>(initialState);

interface ModalProviderProps {
  children?: ReactNode | null | undefined;
}
const ModalProvider = ({ children }: ModalProviderProps) => {
  const onCloseListener = () => {
    return true;
  };

  const onClosedListener = () => {
    return;
  };

  const displayModal = (props: DisplayModalProps) => {
    setState({
      ...state,
      open: true,
      delay: typeof props.delay !== "undefined" ? props.delay : state.delay,
      mode: typeof props.mode !== "undefined" ? props.mode : state.mode,
      modalPosition:
        typeof props.modalPosition !== "undefined"
          ? props.modalPosition
          : state.modalPosition,

      title: typeof props.title !== "undefined" ? props.title : state.title,
      height: typeof props.height !== "undefined" ? props.height : state.height,
      width: typeof props.width !== "undefined" ? props.width : state.width,
      backgroundColor:
        typeof props.backgroundColor !== "undefined"
          ? props.backgroundColor
          : state.backgroundColor,
      backgroundColorTitle:
        typeof props.backgroundColorTitle !== "undefined"
          ? props.backgroundColorTitle
          : state.backgroundColorTitle,
      closePosition:
        typeof props.closePosition !== "undefined"
          ? props.closePosition
          : state.closePosition,

      textColor:
        typeof props.textColor !== "undefined"
          ? props.textColor
          : state.textColor,
      borderRadius:
        typeof props.borderRadius !== "undefined"
          ? props.borderRadius
          : state.borderRadius,

      boxShadow:
        typeof props.boxShadow !== "undefined"
          ? props.boxShadow
          : state.boxShadow,
      border: typeof props.border !== "undefined" ? props.border : state.border,
      borderInside:
        typeof props.borderInside !== "undefined"
          ? props.borderInside
          : state.borderInside,

      orientation:
        typeof props.orientation !== "undefined"
          ? props.orientation
          : state.orientation,

      subChildren:
        typeof props.children !== "undefined"
          ? props.children
          : state.subChildren,
      enableFadeIn:
        typeof props.enableFadeIn !== "undefined"
          ? props.enableFadeIn
          : state.enableFadeIn,
      enableFadeOut:
        typeof props.enableFadeOut !== "undefined"
          ? props.enableFadeOut
          : state.enableFadeOut,
      onClose:
        typeof props.onClose !== "undefined" ? props.onClose : state.onClose,
      onClosed:
        typeof props.onClosed !== "undefined" ? props.onClosed : state.onClosed,
    });
  };

  const closeModal = () => {
    setState({ ...state, open: false });
  };

  const [state, setState] = useState<ModalContextProps>({
    open: false,
    delay: -1,
    mode: "info",
    modalPosition: "",
    title: "",
    height: "auto",
    width: "auto",
    backgroundColor: "",
    backgroundColorTitle: "",
    closePosition: "",
    textColor: "",
    borderRadius: "",
    boxShadow: "",
    border: "",
    borderInside: "",
    orientation: "",
    subChildren: <span>Employee Created!</span>,
    enableFadeIn: true,
    enableFadeOut: true,
    onClose: onCloseListener,
    onClosed: onClosedListener,
    DisplayModal: displayModal,
    CloseModal: closeModal,
  });

  return (
    <ModalContext.Provider value={state}>
      {children ?? null}
      <Modal />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
