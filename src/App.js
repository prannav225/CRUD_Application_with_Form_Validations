import "./App.css";
import ProfileForm from "./components/Form";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <h1 className="text-xl text-black border cursor-pointer bg-indigo-50 p-2 w-fit m-auto font-semibold rounded-md shadow-lg shadow-indigo-200 underline underline-offset-4 mt-2">
        CRUD Operations and Form Validations
      </h1>
      <ProfileForm />
      <hr />
      <Table />
    </div>
  );
}

export default App;
