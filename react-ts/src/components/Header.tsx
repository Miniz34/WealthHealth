import { Link } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  title: string;
  link?: string;
  subtitle?: string;
}

function Header({ title, link, subtitle }: HeaderProps) {
  return (
    <div className="header">
      <h1>{title}</h1>

      {link ? (
        <div>
          <Link to="/employee-list">{link}</Link>
        </div>
      ) : null}

      {subtitle ? <h2>{subtitle}</h2> : null}
    </div>
  );
}

export default Header;
