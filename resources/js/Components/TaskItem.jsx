import { useState } from 'react';

export default function TaskItem({ task, onToggle, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditValue(task.title);
    };

    const handleBlur = () => {
        if (editValue.trim().length > 0) {
            onUpdate(task.id, editValue.trim());
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
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all group">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ) : (
                <span
                    onDoubleClick={handleDoubleClick}
                    className={`flex-1 cursor-pointer select-none ${task.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-700'
                        }`}
                >
                    {task.title}
                </span>
            )}
        </div>
    );
}
