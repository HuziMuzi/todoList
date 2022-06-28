import React, {useState} from 'react';
import './App.css';
import TodoList, {TastType} from "./TodoList";
import {log} from "util";

// CRUD
export type FilterValuesType = 'all' | 'active' | 'complited'

function App() {
    const title_1: string = "What to learn"

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'Js', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])
    const removeTask = (taskID: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskID)
        setTasks(updatedTasks)
        console.log(tasks)
    }
    const [filter, setFilter] = useState<FilterValuesType>('all')
    // let tasks: Array<TastType> = [
    //     {id: 1, title: 'HTML', isDone: true},
    //     {id: 1, title: 'Js', isDone: true},
    //     {id: 1, title: 'React', isDone: false}
    // ]


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

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    return (
        <div className="App">
            <TodoList
                title={title_1}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
