import "./App.css";
import Header from "../components/Header";
import Form from "../components/Form";
import ModalProvider from "../components/Modal/ModalProvider";

function App() {
  return (
    <ModalProvider>
      <div className="main-container">
        <Header
          title="HRnet"
          link="View Current Employees"
          subtitle="Create Employee"
        />
        <Form />
      </div>
    </ModalProvider>
  );
}

export default App;
