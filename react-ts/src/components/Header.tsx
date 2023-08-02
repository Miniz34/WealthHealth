import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import Employee from "../pages/Employee";
// import { ModalContext } from "modal-kf-react/ModalProvider";
import { ModalContext } from "./Modal/ModalProvider";

interface HeaderProps {
  title: string;
  link?: string;
  subtitle?: string;
}

function Header({ title, link, subtitle }: HeaderProps) {
  const { DisplayModal } = useContext(ModalContext);
  const { open } = useContext(ModalContext);

  const showEmployees = () => {
    DisplayModal({
      mode: "custom",
      children: <Employee />,
      modalPosition: "center",
    });
  };

  return (
    <div className={open ? "header" + " " + "form-hide" : "header"}>
      <h1>{title}</h1>
      {link ? (
        <button>
          <Link to="/employee-list">{link}</Link>
        </button>
      ) : null}
      <br />
      {/* <button onClick={showEmployees}>click</button> */}
      {subtitle ? <h2>{subtitle}</h2> : null}
    </div>
  );
}

export default Header;
