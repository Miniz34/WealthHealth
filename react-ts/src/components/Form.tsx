import "./Form.css";
import states from "../assets/states.json";
import departments from "../assets/departments.json";
import Modal from "./Modal";
import { useReducer, createRef, useState } from "react";
import {
  firstNameValidation,
  lastNameValidation,
  cityValidation,
  dateOfBirthValidation,
  startDateValidation,
  streetValidation,
  zipCodeValidation,
} from "../utils/validation.js";

import Select from "react-select";
import { StylesConfig } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * @member {string} type
 * @member {string?} title
 * @member {string?} message
 */
export interface TypeFormState {
  type: string;
  title?: string;
  message?: string;
}

/**
 * @member {string} type
 * @member {string?} title
 * @member {string?} message
 */
export interface TypeFormAction {
  type: string;
  title?: string;
  message?: string;
}

export type ReactSelectOption = {
  value: string | null;
};

interface State {
  name: string;
  abbreviation: string;
}

interface Department {
  name: string;
}

// interface InputRef {
//   ref: React.RefObject<HTMLInputElement>;
//   regex?: RegExp;
//   value: string;
//   modalMessage: string;
// }

const MODAL_DISPLAY_HIDDEN = "DISPLAY_HIDDEN";
const MODAL_DISPLAY_INFO = "DISPLAY_INFO";
const MODAL_DISPLAY_ERROR = "DISPLAY_ERROR";

function reducer(state: TypeFormState, action: TypeFormAction): TypeFormState {
  switch (action.type) {
    case MODAL_DISPLAY_HIDDEN:
      return {
        type: action.type,
        title: action.title ?? "",
        message: action.message ?? "",
      };
    case MODAL_DISPLAY_INFO:
      return {
        type: action.type,
        title: action.title ?? "",
        message: action.message ?? "",
      };
    case MODAL_DISPLAY_ERROR:
      return {
        type: action.type,
        title: action.title ?? "",
        message: action.message ?? "",
      };
    default:
      return state;
  }
}

