import "./table.css";
import { DataTable, SortDirection } from "react-ab-data-table";

import { sortString, sortDate, sortZipCode } from "../utils/sortingUtils";

function TableOld() {
  const employeesListJSON = localStorage.getItem("employees");
  const employeesList = employeesListJSON
    ? JSON.parse(employeesListJSON)
    : null;

  const columns = [
    {
      name: "First Name",
      id: "firstName",
      sortable: true,
    },
    {
      name: "Last Name",
      id: "lastName",
      sortable: true,
    },
    {
      name: "Start Date",
      id: "startDate",
      sortable: true,
    },
    {
      name: "Department",
      id: "department",
      sortable: true,
    },
    {
      name: "Date of Birth",
      id: "dateOfBirth",
      sortable: true,
    },
    { name: "Street", id: "street", sortable: true },
    { name: "City", id: "city", sortable: true },
    { name: "State", id: "passtate", sortable: true },
    {
      name: "Zip Code",
      id: "zipCode",
      sortable: true,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={employeesList} tableId="employee" />
    </>
  );
}

export default TableOld;
