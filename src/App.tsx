import { useState, useEffect } from "react";
import "./App.css";

const DKK_TO_EUR = 0.134;

interface Amount {
  id: number;
  dkk: number;
  eur: number;
}

const STORAGE_KEY = "dkk-calculator";

function App() {
  const [amounts, setAmounts] = useState<Amount[]>(() => {
    const savedAmounts = localStorage.getItem(STORAGE_KEY);
    return savedAmounts ? JSON.parse(savedAmounts) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(amounts));
  }, [amounts]);

  const addAmount = () => {
    const dkkValue = parseFloat(inputValue);
    if (!isNaN(dkkValue) && dkkValue > 0) {
      const newAmount: Amount = {
        id: Date.now(),
        dkk: dkkValue,
        eur: dkkValue * DKK_TO_EUR,
      };
      setAmounts([...amounts, newAmount]);
      setInputValue("");
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  const removeAmount = (id: number) => {
    setAmounts(amounts.filter((amount) => amount.id !== id));
  };

  const clearAll = () => {
    setAmounts([]);
  };

  const totalDKK = amounts.reduce((sum, amount) => sum + amount.dkk, 0);
  const totalEUR = amounts.reduce((sum, amount) => sum + amount.eur, 0);

  return (
    <div className="app">
      <h1>Calculatrice de Courses</h1>

      <div className="input-section">
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Montant en DKK"
          onKeyDown={(e) => e.key === "Enter" && addAmount()}
        />
        <div className="button-group">
          <button onClick={addAmount} className={showTooltip ? "tooltip" : ""}>
            Ajouter
            {showTooltip && (
              <span className="tooltip-text">Veuillez entrer un montant</span>
            )}
          </button>
          <button
            className="clear-all"
            onClick={clearAll}
            disabled={amounts.length === 0}
          >
            Effacer tout
          </button>
        </div>
        {inputValue && !isNaN(parseFloat(inputValue)) && (
          <div className="preview">
            {parseFloat(inputValue).toFixed(2)} DKK ={" "}
            {(parseFloat(inputValue) * DKK_TO_EUR).toFixed(2)} EUR
          </div>
        )}
      </div>

      <div className="divider"></div>

      <div className="amounts-list">
        {amounts.map((amount) => (
          <div key={amount.id} className="amount-item">
            <span>{amount.dkk.toFixed(2)} DKK</span>
            <span>= {amount.eur.toFixed(2)} EUR</span>
            <button onClick={() => removeAmount(amount.id)}>×</button>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      <div className="total">
        <h2>Total</h2>
        <p>{totalDKK.toFixed(2)} DKK</p>
        <p>= {totalEUR.toFixed(2)} EUR</p>
      </div>
    </div>
  );
}

export default App;
