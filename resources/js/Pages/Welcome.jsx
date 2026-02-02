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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 flex items-center justify-center gap-3">
                        <span className="text-5xl">✓</span>
                        Lista de tareas pendientes
                    </h1>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Statistics */}
                    <TaskStats total={totalTasks} completed={completedTasks} />

                    {/* Input Section */}
                    <div className="flex gap-3 mb-6">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Añadir nueva tarea"
                            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <button
                            onClick={handleAddTask}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
                        >
                            Añadir
                        </button>
                    </div>

                    {/* Task List */}
                    <div className="space-y-2 mb-6">
                        {tasks.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">
                                <p className="text-lg">No hay tareas pendientes</p>
                                <p className="text-sm mt-2">¡Añade tu primera tarea para comenzar!</p>
                            </div>
                        ) : (
                            tasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={handleToggleTask}
                                    onUpdate={handleUpdateTask}
                                />
                            ))
                        )}
                    </div>

                    {/* Clear Completed Button */}
                    {completedTasks > 0 && (
                        <div className="flex justify-center pt-4 border-t border-slate-200">
                            <button
                                onClick={handleClearCompleted}
                                className="px-6 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 active:scale-95 transition-all shadow-sm"
                            >
                                Limpiar lista ({completedTasks} completada{completedTasks !== 1 ? 's' : ''})
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="text-center mt-6 text-slate-500 text-sm">
                    <p>💡 Haz doble clic en una tarea para editarla</p>
                </div>
            </div>
        </div>
    );
}