import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Auth */
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Main */
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

/* Expenses */
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";

/* Categories */
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

/* 404 */
import NotFound from "./pages/NotFound";

/* Icons */
import {
  Utensils,
  Car,
  ShoppingCart,
  MoreHorizontal,
} from "lucide-react";

/* -------------------- */
/* Initial Data */
/* -------------------- */

const defaultCategories = [
  {
    id: 1,
    name: "Food",
    description: "Restaurants, groceries",
    color: "#ff7d7d",
    icon: Utensils,
    iconBg: "#ff7d7d1A",
    transactions: 0,
  },
  {
    id: 2,
    name: "Transport",
    description: "Uber, fuel",
    color: "#4a90e2",
    icon: Car,
    iconBg: "#4a90e21A",
    transactions: 0,
  },
  {
    id: 3,
    name: "Shopping",
    description: "Clothes, electronics",
    color: "#28a745",
    icon: ShoppingCart,
    iconBg: "#28a7451A",
    transactions: 0,
  },
  {
    id: 4,
    name: "Others",
    description: "Misc",
    color: "#31C6D4",
    icon: MoreHorizontal,
    iconBg: "#31C6D41A",
    transactions: 0,
  },
];

const defaultExpenses = [];

/* -------------------- */
/* Auth */
/* -------------------- */

const isAuthenticated = () => {
  return !!localStorage.getItem("auth");
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
};

/* -------------------- */
/* App */
/* -------------------- */

export default function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  /* Load from localStorage */
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    const storedExpenses = localStorage.getItem("expenses");

    setCategories(
      storedCategories ? JSON.parse(storedCategories) : defaultCategories
    );
    setExpenses(
      storedExpenses ? JSON.parse(storedExpenses) : defaultExpenses
    );
  }, []);

  /* Persist */
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  /* -------------------- */
  /* Categories CRUD */
  /* -------------------- */

  const addCategory = (data) => {
    setCategories((prev) => [
      ...prev,
      {
        ...data,
        id: Date.now(),
        transactions: 0,
        iconBg: data.color + "1A",
      },
    ]);
  };

  const updateCategory = (updated) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setExpenses((prev) => prev.filter((e) => e.categoryId !== id));
  };

  /* -------------------- */
  /* Expenses CRUD */
  /* -------------------- */

  const addExpense = (data) => {
    setExpenses((prev) => [
      { ...data, id: Date.now() },
      ...prev,
    ]);

    setCategories((prev) =>
      prev.map((c) =>
        c.id === data.categoryId
          ? { ...c, transactions: c.transactions + 1 }
          : c
      )
    );
  };

  const updateExpense = (updated) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  const deleteExpense = (id) => {
    const exp = expenses.find((e) => e.id === id);
    if (exp) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === exp.categoryId
            ? { ...c, transactions: Math.max(0, c.transactions - 1) }
            : c
        )
      );
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  /* -------------------- */
  /* Routes */
  /* -------------------- */

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard expenses={expenses} categories={categories} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses expenses={expenses} categories={categories} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses/add"
          element={
            <ProtectedRoute>
              <AddExpense addExpense={addExpense} categories={categories} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses/edit/:id"
          element={
            <ProtectedRoute>
              <EditExpense
                expenses={expenses}
                categories={categories}
                updateExpense={updateExpense}
                deleteExpense={deleteExpense}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories categories={categories} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/add"
          element={
            <ProtectedRoute>
              <AddCategory addCategory={addCategory} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <ProtectedRoute>
              <EditCategory
                categories={categories}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
