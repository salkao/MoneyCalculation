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
  categories: string[];
  filterCategory: string;
  isModalOpen: boolean;
  editingExpenseId: string | null;
}

export const useBudgetStore = defineStore('budget', {
  state: (): BudgetState => ({
    user: {
      name: '',
      income: 0,
      goals: 0,
    },
    expenses: [
      {
        id: '1',
        name: 'Expense 1',
        category: 'food',
        date: '2021-01-01',
        amount: 100,
      },
      // {
      //   id: '2',
      //   name: 'Expense 2',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '3',
      //   name: 'Expense 3',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '4',
      //   name: 'Expense 4',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '5',
      //   name: 'Expense 5',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '6',
      //   name: 'Expense 6',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '7',
      //   name: 'Expense 7',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '8',
      //   name: 'Expense 8',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '9',
      //   name: 'Expense 9',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '10',
      //   name: 'Expense 10',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '11',
      //   name: 'Expense 11',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '12',
      //   name: 'Expense 12',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
      // {
      //   id: '13',
      //   name: 'Expense 13',
      //   category: 'food',
      //   date: '2021-01-01',
      //   amount: 100,
      // },
    ],

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
    filterCategory: '',
    isModalOpen: false,
    editingExpenseId: null,
  }),

  getters: {
    getExpenses: (state) => state.expenses,
    getCategories: (state) => state.categories,
    getFilterCategory: (state) => state.filterCategory,
    getIsModalOpen: (state) => state.isModalOpen,
    getEditingExpense: (state) => {
      if (!state.editingExpenseId) return null;
      return (
        state.expenses.find((e) => e.id === state.editingExpenseId) || null
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
        can use findIndex and splice but this is more readable
        and performances should be the issue
      */
      this.expenses = this.expenses.filter((e) => e.id !== id);
    },

    setEditingExpenseId(id: string) {
      this.editingExpenseId = id;
      this.isModalOpen = true;
    },
  },
});
