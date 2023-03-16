import { FormEventHandler, useEffect, useState } from "react";
import type { NextPage } from "next";
// Components
import Alert from "../components/alert";
import Button from "../components/button";
import Card from "../components/cards";
// Icons
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
// Types
import { Todo } from "../types/todo";

const Home: NextPage = () => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addTodoInput, setAddTodoInput] = useState<string>("");
  const [todoToEdit, setTodoToEdit] = useState<Todo>();

  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch("/api/todos");
    const body = await res.json();
    setTodos(body);
    setLoading(false);
  };

  const addTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      id: crypto.randomUUID(),
      todo: addTodoInput,
      is_completed: false,
    } as Todo;
    const res = await fetch("/api/todos", {
      method: "POST",
      // @ts-ignore
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setAddTodoInput("");
    setAlert({
      message: data.message,
      type: "success",
    });
    await fetchTodos();
    setLoading(false);
  };

  const updateTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/todos/${todoToEdit?.id}`, {
      method: "PUT",
      // @ts-ignore
      body: JSON.stringify(todoToEdit),
    });
    const data = await res.json();
    setAlert({
      message: data.message,
      type: "success",
    });
    setTodoToEdit(undefined);
    await fetchTodos();
    setLoading(false);
  };

  const deleteTodo = async (todo: Todo) => {
    setLoading(true);
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setAlert({
      message: data.message,
      type: "success",
    });
    await fetchTodos();
    setLoading(false);
  };

  const toggleTodo = async (todo: Todo) => {
    const res = await fetch(`/api/todos/${todo.id}/toggle`, {
      method: "PUT",
    });
    const data = await res.json();
    setAlert({
      message: data.message,
      type: "success",
    });
    await fetchTodos();
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="h-screen w-screen bg-purple-600">
      {/* Edit Todo Popup */}
      {todoToEdit ? (
        <div className="w-screen h-screen fixed top-0 left-0">
          <div className="absolute top-0 left-0 h-full w-full bg-black opacity-60"></div>
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-1/2 max-w-xl">
            <Card>
              <div className="relative">
                <button
                  className="w-8 h-8 rounded-full p-1.5 shadow-lg absolute -right-9 border -top-9 bg-white transition-all hover:bg-gray-200"
                  onClick={() => setTodoToEdit(undefined)}
                >
                  <XMarkIcon />
                </button>
                <h1 className="text-2xl font-bold">Edit Todo</h1>
                <form className="space-y-4 mt-5" onSubmit={updateTodo}>
                  <input
                    type="text"
                    value={todoToEdit.todo}
                    onChange={(e) =>
                      // @ts-ignore
                      setTodoToEdit((prev) => ({
                        ...prev,
                        todo: e.target.value,
                      }))
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  />
                  <Button
                    disabled={!todoToEdit.todo.length || loading}
                    type="submit"
                  >
                    Update Todo
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      {/* Alert Toast */}
      <Alert
        visible={!!alert?.type}
        type={alert?.type}
        onDismiss={() => setAlert(undefined)}
      >
        {alert?.message}
      </Alert>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl p-4 flex flex-col gap-5 h-full overflow-hidden">
        <Card>
          <h2 className="text-4xl font-bold">Todo List</h2>
          <form className="mt-5" onSubmit={addTodo}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Add something you want to do
              </label>
              <input
                type="text"
                value={addTodoInput}
                onChange={(e) => setAddTodoInput(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
              />
            </div>
            <Button disabled={!addTodoInput || loading} type="submit">
              Add Todo
            </Button>
          </form>
        </Card>
        <ul className="flex-1 space-y-3 overflow-y-scroll overflow-x-hidden">
          {todos.length ? (
            todos.map((todo) => (
              <li key={todo.id} className="group">
                <Card>
                  <div className="flex items-center gap-3">
                    <div className="flex -translate-x-20 group-hover:translate-x-0 transition-all">
                      {todo.is_completed ? (
                        <button
                          className="h-8 w-8 rounded-full p-2 text-white bg-orange-700 hover:bg-orange-900 focus:ring-4 focus:ring-orange-200"
                          onClick={() => toggleTodo(todo)}
                        >
                          <XMarkIcon />{" "}
                        </button>
                      ) : (
                        <button
                          className="h-8 w-8 rounded-full p-2 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:ring-green-200"
                          onClick={() => toggleTodo(todo)}
                        >
                          <CheckIcon />
                        </button>
                      )}
                    </div>
                    <p
                      className={`flex-1 ${
                        todo.is_completed ? "line-through" : ""
                      }`}
                    >
                      {todo.todo}
                    </p>
                    <div className="flex translate-x-44 gap-1 group-hover:translate-x-2 transition-all">
                      <button
                        className="h-8 w-8 rounded-full p-2 text-purple-300 hover:bg-purple-600 hover:text-white focus:ring-4 focus:ring-purple-200"
                        onClick={() => setTodoToEdit(todo)}
                      >
                        <PencilIcon />
                      </button>
                      <button
                        className="h-8 w-8 rounded-full p-2 text-red-300 hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-200"
                        onClick={() => deleteTodo(todo)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </Card>
              </li>
            ))
          ) : (
            <Card>
              <h1>You have no todos added to the list</h1>
            </Card>
          )}
        </ul>
      </div>
    </main>
  );
};

export default Home;
