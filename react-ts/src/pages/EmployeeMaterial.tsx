import "./App.css";
import "./Employee.css";
import Header from "../components/Header";
import { MaterialReactTable } from "material-react-table"; // v1.12.0 and above (recommended)
import { NavLink } from "react-router-dom";
import { useState, useMemo } from "react";

import {
  sortFirstName,
  sortLastName,
  sortCity,
  sortDateOfBirth,
  sortDepartment,
  sortStartDate,
  sortState,
  sortStreet,
  sortZipCode,
} from "../utils/sortingUtils";

function Employee() {
  const employeesListJSON = localStorage.getItem("employees");
  const employeesList = employeesListJSON
    ? JSON.parse(employeesListJSON)
    : null;
  console.log(employeesList);

  const columns = useMemo(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
        sortFunction: sortFirstName,
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
        sortable: true,
        sortFunction: sortLastName,
      },
      {
        header: "Start Date",
        accessorKey: "startDate",
        sortable: true,
        sortFunction: sortStartDate,
      },
      {
        header: "Department",
        accessorKey: "department",
        sortable: true,
        sortFunction: sortDepartment,
      },
      {
        header: "Date of Birth",
        accessorKey: "dateOfBirth",
        accessor: (row) => new Date(row.startDate),
        sortingfn: "datetime",
        sortable: true,
        Cell: ({ cell: { value } }) => value.toLocaleDateString(),
      },
      {
        header: "Street",
        accessorKey: "street",
        sortable: true,
        sortFunction: sortStreet,
      },
      {
        header: "City",
        accessorKey: "city",
        sortable: true,
        sortFunction: sortCity,
      },
      {
        header: "State",
        accessorKey: "state",
        sortable: true,
        sortFunction: sortState,
      },
      {
        header: "Zip Code",
        accessorKey: "zipCode",
        sortable: true,
        sortFunction: sortZipCode,
      },
    ],
    []
  );

  return (
    <>
      <Header title="Current Employees" />
      <MaterialReactTable
        columns={columns}
        data={employeesList}
        defaultColumn={{
          minSize: 20, //allow columns to get smaller than default
          maxSize: 9001, //allow columns to get larger than default
          size: 100, //make columns wider by default
        }}
        enableFilters={false} // Disable the filter
        enableHiding={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableColumnActions={false}
      />
      ;
    </>
  );
}

export default Employee;
