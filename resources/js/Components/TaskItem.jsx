import { useState } from 'react';

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const handleStartEditing = () => {
        setIsEditing(true);
        setEditValue(task.title);
    };

    const handleBlur = () => {
        const trimmedValue = editValue.trim();
        if (trimmedValue.length > 0 && trimmedValue !== task.title) {
            onUpdate(trimmedValue);
        } else {
            setEditValue(task.title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            setEditValue(task.title);
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-100 hover:border-lime-200 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => onToggle(task.id, task.is_completed)}
                    className="w-6 h-6 rounded-lg border-stone-300 text-lime-500 focus:ring-lime-500 focus:ring-offset-0 cursor-pointer transition-colors"
                />
            </div>

            <div className="flex-1 overflow-hidden">
                {isEditing ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="w-full px-0 py-0 text-lg border-b border-lime-500 bg-transparent focus:ring-0 focus:outline-none text-stone-900 font-medium"
                    />
                ) : (
                    <span
                        onClick={handleStartEditing}
                        className={`block w-full text-lg cursor-pointer select-none transition-all truncate font-medium ${task.is_completed
                            ? 'line-through text-stone-300 opacity-60'
                            : 'text-stone-700 hover:text-lime-600'
                            }`}
                    >
                        {task.title}
                    </span>
                )}
            </div>

            {/* Botón Eliminar Individual (Opcional pero recomendado para CRUD) */}
            <button
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Eliminar tarea"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
}
