const DaysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DepartmentList = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human ressources",
  "Legal",
];
const StateList = [
  "Alabama",
  "Colorado",
  "Illinois",
  "Kansas",
  "Michigan",
  "Ohio",
  "Pennsylvania",
  "Wisconsin",
];

const Randomizer = {
  int: (min: number, max: number): number => {
    return min + Math.floor(Math.random() * (max - min));
  },

  char: (): string => {
    const a = "a".charCodeAt(0);
    const z = "z".charCodeAt(0);
    return String.fromCharCode(Randomizer.int(a, z));
  },

  name: (min: number, max: number): string => {
    const nChars: number = Randomizer.int(min, max);
    let n = "";
    for (let u = 0; u < nChars; u++) n += Randomizer.char();
    return n;
  },

  date: (): string => {
    const m: number = Randomizer.int(1, 13);
    const d: number = Randomizer.int(1, DaysPerMonth[m] + 1);
    const y: number = Randomizer.int(1980, 2024);
    return (
      ("" + d).padStart(2, "0") +
      "/" +
      ("" + m).padStart(2, "0") +
      "/" +
      ("" + y)
    );
  },
  department: (): string => {
    const randomIndex: number = Randomizer.int(0, DepartmentList.length);
    return DepartmentList[randomIndex];
  },
  state: (): string => {
    const randomIndex: number = Randomizer.int(0, StateList.length);
    return StateList[randomIndex];
  },
  zipcode: (): string => {
    let zipcode = "";
    for (let i = 0; i < 5; i++) {
      zipcode += Randomizer.int(0, 10);
    }
    return zipcode;
  },
};

export default Randomizer;
