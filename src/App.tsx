import { useState, useEffect } from "react";
import { Scanner } from "./components/Scanner";
import { AmountList } from "./components/AmountList";
import { Total } from "./components/Total";
import { AmountInput } from "./components/AmountInput";
import { useAmountStore } from "./store/amountStore";

const SCROLL_TOP_THRESHOLD = 200;

function App() {
  const [showScanner, setShowScanner] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scannedValue, setScannedValue] = useState("");

  const { amounts, addAmount, removeAmount, clearAll, getTotal } =
    useAmountStore();
  const { totalDKK, totalEUR } = getTotal();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddAmount = (value: string) => {
    try {
      addAmount(parseFloat(value));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveAmount = (id: number) => {
    removeAmount(id);
  };

  const handleClearAll = () => {
    clearAll();
  };

  const handleScanComplete = (value: string) => {
    setScannedValue(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Calculatrice de Courses
        </h1>

        <AmountInput
          onAddAmount={handleAddAmount}
          onShowScanner={() => setShowScanner(true)}
          onClearAll={handleClearAll}
          hasAmounts={amounts.length > 0}
          scannedValue={scannedValue}
          onScannedValueChange={setScannedValue}
        />

        {showScanner && (
          <Scanner
            onScanComplete={handleScanComplete}
            onClose={() => setShowScanner(false)}
          />
        )}

        <div className="my-6 border-t border-gray-200"></div>

        <AmountList amounts={amounts} onRemoveAmount={handleRemoveAmount} />

        <div className="my-6 border-t border-gray-200"></div>

        <Total totalDKK={totalDKK} totalEUR={totalEUR} />

        {showScrollTop && (
          <button
            className="fixed bottom-8 right-8 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
            onClick={scrollToTop}
            aria-label="Retour en haut"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
