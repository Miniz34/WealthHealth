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

interface InputRef {
  ref: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  regex?: RegExp;
  value: string;
  modalMessage: string;
}

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

  const array: Array<InputRef> = [
    {
      ref: createRef<HTMLInputElement>(),
      regex: firstNameValidation,
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLInputElement>(),
      regex: lastNameValidation,
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLInputElement>(),
      regex: dateOfBirthValidation,
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLInputElement>(),
      regex: startDateValidation,
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLSelectElement>(),
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLInputElement>(),
      regex: streetValidation,
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLInputElement>(),
      regex: cityValidation,
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLSelectElement>(),
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
    {
      ref: createRef<HTMLInputElement>(),
      regex: zipCodeValidation,
      value: "",
      modalMessage: "First name needs atleast 2 characters",
    },
  ];
  array.forEach((r) => (r.value = r.ref.current ? r.ref.current.value : ""));

  const firstNameRef = array[0].ref; //createRef<HTMLInputElement>();
  const lastNameRef = array[1].ref; //createRef<HTMLInputElement>();
  const dateOfBirthRef = array[2].ref; //createRef<HTMLInputElement>();
  const startDateRef = array[3].ref; //createRef<HTMLInputElement>();
  const departmentRef = array[4].ref; //createRef<HTMLInputElement>();
  const streetRef = array[5].ref; //createRef<HTMLInputElement>();
  const cityRef = array[6].ref; //createRef<HTMLInputElement>();
  const passtateRef = array[7].ref; //createRef<HTMLInputElement>();
  const zipCodeRef = array[8].ref; //createRef<HTMLInputElement>();

  const firstName = firstNameRef.current;
  const lastName = lastNameRef.current;
  const dateOfBirth = dateOfBirthRef.current;
  const startDate = startDateRef.current;
  const department = departmentRef.current;
  const street = streetRef.current;
  const city = cityRef.current;
  const passtate = passtateRef.current;
  const zipCode = zipCodeRef.current;

  console.log(firstName);

  function test() {
    console.log(array.filter((r) => r.ref.current).length === array.length);
    array.map((arr) => {
      console.log(arr.ref.current);
    });
    console.log(array.length);
  }

  function validateForm() {
    let modalMessage = "";
    let titleMessage = "Error...";

    const invalidField = array.find((c) => {
      console.log(c)
      c.value = c.ref.current ? c.ref.current.value : "";
      return c.regex && !c.regex.test(c.value);
    });

    console.log(invalidField)
  
    if (invalidField) {
      dispatch({
        type: "2",
        errorModal: invalidField.modalMessage,
        titleModal: titleMessage,
      });
      return;
    }else {
          console.log("là");
          dispatch({
            type: "1",
            errorModal: "Passé",
            titleModal: "Succes!",
          });
          const employees =
            JSON.parse(localStorage.getItem("employees") || "") || [];

          const employee = {
            firstName: array[0].value,
            lastName: array[1].value,
            dateOfBirth: array[2].value,
            startDate: array[3].value,
            department: array[4].value,
            street: array[5].value,
            city: array[6].value,
            passtate: array[7].value,
            zipCode: array[8].value,
          };
          employees.push(employee);
          localStorage.setItem("employees", JSON.stringify(employees));

          return;
        }
      }
   
  }

  return (
    <>
      <div className={`main-form${state.open}`}>
        <form>
          <label htmlFor="first-name"> First Name</label>
          <input
            type="text"
            name="name"
            id="first-name"
            ref={firstNameRef as React.Ref<HTMLInputElement>}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            name="name"
            id="last-name"
            ref={lastNameRef as React.Ref<HTMLInputElement>}
          />

          <label htmlFor="date-of-birth"> Date of Birth</label>
          <input
            type="text"
            name="name"
            id="date-of-birth"
            ref={dateOfBirthRef as React.Ref<HTMLInputElement>}
          />

          <label htmlFor="start-date"> Start Date</label>
          <input
            type="text"
            name="name"
            id="start-date"
            ref={startDateRef as React.Ref<HTMLInputElement>}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street"> Street</label>
            <input
              type="text"
              name="name"
              id="street"
              ref={streetRef as React.Ref<HTMLInputElement>}
            />

            <label htmlFor="city"> City</label>
            <input
              type="text"
              name="name"
              id="city"
              ref={cityRef as React.Ref<HTMLInputElement>}
            />

            <label htmlFor="passtate"> State</label>
            <select
              name="passtate"
              id="passtate"
              ref={passtateRef as React.Ref<HTMLSelectElement>}
            >
              {states.map((state: State) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <label htmlFor="zip-code"> Zip Code</label>
            <input
              type="text"
              name="name"
              id="zip-code"
              ref={zipCodeRef as React.Ref<HTMLInputElement>}
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            ref={departmentRef as React.Ref<HTMLSelectElement>}
          >
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
        // open={state.open !== 0}
        open={state.open}
        title={state.titleModal}
        content={state.errorModal}
        dispatch={(el: TypeFormAction) => dispatch(el)}
      >
        <div>hello bonsjours</div>
      </Modal>
      <button
        onClick={() => {
          test();
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
