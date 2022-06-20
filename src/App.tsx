import React from 'react';
import './App.css';
import TodoList, {TastType} from "./TodoList";

// CRUD

function App() {
    const title_1:string = "What to learn"
    const title_2:string = "What to buy"

    const tasks_1: Array<TastType> = [
        {id:1, title: 'HTML', isDone: true },
        {id:1, title: 'Js', isDone: true },
        {id:1, title: 'React', isDone: false }
    ]

    const tasks_2: Array<TastType> = [
        {id: 1, title: "Honda", isDone: true},
        {id: 2, title: "Yamaha", isDone: true},
        {id: 3, title: "BMW", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={title_1} tasks={tasks_1} />
            <TodoList title={title_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
