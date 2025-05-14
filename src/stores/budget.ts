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
  date?: string;
  amount: number;
}

export interface BudgetState {
  user: User;
  expenses: Expense[];
  categories: string[];
  filterCategory: string;
  isModalOpen: boolean;
  editingExpenseId: string | null;
  optionalExpenses: Expense[];
}

export const useBudgetStore = defineStore('budget', {
  state: (): BudgetState => ({
    user: {
      name: 'Salkao',
      income: 0,
      // amount of money that the user wants to save
      goals: 0,
    },
    expenses: [],

    // Expense categories & filter
    categories: [
      'food',
      'debts',
      'ocio',
      'rent',
      'salud',
      'savings',
      'supscription',
      'various',
    ],
    filterCategory: 'all',
    isModalOpen: false,
    editingExpenseId: null,
    optionalExpenses: [
      {
        id: 'netflix',
        name: 'Netflix',
        category: 'supscription',
        amount: 100,
      },
      {
        id: 'spotify',
        name: 'Spotify',
        category: 'supscription',
        amount: 100,
      },
      {
        id: 'amazon',
        name: 'Amazon',
        category: 'supscription',
        amount: 100,
      },
      {
        id: 'google',
        name: 'Google',
        category: 'supscription',
        amount: 100,
      },
      {
        id: 'facebook',
        name: 'Facebook',
        category: 'supscription',
        amount: 100,
      },
    ],
  }),

  getters: {
    // return all expenses based on the filter category
    getExpenses: (state) => {
      if (state.filterCategory === 'all') return state.expenses;
      return state.expenses.filter((e) => e.category === state.filterCategory);
    },
    getUser: (state) => state.user,
    getCategories: (state) => state.categories,
    getFilterCategory: (state) => state.filterCategory,
    getIsModalOpen: (state) => state.isModalOpen,
    getEditingExpense: (state) => {
      if (!state.editingExpenseId) return null;
      return (
        state.expenses.find((e) => e.id === state.editingExpenseId) || null
      );
    },
    getOptionalExpenses: (state) => state.optionalExpenses,
    getTotalExpenses: (state) => {
      return state.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    },
    getAvailableBalance: (state) => {
      return (
        state.user.income -
        state.expenses.reduce((acc, expense) => acc + expense.amount, 0)
      );
    },
  },

  actions: {
    setUser(user: User) {
      this.user = user;
    },

    setFilterCategory(category: string) {
      this.filterCategory = category;
    },

    setIsModalOpen(value: boolean) {
      this.isModalOpen = value;
    },

    saveExpense(expense: Expense) {
      // check if the expense already exists
      const existingExpense = this.expenses.findIndex(
        (e) => e.id === expense.id
      );
      if (existingExpense !== -1) {
        this.expenses[existingExpense] = expense;
      } else {
        this.expenses.push(expense);
      }
    },

    deleteExpense(id: string) {
      /*
        could use findIndex and splice but this is more readable
        and performances should be the issue
      */
      this.expenses = this.expenses.filter((e) => e.id !== id);
    },

    setEditingExpenseId(id: string | null) {
      this.editingExpenseId = id;
      this.isModalOpen = true;
    },

    resetExpenses() {
      this.expenses = [];
    },
  },
  persist: true,
});
