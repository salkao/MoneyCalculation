import { defineStore } from 'pinia';

interface User {
  name: string;
  income: number;
  goals: number;
}

export interface Expense {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

export interface BudgetState {
  user: User;
  expenses: Expense[];
}

export const useBudgetStore = defineStore('budget', {
  state: (): BudgetState => ({
    user: {
      name: '',
      income: 0,
      goals: 0,
    },
    expenses: [],
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
});
