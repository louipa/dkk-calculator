import { create } from "zustand";
import type { Amount } from "../types/Amount";

const DKK_TO_EUR = 0.134;
const STORAGE_KEY = "dkk-calculator";

interface AmountState {
  amounts: Amount[];
  addAmount: (dkkValue: number) => void;
  removeAmount: (id: number) => void;
  clearAll: () => void;
  getTotal: () => { totalDKK: number; totalEUR: number };
}

export const useAmountStore = create<AmountState>((set, get) => ({
  amounts: (() => {
    const savedAmounts = localStorage.getItem(STORAGE_KEY);
    return savedAmounts ? JSON.parse(savedAmounts) : [];
  })(),

  addAmount: (dkkValue: number) => {
    if (isNaN(dkkValue) || dkkValue <= 0) {
      throw new Error("Veuillez entrer un montant valide");
    }

    const newAmount: Amount = {
      id: Date.now(),
      dkk: dkkValue,
      eur: dkkValue * DKK_TO_EUR,
    };

    set((state) => {
      const newAmounts = [...state.amounts, newAmount];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAmounts));
      return { amounts: newAmounts };
    });
  },

  removeAmount: (id: number) => {
    set((state) => {
      const newAmounts = state.amounts.filter((amount) => amount.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAmounts));
      return { amounts: newAmounts };
    });
  },

  clearAll: () => {
    set({ amounts: [] });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },

  getTotal: () => {
    const { amounts } = get();
    const totalDKK = amounts.reduce((sum, amount) => sum + amount.dkk, 0);
    const totalEUR = amounts.reduce((sum, amount) => sum + amount.eur, 0);
    return { totalDKK, totalEUR };
  },
}));
