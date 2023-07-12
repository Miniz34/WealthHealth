import "./App.css";
import Header from "../components/Header";
import Form from "../components/Form";

function App() {
  return (
    <>
      <Header
        title="HRnet"
        link="View Current Employees"
        subtitle="Create Employee"
      />
      <Form />
    </>
  );
}

export default App;
