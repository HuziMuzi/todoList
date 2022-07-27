import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListsId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListsId: string, taskId: string) => void
    changeFilter: (todoListsId: string, value: FilterValuesType) => void
    addTask: (todoListsId: string, title: string) => void
    changeTaskStatus: (todoListsId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListsId: string) => void
}

export function TodoList(props: PropsType) {

    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListsId)
    }

    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(props.todoListsId, title.trim());
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter(props.todoListsId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListsId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListsId, "completed");

    const addTaskHandler = (title:string) => {
        props.addTask(props.todoListsId,title)
    }

    return <div>
        <h3>{props.title}
        <button onClick={removeTodoListHandler}>x</button>
        </h3>
            <AddItemForm callback={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListsId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListsId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
