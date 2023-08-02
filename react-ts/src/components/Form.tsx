import "./Form.css";
import states from "../assets/states.json";
import departments from "../assets/departments.json";
import { createRef, useState, useContext } from "react";
import {
  firstNameValidation,
  lastNameValidation,
  cityValidation,
  dateOfBirthValidation,
  startDateValidation,
  streetValidation,
  zipCodeValidation,
} from "../utils/validation.js";
import { ModalContext } from "./Modal/ModalProvider";
import Randomizer from "../utils/random.js";
import Select from "react-select";
import { StylesConfig } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DisplayModalProps } from "./Modal/ModalProvider";

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

function Form() {
  const { DisplayModal } = useContext(ModalContext);
  const { open } = useContext(ModalContext);

  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  const streetRef = createRef<HTMLInputElement>();
  const cityRef = createRef<HTMLInputElement>();
  const zipCodeRef = createRef<HTMLInputElement>();
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

  function addRandomEmployee() {
    let employees: any[] = [];
    try {
      const storedEmployees = localStorage.getItem("employees");
      if (storedEmployees) {
        employees = JSON.parse(storedEmployees);
      }
      const employee = {
        firstName: Randomizer.name(1, 5),
        lastName: Randomizer.name(1, 5),
        dateOfBirth: Randomizer.date(),
        startDate: Randomizer.date(),
        department: Randomizer.department(),
        street: Randomizer.name(1, 5),
        city: Randomizer.name(1, 5),
        state: Randomizer.state(),
        zipCode: Randomizer.zipcode(),
      };
      employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(employees));
      DisplayModal({
        mode: "info",
        title: "Succes!",
        children: "Employee created !",
        enableFadeIn: false,
        enableFadeOut: false,
      });
    } catch (error) {
      DisplayModal({
        mode: "error",
        title: "Parsing-error",
        children:
          "Error parsing employees from localStorage " + JSON.stringify(error),
      });
    }
  }

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
      DisplayModal({
        mode: "error",
        title: "error",
        children: "Please fill the entire form",
      } as DisplayModalProps);
      return;
    }

    if (!firstNameValidation.test(firstName.value)) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "First name needs atleast 2 characters",
      });
      return;
    }

    if (!lastNameValidation.test(lastName.value)) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "Last name needs atleast 2 characters",
      });
      return;
    }

    if (!cityValidation.test(city.value)) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "City needs atleast 2 characters",
      });
      return;
    }

    if (!dateOfBirthValidation.test(formatDate(dateOfBirthPicker))) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "First name needs atleast 2 characters",
      });
      return;
    }

    if (!startDateValidation.test(formatDate(startDatePicker))) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "start date needs to be in the dd/mm/yyyy format",
      });
      return;
    }

    if (!streetValidation.test(street.value)) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "street needs atleast 2 characters",
      });
      return;
    }

    if (!zipCodeValidation.test(zipCode.value)) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "zip code needs atleast 5 numbers",
      });
      return;
    }

    if (selectedState === null) {
      DisplayModal({
        mode: "error",
        title: "Error",
        children: "Please select a state",
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
      DisplayModal({
        mode: "default",
        children: "Employee created successfully",
      });

      let employees: any[] = [];
      const storedEmployees = localStorage.getItem("employees");
      if (storedEmployees) {
        try {
          employees = JSON.parse(storedEmployees);
        } catch (error) {
          DisplayModal({
            mode: "error",
            title: "Parsing-error",
            children: (
              <div>
                <p>"Error parsing employees from localStorage "</p>
                <p>{JSON.stringify(error)}</p>
              </div>
            ),
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

  return (
    <>
      <div className={open ? "form-hide" : ""}>
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
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street"> Street</label>
            <input type="text" name="name" id="street" ref={streetRef} />

            <label htmlFor="city"> City</label>
            <input type="text" name="name" id="city" ref={cityRef} />

            <label htmlFor="state"> State</label>
            <Select
              name="state"
              inputId="state"
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
            inputId="department"
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
        </form>
        <button type="submit" onClick={validateForm} className="submit-button">
          Save
        </button>
      </div>
      <button onClick={addRandomEmployee}>Add random employee (dev)</button>
    </>
  );
}

export default Form;
