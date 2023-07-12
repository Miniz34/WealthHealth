import "./App.css";
import "./Employee.css";
import Header from "../components/Header";
import Table from "../components/Table";
import TableOld from "../components/TableOld";
import { Link } from "react-router-dom";

function Employees() {
  return (
    <>
      <div className="main-table">
        <div>
          <h1 className="employee-title">Current Employees</h1>
        </div>
        <Table />
        <Link to="/">
          <button className="home-button">Home</button>
        </Link>
      </div>
    </>
  );
}

export default Employees;
