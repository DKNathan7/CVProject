import { useState, useEffect} from "react"
import "./App.css"

export function App (){
    const [filters, setFilters] = useState([{id: Date.now(), nameFilter: 'All', counter: 0, isFiltering: true}, 
        {id: Date.now(), nameFilter:'Active', counter: 0, isFiltering: false}, 
        {id: Date.now(), nameFilter:'Completed', counter: 0, isFiltering: false}])
    const [taskName, setTaskName] = useState('')
    const [tasks, setTasks] = useState([])

    function handleAddTask(e){
        e.preventDefault(); // evita que el formulario recargue la página
        if(!taskName?.trim()) return // evita agregar tareas vacías o con solo espacios
        setTasks(prev => [...prev, {id: Date.now(), name: taskName, done: false, isEditing: false, tempText: ''}])
        setTaskName('')
    }

    function deleteTask(id){
        const newArrayTasks = tasks.filter(task => task.id !== id)
        setTasks(newArrayTasks)
    }

    function completeTask(id){
        const newArrayTasks = tasks.map(task => {
            if (task.id == id) {
                return{...task,  done: !task.done}
            }
            return task
        })
        setTasks(newArrayTasks)
    }

    function editTask(id){
        const newArrayTasks = tasks.map((task) => {
            if(task.id === id){
                return {...task, isEditing: !task.isEditing, tempText: task.name}
            }
            return task
        })
        setTasks(newArrayTasks)
    }

    function handlerEditingTask(id, newText){
        const newArrayTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, tempText: newText}
            }
            return task
        })
        setTasks(newArrayTasks)
    }

    function updateTask(id){
        const newArrayTasks = tasks.map((task) =>{
            if (task.id === id) {
                return {...task, name: task.tempText, isEditing: !task.isEditing, tempText: ''}
            }
            return task
        })
        setTasks(newArrayTasks)
    }

    function cancelTask(id){
        const newArrayTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, isEditing: !task.isEditing, tempText: ''}
            }
            return task
        })
        setTasks(newArrayTasks)
    }

    function switchFilter(id){
        
    }

    useEffect(() => {
        console.log(tasks, filters)
    }, [tasks])

    return (
        <div className="bg-gray-700 min-h-screen flex items-center justify-center py-10 px-4">
            {/**Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-800 w-full max-w-2xl space-y-4">
                <h1 className="text-4xl font-semibold text-center">TO-DO LIST</h1>
                <form className="flex gap-2">
                    <input type="text"
                        placeholder="Add a new Task"
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        className="border flex-1 px-2 py-3 rounded text-xl"/>
                    <button onClick={handleAddTask}
                        className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer">
                        Add
                    </button>
                </form>
                {/**---Filtros--- */}
                <nav className="flex justify-center gap-3 sm:gap-10">
                    {filters.map((filter,i) => 
                        // Interpolación de cadenas => {`${}`}
                        <div className={`rounded flex flex-col items-center px-6 py-1 cursor-pointer ${filter.isFiltering ? "text-white bg-gray-700" : "text-black bg-gray-100"}`}
                            key={i} onClick={() => switchFilter(filter.id)}>
                                <span className="text-sm">{filter.nameFilter}</span>
                                <span>{filter.counter}</span>
                        </div>
                        
                    )}
                    
                </nav>
                {tasks.length < 1? <p className="flex justify-center text-2xl text-gray-500">¡Espacio de tareas vacía!</p>:""}
                {/**Div list*/}
                <div className="grid gap-2 lg:grid-cols-2">
                    {tasks.map((task) =>(
                        // ---Card task---
                        <div key={task.id}
                            className="border flex items-center gap-2 p-2 my-1 rounded">
                                {task.isEditing?
                                <>
                                    <input type="checkbox" 
                                        onChange={() => completeTask(task.id)}/>
                                    <input type="text"
                                        value={task.tempText ?? ''} // => Si no es nulo ni undefined se queda con el valor de la izquierda de lo contrario: ''
                                        onChange={(e) => handlerEditingTask(task.id, e.target.value)}/>
                                    <button className="px-2 py-1 rounded bg-green-500 text-white cursor-pointer"
                                            onClick={() => updateTask(task.id)}>
                                        Save
                                    </button>
                                    <button className="px-2 py-1 rounded bg-red-500 text-white cursor-pointer"
                                            onClick={() => cancelTask(task.id)}>
                                        Cancel
                                    </button>
                                </>
                                :
                                <>
                                    <input type="checkbox" 
                                        onChange={() => completeTask(task.id)}/>
                                    <span className={`flex-1 wrap-anywhere ${task.done? "line-through text-gray-500": "text-black" }`}>
                                        {task.name}
                                    </span>
                                    <button className="px-2 py-1 rounded bg-amber-500 text-white cursor-pointer"
                                            onClick={() => editTask(task.id)}>
                                        Edit
                                    </button>
                                    <button className="px-2 py-1 rounded bg-red-500 text-white cursor-pointer"
                                            onClick={() => deleteTask(task.id)}>
                                        Delete
                                    </button>
                                </>
                                }
                                
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}