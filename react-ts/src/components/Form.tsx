import "./Form.css";
import states from "../assets/states.json";
import departments from "../assets/departments.json";
import Modal from "./Modal";
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

/**
 * @member {number} open
 * @member {string?} errorModal
 * @member {string} titleModal
 */
export interface TypeFormState {
  open: number;
  errorModal?: string;
  titleModal?: string;
}

/**
 * @member {string} type
 * @member {string?} errorModal
 * @member {string} titleModal
 */
export interface TypeFormAction {
  type: string;
  errorModal?: string;
  titleModal?: string;
}

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

function reducer(state: TypeFormState, action: TypeFormAction): TypeFormState {
  switch (action.type) {
    case "0":
      return {
        open: +action.type,
        errorModal: action.errorModal ?? "",
        titleModal: action.titleModal ?? "",
      };
    case "1":
      return {
        open: +action.type,
        errorModal: action.errorModal ?? "",
        titleModal: action.titleModal ?? "",
      };
    case "2":
      console.log(state);
      return {
        open: +action.type,
        errorModal: action.errorModal ?? "",
        titleModal: action.titleModal ?? "",
      };
    default:
      return state;
  }
}

function Form() {
  const initialState = {
    open: 0,
    errorModal: "",
    titleModal: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  // const array: Array<InputRef> = [
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     regex: firstNameValidation,
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     regex: lastNameValidation,
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     regex: dateOfBirthValidation,
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     regex: startDateValidation,
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     regex: streetValidation,
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     regex: cityValidation,
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  //   {
  //     ref: createRef<HTMLInputElement>(),
  //     regex: zipCodeValidation,
  //     value: "",
  //     modalMessage: "First name needs atleast 2 characters",
  //   },
  // ];
  // array.forEach((r) => (r.value = r.ref.current ? r.ref.current.value : ""));

  // const firstNameRef = array[0].ref; //createRef<HTMLInputElement>();
  // const lastNameRef = array[1].ref; //createRef<HTMLInputElement>();
  // const dateOfBirthRef = array[2].ref; //createRef<HTMLInputElement>();
  // const startDateRef = array[3].ref; //createRef<HTMLInputElement>();
  // const departmentRef = array[4].ref; //createRef<HTMLInputElement>();
  // const streetRef = array[5].ref; //createRef<HTMLInputElement>();
  // const cityRef = array[6].ref; //createRef<HTMLInputElement>();
  // const passtateRef = array[7].ref; //createRef<HTMLInputElement>();
  // const zipCodeRef = array[8].ref; //createRef<HTMLInputElement>();

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

      let employees = [];
      const storedEmployees = localStorage.getItem("employees");
      if (storedEmployees) {
        try {
          employees = JSON.parse(storedEmployees);
        } catch (error) {
          console.error("Error parsing employees from localStorage:", error);
          employees = [];
        }
      }
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

    const showMessage = (
      type: string,
      errorModal: string,
      titleModal: string
    ) => {
      dispatch({ type, errorModal, titleModal });
    };

    if (!firstNameValidation.test(firstName.value)) {
      modalMessage = "First name needs atleast 2 characters";
      showMessage("2", modalMessage, titleMessage);
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
      <div className={`main-form${state.open}`}>
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
      {state.open > 0 ? (
        <Modal
          mode={["info", "warning", "error"][state.open]}
          title={state.titleModal}
          enableFadeIn={true}
          enableFadeOut={true}
          onClose={() => {
            console.log("Demande de cloture de la Modale");
            return true;
          }}
          onClosed={() => {
            console.log("Modal Fermée !");
            dispatch({ type: "0", errorModal: "Modal closed" });
          }}
        >
          <div>{state.errorModal}</div>
        </Modal>
      ) : null}
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
