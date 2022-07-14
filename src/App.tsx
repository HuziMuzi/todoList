import React, {useState} from 'react';
import './App.css';
import TodoList, {TastType} from "./TodoList";
import {v1} from "uuid";


// let tasks: Array<TastType> = [
//     {id: 1, title: 'HTML', isDone: true},
//     {id: 1, title: 'Js', isDone: true},
//     {id: 1, title: 'React', isDone: false}
// ]


// CRUD
export type FilterValuesType = 'all' | 'active' | 'complited'

function App() {
    const title_1: string = "What to learn"

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'Js', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks)
    }
    const addTask = (title: string) => {
        const id = v1()
        const isDone = false
        setTasks([{id, title, isDone}, ...tasks])
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const changeTaskStatus = (taskID:string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone } : t))
    }


    //UI
    let tasksForRender;
    switch (filter) {
        case "complited":
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case 'active' :
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

    return (
        <div className="App">
            <TodoList
                title={title_1}
                tasks={tasksForRender}
                filter={filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
