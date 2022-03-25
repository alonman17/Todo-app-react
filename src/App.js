import "./App.css";
import TaskList from "./components/TaskList/TaskList";

import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
