import type { Amount } from "../types/Amount";

interface AmountListProps {
  amounts: Amount[];
  onRemoveAmount: (id: number) => void;
}

export const AmountList: React.FC<AmountListProps> = ({
  amounts,
  onRemoveAmount,
}) => {
  return (
    <div className="space-y-2">
      {amounts.map((amount) => (
        <div
          key={amount.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-lg font-medium text-gray-900">
            {amount.dkk.toFixed(2)} DKK
          </span>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">= {amount.eur.toFixed(2)} EUR</span>
            <button
              onClick={() => onRemoveAmount(amount.id)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Supprimer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
