import { useState, useEffect} from "react"
import "./App.css"

export function App (){
    const [startMessage, setStartMessage] = useState("¡Espacio de tareas vacía!")
    const [taskName, setTaskName] = useState('')
    const [tasks, setTasks] = useState([])

    function addTask(e){
        e.preventDefault(); // evita que el formulario recargue la página
        if(!taskName?.trim()) return // evita agregar tareas vacías o con solo espacios
        setTasks(prev => [...prev, {id: Date.now(), name: taskName, done: false}])
        setTaskName('')
    }

    function deleteTask(id){
        const newArrayTasks = tasks.filter(task => task.id !== id)
        setTasks(newArrayTasks)
    }

    

    useEffect(() => {
        console.log(tasks)
    }, [tasks]
    )

    return (
        <div className="bg-gray-700 min-h-screen flex items-center justify-center py-10 px-4">
            {/**Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-800 w-full max-w-2xl space-y-4">
                <h1 className="text-3xl font-semibold text-center">TO-DO LIST</h1>
                <form className="flex gap-2">
                    <input type="text"
                        placeholder="Add a new Task"
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        className="border flex-1 p-1 rounded"/>
                    <button onClick={addTask}
                        className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer">
                        Add
                    </button>
                </form>
                {tasks.length < 1? <p className="flex justify-center text-2xl text-gray-500">{startMessage}</p>:""}
                {/**Div list */}
                <div className="grid gap-2 lg:grid-cols-2">
                    {tasks.map((task) =>(
                        // Card task
                        <div key={task.id}
                            className="border flex items-center gap-2 p-2 my-2 rounded">
                                <input type="checkbox" />
                                <span className="flex-1 wrap-anywhere">{task.name}</span>
                                <button className="px-2 py-1 rounded bg-red-500 text-white cursor-pointer"
                                    onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}