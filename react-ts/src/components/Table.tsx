import DataTable from "react-data-table-component";
import "./table.css";

import { sortString, sortDate, sortZipCode } from "../utils/sortingUtils";

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
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortString(rowA.lastName, rowB.lastName),
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
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortString(rowA.department, rowB.department),
    },
    {
      name: "Date of Birth",
      selector: (row: ItemSort) => row.dateOfBirth,
      sortable: true,
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortDate(rowA.dateOfBirth, rowB.dateOfBirth),
    },
    {
      name: "Street",
      selector: (row: ItemSort) => row.street,
      sortable: true,
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortString(rowA.street, rowB.street),
    },
    {
      name: "City",
      selector: (row: ItemSort) => row.city,
      sortable: true,
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortString(rowA.city, rowB.city),
    },
    {
      name: "State",
      selector: (row: ItemSort) => row.state,
      sortable: true,
      sortFunction: (rowA: ItemSort, rowB: ItemSort) =>
        sortString(rowA.state, rowB.state),
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
        {employeesList ? (
          <DataTable
            columns={columns}
            data={employeesList}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            paginationComponentOptions={paginationComponentOptions}
          />
        ) : (
          <div>No employee found in the database</div>
        )}
      </div>
    </>
  );
}

export default Table;
