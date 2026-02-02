export default function TaskStats({ total, completed }) {
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Tasks */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Tareas</p>
                        <p className="text-3xl font-black text-stone-900 mt-1">{total}</p>
                    </div>
                    <div className="bg-stone-100 p-3 rounded-lg text-2xl">📋</div>
                </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-lime-50 p-5 rounded-xl border border-lime-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-lime-600 uppercase tracking-wider">Completadas</p>
                        <p className="text-3xl font-black text-lime-600 mt-1">{completed}</p>
                    </div>
                    <div className="bg-lime-100 p-3 rounded-lg text-2xl">✅</div>
                </div>
            </div>

            {/* Progress Percentage */}
            <div className="bg-stone-800 p-5 rounded-xl border border-stone-700 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Progreso</p>
                        <p className="text-3xl font-black text-white mt-1">{progress}%</p>
                    </div>
                    <div className="bg-lime-500/20 p-3 rounded-lg text-2xl">📊</div>
                </div>
            </div>
        </div>
    );
}
