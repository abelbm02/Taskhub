import { useState } from 'react';

export default function TaskItem({ task, onToggle, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const handleStartEditing = () => {
        setIsEditing(true);
        setEditValue(task.title);
    };

    const handleBlur = () => {
        const trimmedValue = editValue.trim();
        if (trimmedValue.length > 0) {
            onUpdate(task.id, trimmedValue);
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
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
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
                        className={`block w-full text-lg cursor-pointer select-none transition-all truncate font-medium ${task.completed
                            ? 'line-through text-stone-300 opacity-60'
                            : 'text-stone-700 hover:text-lime-600'
                            }`}
                    >
                        {task.title}
                    </span>
                )}
            </div>
        </div>
    );
}
