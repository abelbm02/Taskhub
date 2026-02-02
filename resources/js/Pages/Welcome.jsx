import { useState } from 'react';
import TaskItem from '../Components/TaskItem';
import TaskStats from '../Components/TaskStats';

export default function Welcome() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Añadir nueva tarea
    const handleAddTask = () => {
        if (inputValue.trim().length > 0) {
            const newTask = {
                id: Date.now(),
                title: inputValue.trim(),
                completed: false
            };
            setTasks([...tasks, newTask]);
            setInputValue('');
        }
    };

    // Manejar Enter en el input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    // Marcar/desmarcar tarea como completada
    const handleToggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Actualizar título de tarea
    const handleUpdateTask = (id, newTitle) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };

    // Limpiar tareas completadas
    const handleClearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    // Calcular estadísticas
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    return (
        <div className="min-h-screen bg-[#efe4d5] py-12 px-4 font-sans text-stone-900">
            <div className="max-w-3xl mx-auto">
                {/* Título Principal */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="bg-lime-500 p-3 rounded-2xl shadow-lg shadow-lime-100">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-stone-800">
                        Lista de tareas pendientes
                    </h1>
                </div>

                {/* Estadísticas */}
                <TaskStats total={totalTasks} completed={completedTasks} />

                {/* Card Principal */}
                <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 p-8 md:p-10 mb-8">
                    {/* Input y Botón Añadir */}
                    <div className="relative flex flex-col md:flex-row gap-4 mb-10">
                        <div className="relative flex-1 group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Añadir nueva tarea"
                                className="w-full pl-6 pr-4 py-4 bg-stone-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-lime-500 focus:outline-none transition-all text-lg placeholder:text-stone-400 font-medium"
                            />
                        </div>
                        <button
                            onClick={handleAddTask}
                            className="bg-lime-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-lime-600 hover:shadow-xl hover:shadow-lime-100 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="12 4v16m8-8H4" />
                            </svg>
                            Añadir
                        </button>
                    </div>

                    {/* Lista de Tareas */}
                    <div className="space-y-4 mb-10 min-h-[100px]">
                        {tasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 opacity-30 grayscale">
                                <span className="text-6xl mb-4">🦦</span>
                                <p className="text-xl font-bold text-stone-600">No hay tareas pendientes</p>
                            </div>
                        ) : (
                            <div className="grid gap-3 transition-all duration-500">
                                {tasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggle={handleToggleTask}
                                        onUpdate={handleUpdateTask}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Botón Limpiar */}
                    <div className="flex justify-center border-t border-stone-50 pt-8">
                        <button
                            onClick={handleClearCompleted}
                            className={`group relative px-8 py-3 font-bold rounded-xl transition-all flex items-center gap-3 overflow-hidden ${completedTasks > 0
                                ? 'bg-white border border-stone-200 text-stone-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50'
                                : 'bg-stone-50 border border-transparent text-stone-300 cursor-not-allowed'
                                }`}
                            disabled={completedTasks === 0}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Limpiar lista
                        </button>
                    </div>
                </div>

                {/* Instrucciones */}
                <div className="flex items-center justify-center gap-2 text-stone-400 text-sm font-medium">
                    <span className="p-1 bg-white/50 rounded shadow-sm">💡</span>
                    <p>Pulsa sobre el título de una tarea para editar su contenido</p>
                </div>
            </div>
        </div>
    );
}