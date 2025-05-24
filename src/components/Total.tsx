interface TotalProps {
  totalDKK: number;
  totalEUR: number;
}

export const Total: React.FC<TotalProps> = ({ totalDKK, totalEUR }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        Total
      </h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-white/50 rounded-lg p-4">
          <span className="text-gray-600">DKK</span>
          <span className="text-2xl font-bold text-blue-900">
            {totalDKK.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between bg-white/50 rounded-lg p-4">
          <span className="text-gray-600">EUR</span>
          <span className="text-2xl font-bold text-blue-900">
            {totalEUR.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
