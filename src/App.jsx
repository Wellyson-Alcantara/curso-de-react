import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import {v4} from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
    {
      id: 1,
      title: "Estudar programação",
      description: "Estudar programação para se tornar um desenvolvedor full stack.",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar inglês",
      description: "estudar inglês para se tornar fluente.",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar matemática",
      description: "Estudar matemática para se tornar um desenvolvedor full stack.",
      isCompleted: false,
    },
  ])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      // CHAMAR A API
      const response = await fetch(
        'https://jsonplaceholder.cypress.io/todos?_limit=10', 
        {
          method: 'GET',
        }
      );
    
      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();

      // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      setTasks(data);
    };
    fetchTasks();
  }, [])

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted}
      }

      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit (title, description) {
    const newTask = {
      id: v4(),
      title: title,
      descrition: description,
      isCompleted: false,
    }
    setTasks([...tasks, newTask])
  }
;
  return (
    <div className="w-screen bg-slate-500 flex justify-center p-6">
     <div className="w-[500px] space-y-4">
       <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de Tarefas</h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks 
          tasks={tasks} 
          onTaskClick={onTaskClick} 
          onDeleteTaskClick={onDeleteTaskClick}
        />
     </div>
    </div>
  );
}

export default App;