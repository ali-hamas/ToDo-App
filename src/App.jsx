import editLogo from "./assets/edit.svg";
import deleteLogo from "./assets/delete.svg";
import { useState } from "react";

function App() {
  const [FormText, setFormText] = useState("");

  const handleFormChange = (e) =>{
    setFormText(e.target.value)
  }

  return <>
  <div className="body-div flex h-screen w-full items-center justify-center">
        <div className="flex max-h-[80vh] w-[90%] flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-xl bg-white p-5 py-5 font-bold shadow-md sm:w-[500px] sm:px-8">
          <h1 className="text-2xl text-slate-800">ToDo List</h1>
          <form className="form flex gap-3">
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
                <div
                  className="todo relative flex items-center gap-3  pl-6 pr-16"
                >
                  <input
                    type="checkbox"
                    className="todo-checkbox absolute left-0 top-[5px] cursor-pointer rounded-full checked:bg-indigo-600 checked:hover:bg-indigo-600 focus:ring-0"
                  />
                  <div
                    className="todo-text min-w-full font-normal"
                  >Text shown here
                  </div>
                  <div className="todo-buttons absolute right-0 top-0 ml-auto flex gap-2">
                    <button
                      
                      className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-indigo-500 text-white transition-all duration-200 hover:bg-indigo-700"
                    >
                      <img src={editLogo} className="h-[10px] w-[10px]" />
                    </button>
                    <button
                      className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-red-500 text-white transition-all duration-200 hover:bg-red-600"
                    >
                      <img src={deleteLogo} className="h-[10px] w-[10px]" />
                    </button>
                  </div>
                </div>
          </div>
        </div>
      </div>
  </>;
}

export default App;
