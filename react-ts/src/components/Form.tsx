import "./Form.css";
import states from "../assets/states.json";
import departments from "../assets/departments.json";
import Modal from "./Modal";
import { useReducer } from "react";

interface State {
  name: string;
  abbreviation: string;
}

interface Department {
  name: string;
}

function reducer(state: number, action: any): number {
  switch (action.type) {
    case "1":
      return (state = 1);
      break;
    case "2":
      return (state = 2);
      break;
    default:
      return state;
  }
}

function Form() {
  const initialState = 0;
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const dateOfBirth = document.getElementById("date-of-birth");
  const startDate = document.getElementById("start-date");
  const department = document.getElementById("department");
  const street = document.getElementById("street");
  const city = document.getElementById("city");
  const passtate = document.getElementById("passtate");
  const zipCode = document.getElementById("zip-code");

  function validateForm() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      startDate: startDate.value,
      department: department.value,
      street: street.value,
      city: city.value,
      passtate: passtate.value,
      zipCode: zipCode.value,
    };
    if (
      firstName.value &&
      lastName.value &&
      dateOfBirth.value &&
      startDate.value &&
      department.value &&
      street.value &&
      city.value &&
      passtate.value &&
      zipCode.value
    ) {
      console.log("valide");
      dispatch({ type: "TOGGLE" });
      employees.push(employee);

      localStorage.setItem("employees", JSON.stringify(employees));
    } else {
      console.log("element manquant");
    }
  }

  return (
    <>
      <div>
        <form>
          <label htmlFor="first-name"> First Name</label>
          <input type="text" name="name" id="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" name="name" id="last-name" />

          <label htmlFor="date-of-birth"> Date of Birth</label>
          <input type="text" name="name" id="date-of-birth" />

          <label htmlFor="start-date"> Start Date</label>
          <input type="text" name="name" id="start-date" />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street"> Street</label>
            <input type="text" name="name" id="street" />

            <label htmlFor="city"> City</label>
            <input type="text" name="name" id="city" />

            <label htmlFor="passtate"> State</label>
            <select name="passtate" id="passtate">
              {states.map((state: State) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <label htmlFor="zip-code"> Zip Code</label>
            <input type="text" name="name" id="zip-code" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            {departments.map((department: Department) => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </form>
        <button type="submit" onClick={validateForm}>
          Save
        </button>
      </div>
      {state !== 0 ? <Modal etat={state} /> : null}
      <button
        onClick={() => {
          dispatch({ type: "1" });
        }}
      >
        Toggle 1
      </button>{" "}
      <button
        onClick={() => {
          dispatch({ type: "2" });
        }}
      >
        Toggle 2
      </button>
    </>
  );
}

export default Form;
