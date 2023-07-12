import DataTable from "react-data-table-component";
import "./table.css";

import {
  sortString,
  sortDate,
  sortZipCode,
  sortStartDate,
} from "../utils/sortingUtils";

interface ItemSort {
  firstName: string;
  city: string;
  lastName: string;
  department: string;
  street: string;
  state: string;
  startDate: string;
  dateOfBirth: string;
  zipCode: string;
}

function Table() {
  const employeesListJSON = localStorage.getItem("employees");
  const employeesList = employeesListJSON
    ? JSON.parse(employeesListJSON)
    : null;
  console.log(employeesList);

  const columns = [
    {
      name: "First Name",
      selector: (row: ItemSort) => row.firstName,
      sortable: true,
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortString(rowA.firstName, rowB.firstName),
    },
    {
      name: "Last Name",
      selector: (row: ItemSort) => row.lastName,
      sortable: true,
      sortFunction: sortString,
    },
    {
      name: "Start Date",
      selector: (row: ItemSort) => row.startDate,
      sortable: true,
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortDate(rowA.startDate, rowB.startDate),
    },
    {
      name: "Department",
      selector: (row: ItemSort) => row.department,
      sortable: true,
      sortFunction: sortString,
    },
    {
      name: "Date of Birth",
      selector: (row: ItemSort) => row.dateOfBirth,
      sortable: true,
      sortFunction: sortDate,
    },
    {
      name: "Street",
      selector: (row: ItemSort) => row.street,
      sortable: true,
      sortFunction: sortString,
    },
    {
      name: "City",
      selector: (row: ItemSort) => row.city,
      sortable: true,
      sortFunction: sortString,
    },
    {
      name: "State",
      selector: (row: ItemSort) => row.state,
      sortable: true,
      sortFunction: sortString,
    },
    {
      name: "Zip Code",
      selector: (row: ItemSort) => row.zipCode,
      sortable: true,
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortZipCode(rowA.zipCode, rowB.zipCode),
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Employés par page",
    rangeSeparatorText: "sur",
  };

  return (
    <>
      <div className="table">
        <DataTable
          columns={columns}
          data={employeesList}
          pagination
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </>
  );
}

export default Table;
