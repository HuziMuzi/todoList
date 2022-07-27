import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to bye', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ],
    })
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    console.log(tasks)

    function removeTodoList(todoListsId: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListsId))
        delete tasks[todoListsId]
        console.log(tasks)
    }

    function removeTask(todoListsId: string, taskId: string) {
        setTasks({...tasks, [todoListsId]: tasks[todoListsId].filter(el => el.id !== taskId)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todoListsId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListsId]: [newTask, ...tasks[todoListsId]]})
        // console.log({...tasks,[todoListsId]:tasks[todoListsId]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    const addTodolist = (title: string) => {
        const newTodoListID = v1()
        const newTodoList:TodoListsType = {id: newTodoListID, title:title, filter:'all'}
        setTodoLists([newTodoList,...todoLists])
        setTasks({...tasks,[newTodoListID]:[]})
    }

    function changeStatus(todoListsId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todoListsId]: tasks[todoListsId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        })
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks]);
    }

    // let tasksForTodolist = tasks;
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }
    function changeFilter(todoListsId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListsId ? {...el, filter: value} : el))
        // setFilter(value);
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>

            {todoLists.map(el => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <TodoList
                        key={el.id}
                        todoListsId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
