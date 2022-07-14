import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";


export type TastType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TastType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const tasksListItems = props.tasks.length ?
        props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            return (
                <li >
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey == true) {
            addTask()
        }
    }
    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)

        setTitle(e.currentTarget.value)
    }
    const errorMessageStyle = {color: 'hotpink'}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeInputValue}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={errorMessageStyle}>Title is required</div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                    onClick={() => props.changeFilter('all')}>All</button>
                <button className={props.filter === 'active' ? 'active' : ''}
                    onClick={() => props.changeFilter('active')}>Active</button>
                <button className={props.filter === 'complited' ? 'active' : ''}
                    onClick={() => props.changeFilter('complited')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;