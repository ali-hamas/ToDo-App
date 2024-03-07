import editLogo from "./assets/edit.svg";
import deleteLogo from "./assets/delete.svg";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [FormText, setFormText] = useState("");
  const [AllTodos, setAllTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setAllTodos(todos);
    }
  }, []);

  const handleFormChange = (e) => {
    setFormText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllTodos([...AllTodos, { id: uuidv4(), FormText, isCompleted: false }]);
    setFormText("");
    saveToLocalStorage();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = AllTodos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...AllTodos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setAllTodos(newTodos);
    saveToLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = AllTodos.filter((item) => item.id === id);
    setFormText(t[0].FormText);
    let newTodos = AllTodos.filter((i) => {
      return i.id !== id;
    });
    setAllTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = AllTodos.filter((item) => {
      return item.id !== id;
    });
    setAllTodos(newTodos);
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(AllTodos));
  };

  return (
    <>
      <div className="body-div flex h-screen w-full items-center justify-center">
        <div className="flex max-h-[80vh] w-[90%] flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-xl bg-white p-5 py-5 font-bold shadow-md sm:w-[500px] sm:px-8">
          <h1 className="text-2xl text-slate-800">ToDo List</h1>
          <form className="form flex gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add your todo"
              value={FormText}
              onChange={handleFormChange}
              className="w-full rounded-md border border-slate-400 bg-transparent font-normal text-slate-800 placeholder:text-slate-400 sm:border-slate-600"
              required
            />
            <button
              type="submit"
              className="hidden sm:block sm:w-24 sm:rounded-md sm:bg-indigo-600 sm:text-white sm:transition-colors sm:hover:bg-indigo-700"
            >
              Add
            </button>
          </form>
          <div className="added-todos flex flex-col gap-3">
            {AllTodos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo relative flex items-center gap-3  pl-6 pr-16"
                >
                  <input
                    type="checkbox"
                    name={item.id}
                    className="todo-checkbox absolute left-0 top-[5px] cursor-pointer rounded-full checked:bg-indigo-600 checked:hover:bg-indigo-600 focus:ring-0"
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                  />
                  <div
                    className={`todo-text min-w-full font-normal ${item.isCompleted ? "text-slate-500 line-through" : "text-slate-800"}`}
                  >
                    {item.FormText}
                  </div>
                  <div className="todo-buttons absolute right-0 top-0 ml-auto flex gap-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-indigo-500 text-white transition-all duration-200 hover:bg-indigo-700"
                    >
                      <img src={editLogo} className="h-[10px] w-[10px]" />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-red-500 text-white transition-all duration-200 hover:bg-red-600"
                    >
                      <img src={deleteLogo} className="h-[10px] w-[10px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
