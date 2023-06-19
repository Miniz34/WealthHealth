import "./Form.css";
import states from "../assets/states.json";
import departments from "../assets/departments.json";
import Modal, { TypeFormAction, TypeFormState } from "./Modal";
import { useReducer, createRef } from "react";
import {
  firstNameValidation,
  lastNameValidation,
  cityValidation,
  dateOfBirthValidation,
  startDateValidation,
  streetValidation,
  zipCodeValidation,
} from "../utils/validation.js";

interface State {
  name: string;
  abbreviation: string;
}

interface Department {
  name: string;
}

function reducer(state: TypeFormState, action: TypeFormAction): TypeFormState {
  switch (action.type) {
    case "0":
      return {
        level: +action.type,
        errorModal: action.errorModal ?? "",
        titleModal: action.titleModal ?? "",
      };
    case "1":
      return {
        level: +action.type,
        errorModal: action.errorModal ?? "",
        titleModal: action.titleModal ?? "",
      };
    case "2":
      console.log(state);
      return {
        level: +action.type,
        errorModal: action.errorModal ?? "",
        titleModal: action.titleModal ?? "",
      };
    default:
      return state;
  }
}

function Form() {
  const initialState = {
    level: 0,
    errorModal: "",
    titleModal: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  const dateOfBirthRef = createRef<HTMLInputElement>();
  const startDateRef = createRef<HTMLInputElement>();
  const departmentRef = createRef<HTMLSelectElement>();
  const streetRef = createRef<HTMLInputElement>();
  const cityRef = createRef<HTMLInputElement>();
  const passtateRef = createRef<HTMLSelectElement>();
  const zipCodeRef = createRef<HTMLInputElement>();

  function validateForm() {
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    const dateOfBirth = dateOfBirthRef.current;
    const startDate = startDateRef.current;
    const department = departmentRef.current;
    const street = streetRef.current;
    const city = cityRef.current;
    const passtate = passtateRef.current;
    const zipCode = zipCodeRef.current;

    let modalMessage = "";
    let titleMessage = "Error...";

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !startDate ||
      !department ||
      !street ||
      !city ||
      !passtate ||
      !zipCode
    )
      return;

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
      modalMessage = "Employee created successfully";
      titleMessage = "Succes ! ";
      dispatch({
        type: "1",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });

      const employees =
        JSON.parse(localStorage.getItem("employees") || "") || [];

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
      employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(employees));

      return;
    }

    if (!firstNameValidation.test(firstName.value)) {
      modalMessage = "First name needs atleast 2 characters";
      dispatch({
        type: "2",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });
      return;
    }

    if (!lastNameValidation.test(lastName.value)) {
      modalMessage = "last name needs atleast 2 characters";
      dispatch({
        type: "2",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });
      return;
    }

    if (!cityValidation.test(city.value)) {
      modalMessage = "city needs atleast 2 characters";
      dispatch({
        type: "2",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });
      return;
    }

    if (!dateOfBirthValidation.test(dateOfBirth.value)) {
      modalMessage = "date of birth needs to be in the dd/mm/yyyy format";
      dispatch({
        type: "2",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });
      return;
    }

    if (!startDateValidation.test(startDate.value)) {
      modalMessage = "start date needs to be in the dd/mm/yyyy format";
      dispatch({
        type: "2",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });
      return;
    }

    if (!streetValidation.test(street.value)) {
      modalMessage = "street needs atleast 2 characters";
      dispatch({
        type: "2",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });
      return;
    }

    if (!zipCodeValidation.test(zipCode.value)) {
      modalMessage = "zip code needs atleast 5 numbers";
      dispatch({
        type: "2",
        errorModal: modalMessage,
        titleModal: titleMessage,
      });
      return;
    }

    modalMessage = "Contact administrator ... there is a problem";
    dispatch({
      type: "2",
      errorModal: modalMessage,
      titleModal: titleMessage,
    });
  }

  return (
    <>
      <div className={`main-form${state.level}`}>
        <form>
          <label htmlFor="first-name"> First Name</label>
          <input type="text" name="name" id="first-name" ref={firstNameRef} />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" name="name" id="last-name" ref={lastNameRef} />

          <label htmlFor="date-of-birth"> Date of Birth</label>
          <input
            type="text"
            name="name"
            id="date-of-birth"
            ref={dateOfBirthRef}
          />

          <label htmlFor="start-date"> Start Date</label>
          <input type="text" name="name" id="start-date" ref={startDateRef} />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street"> Street</label>
            <input type="text" name="name" id="street" ref={streetRef} />

            <label htmlFor="city"> City</label>
            <input type="text" name="name" id="city" ref={cityRef} />

            <label htmlFor="passtate"> State</label>
            <select name="passtate" id="passtate" ref={passtateRef}>
              {states.map((state: State) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <label htmlFor="zip-code"> Zip Code</label>
            <input type="text" name="name" id="zip-code" ref={zipCodeRef} />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department" ref={departmentRef}>
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
      <Modal
        open={state.level !== 0}
        level={state.level}
        title={state.titleModal}
        content={state.errorModal}
        dispatch={(el: TypeFormAction) => dispatch(el)}
      >
        <div>hello bonsjours</div>
      </Modal>
      <button
        onClick={() => {
          dispatch({
            type: "1",
            errorModal: "test1",
            titleModal: "titleMessage 1111",
          });
        }}
      >
        Toggle 1
      </button>{" "}
      <button
        onClick={() => {
          dispatch({
            type: "2",
            errorModal: "test2",
            titleModal: "titleMessage 22222",
          });
        }}
      >
        Toggle 2
      </button>
    </>
  );
}

export default Form;

// const array = [
//   {
//     ref: createRef<HTMLInputElement>(),
//     regex:firstNameValidation,
//     value:firstNameRef.current ? firstNameRef.current.value : '',
//     modalMessage: "First name needs atleast 2 characters"
//   }
// ]

// if (!array.find(c=> {
//   if (!c.regex.test(c.value)) {
//     dispatch({
//       type: "2",
//       errorModal: c.modalMessage,
//       titleModal: titleMessage,
//     });
//     return c
//   }
// })) {
//   // Show admin error
// }