function Form() {
  const initialState = {
    type: MODAL_DISPLAY_HIDDEN,
    title: "",
    message: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  // const dateOfBirthRef = createRef<HTMLInputElement>();
  // const startDateRef = createRef<HTMLInputElement>();
  // const departmentRef = createRef<HTMLSelectElement>();
  const streetRef = createRef<HTMLInputElement>();
  const cityRef = createRef<HTMLInputElement>();
  // const passtateRef = createRef<HTMLSelectElement>();
  const zipCodeRef = createRef<HTMLInputElement>();

  // const [dateOfBirthPicker, setDateOfBirthPicker] = useState<Date | null>(null);

  const [dateOfBirthPicker, setDateOfBirthPicker] = useState<Date | null>(null);
  const [startDatePicker, setStartDatePicker] = useState<Date | null>(null);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const [selectedState, setSelectedState] = useState<string | null>(null);

  const formatDate = (date: Date | null): string =>
    date ? date.toLocaleDateString("en-GB") : "";

  const selectStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      color: "#000000", // Change the text color here
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000", // Change the text color here
    }),
    // Add other style configurations if needed
    option: (provided) => ({
      ...provided,
      color: "#000000", // Change the text color of the options
    }),
  };

  function validateForm() {
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    // const dateOfBirth = dateOfBirthRef.current;
    // const startDate = startDateRef.current;
    // const department = departmentRef.current;
    const street = streetRef.current;
    const city = cityRef.current;
    // const passtate = passtateRef.current;
    const zipCode = zipCodeRef.current;

    console.log(formatDate(dateOfBirthPicker));

    if (
      !firstName ||
      !lastName ||
      !dateOfBirthPicker ||
      !startDatePicker ||
      !selectedDepartment ||
      !street ||
      !city ||
      !selectedState ||
      !zipCode
    ) {
      // show error modal
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "all fields are required to submit a user",
      });
      return;
    }

    if (!firstNameValidation.test(firstName.value)) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "First name needs atleast 2 characters",
      });
      return;
    }

    if (!lastNameValidation.test(lastName.value)) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "Last name needs atleast 2 characters",
      });
      return;
    }

    if (!cityValidation.test(city.value)) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "City needs atleast 2 characters",
      });
      return;
    }

    if (!dateOfBirthValidation.test(formatDate(dateOfBirthPicker))) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "First name needs atleast 2 characters",
      });
      return;
    }

    if (!startDateValidation.test(formatDate(startDatePicker))) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "start date needs to be in the dd/mm/yyyy format",
      });
      return;
    }

    if (!streetValidation.test(street.value)) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "street needs atleast 2 characters",
      });
      return;
    }

    if (!zipCodeValidation.test(zipCode.value)) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "zip code needs atleast 5 numbers",
      });
      return;
    }

    if (selectedState === null) {
      dispatch({
        type: MODAL_DISPLAY_ERROR,
        title: "Error",
        message: "Hello",
      });
      return;
    }

    if (
      firstName.value &&
      lastName.value &&
      dateOfBirthPicker !== null &&
      startDatePicker !== null &&
      selectedDepartment !== null &&
      street.value &&
      city.value &&
      selectedState !== null &&
      zipCode.value
    ) {
      dispatch({
        type: MODAL_DISPLAY_INFO,
        title: "Success !",
        message: "Employee created successfully",
      });

      let employees = [];
      const storedEmployees = localStorage.getItem("employees");
      if (storedEmployees) {
        try {
          employees = JSON.parse(storedEmployees);
        } catch (error) {
          dispatch({
            type: MODAL_DISPLAY_ERROR,
            title: "Parsing-error",
            message:
              "Error parsing employees from localStorage " +
              JSON.stringify(error),
          });
          employees = [];
          return;
        }
      }

      const employee = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: formatDate(dateOfBirthPicker),
        startDate: formatDate(startDatePicker),
        department: selectedDepartment,
        street: street.value,
        city: city.value,
        state: selectedState,
        zipCode: zipCode.value,
      };
      employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(employees));

      return;
    }
  }

  const modal_type = new Map<string, string>();
  modal_type.set(MODAL_DISPLAY_HIDDEN, "");
  modal_type.set(MODAL_DISPLAY_ERROR, "error");
  modal_type.set(MODAL_DISPLAY_INFO, "info");

  return (
    <>
      <div className={`main-form${state.type}`}>
        <form>
          <label htmlFor="first-name"> First Name</label>
          <input type="text" name="name" id="first-name" ref={firstNameRef} />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" name="name" id="last-name" ref={lastNameRef} />

          <label htmlFor="date-of-birth"> Date of Birth</label>

          <DatePicker
            selected={dateOfBirthPicker}
            value={formatDate(dateOfBirthPicker)}
            onChange={(date) => {
              setDateOfBirthPicker(date as Date);
            }}
            id="date-of-birth"
            required
            showYearDropdown
            dateFormat="dd/MM/yyyy"
            scrollableYearDropdown
            maxDate={new Date()}
            yearDropdownItemNumber={new Date().getFullYear() - 1900}
          />
          {/* <input
            type="text"
            name="name"
            id="date-of-birth"
            ref={dateOfBirthRef}
          /> */}

          <label htmlFor="start-date"> Start Date</label>

          <DatePicker
            selected={startDatePicker}
            value={formatDate(startDatePicker)}
            onChange={(date) => {
              setStartDatePicker(date as Date);
            }}
            id="start-date"
            required
            showYearDropdown
            dateFormat="dd/MM/yyyy"
            scrollableYearDropdown
            minDate={new Date()}
            // yearDropdownItemNumber={new Date().getFullYear() - 1900}
          />
          {/* <input type="text" name="name" id="start-date" ref={startDateRef} /> */}

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street"> Street</label>
            <input type="text" name="name" id="street" ref={streetRef} />

            <label htmlFor="city"> City</label>
            <input type="text" name="name" id="city" ref={cityRef} />

            <label htmlFor="state"> State</label>
            <Select
              name="state"
              id="state"
              options={states.map((state: State) => ({
                value: state.name,
                label: state.name,
              }))}
              onChange={(selectedOption) => {
                setSelectedState(
                  (selectedOption as ReactSelectOption).value || null
                );
              }}
              value={
                selectedState
                  ? {
                      value: selectedState,
                      label: selectedState,
                    }
                  : null
              }
              styles={selectStyles}
            />
            <label htmlFor="zip-code"> Zip Code</label>
            <input type="text" name="name" id="zip-code" ref={zipCodeRef} />
          </fieldset>

          <label htmlFor="department">Department</label>

          <Select
            name="department"
            id="department"
            options={departments.map((department: Department) => ({
              value: department.name,
              label: department.name,
            }))}
            onChange={(selectedOption) => {
              setSelectedDepartment(
                (selectedOption as ReactSelectOption).value || null
              );
            }}
            value={
              selectedDepartment
                ? {
                    value: selectedDepartment,
                    label: selectedDepartment,
                  }
                : null
            }
            styles={selectStyles}
          />
          {/* <select name="department" id="department" ref={departmentRef}>
            {departments.map((department: Department) => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select> */}
        </form>
        <button type="submit" onClick={validateForm}>
          Save
        </button>
      </div>
      {state.type !== MODAL_DISPLAY_HIDDEN ? (
        <Modal
          mode={modal_type.get(state.type) || ""}
          title={state.title}
          enableFadeIn={true}
          enableFadeOut={true}
          onClose={() => {
            console.log("Demande de cloture de la Modale");
            return true;
          }}
          onClosed={() => {
            console.log("Modal Fermée !");
            dispatch({ type: MODAL_DISPLAY_HIDDEN, message: "Modal closed" });
          }}
        >
          <div>{state.message}</div>
        </Modal>
      ) : null}
      <button
        onClick={() => {
          dispatch({
            type: MODAL_DISPLAY_ERROR,
            title: "titleMessage 1111",
            message: "test1",
          });
        }}
      >
        Toggle 1
      </button>{" "}
      <button
        onClick={() => {
          dispatch({
            type: MODAL_DISPLAY_INFO,
            title: "titleMessage 22222",
            message: "test2",
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
