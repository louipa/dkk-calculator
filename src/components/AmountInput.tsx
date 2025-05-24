import { useState, useMemo, useEffect } from "react";
import { AmountPreview } from "./AmountPreview";

const DKK_TO_EUR = 0.134;

interface AmountInputProps {
  onAddAmount: (value: string) => void;
  onShowScanner: () => void;
  onClearAll: () => void;
  hasAmounts: boolean;
  scannedValue: string;
  onScannedValueChange: (value: string) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  onAddAmount,
  onShowScanner,
  onClearAll,
  hasAmounts,
  scannedValue,
  onScannedValueChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (scannedValue) {
      setInputValue(scannedValue);
      onScannedValueChange("");
    }
  }, [scannedValue, onScannedValueChange]);

  const previewAmount = useMemo(() => {
    if (
      !inputValue ||
      isNaN(parseFloat(inputValue)) ||
      parseFloat(inputValue) <= 0
    ) {
      return null;
    }
    const dkkValue = parseFloat(inputValue);
    return {
      dkk: dkkValue,
      eur: dkkValue * DKK_TO_EUR,
    };
  }, [inputValue]);

  const handleAddAmount = () => {
    const dkkValue = parseFloat(inputValue);
    if (!isNaN(dkkValue) && dkkValue > 0) {
      onAddAmount(inputValue);
      setInputValue("");
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Montant en DKK"
            onKeyDown={(e) => e.key === "Enter" && handleAddAmount()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Effacer"
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
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAddAmount}
          className={`relative flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            showTooltip ? "ring-2 ring-red-500" : ""
          }`}
        >
          Ajouter
          {showTooltip && (
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-red-500 rounded-lg whitespace-nowrap">
              Veuillez entrer un montant
            </span>
          )}
        </button>
        <button
          onClick={onShowScanner}
          className="flex-1 px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Scanner
        </button>
        <button
          onClick={onClearAll}
          disabled={!hasAmounts}
          className={`flex-1 px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            hasAmounts
              ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Effacer tout
        </button>
      </div>
      {previewAmount && (
        <AmountPreview
          dkkValue={previewAmount.dkk}
          eurValue={previewAmount.eur}
        />
      )}
    </div>
  );
};
