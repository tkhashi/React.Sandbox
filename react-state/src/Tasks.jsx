import { useReducer } from 'react';
import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  
  function handleAddTask(text) {
    dispatch({
        // typeは何でもいい　added_taskなどでもOK 何が起こったかを説明するもの
        type: 'added',
        id: nextId++,
        text: text 
    });
  }

  function handleChangeTask(task) {
    dispatch({
        type: 'changed',
        task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
        type: 'deleted',
        id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

const taskReducer = (tasks, action) => {
  switch (action.type) {
    case 'added':{
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        }
      ]
    }
    case 'changed': {
      return tasks.map((t) => {
        if(t.id === action.task.id) {
          return action.task;
        }
        else{
          return t;
        }
      })
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default:
      throw Error('Unkonwn action: ' + action.type);
  }
}
