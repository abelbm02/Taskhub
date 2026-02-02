export default function TaskStats({ total, completed }) {
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Total Tasks */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Total</p>
                        <p className="text-2xl font-bold text-blue-900 mt-1">{total}</p>
                    </div>
                    <div className="text-3xl">📋</div>
                </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Completadas</p>
                        <p className="text-2xl font-bold text-green-900 mt-1">{completed}</p>
                    </div>
                    <div className="text-3xl">✅</div>
                </div>
            </div>

            {/* Progress Percentage */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Progreso</p>
                        <p className="text-2xl font-bold text-purple-900 mt-1">{progress}%</p>
                    </div>
                    <div className="text-3xl">📊</div>
                </div>
            </div>
        </div>
    );
}
