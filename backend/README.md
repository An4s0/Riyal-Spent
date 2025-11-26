# Riyal Spent API

This document describes all available API routes for Riyal Spent application.

## 1️⃣ Auth Routes

| Description     | Method | Route                   | Notes                              |
| --------------- | ------ | ----------------------- | ---------------------------------- |
| Sign Up         | POST   | /auth/signup            | Create a new user account.         |
| Login           | POST   | /auth/login             | User login, returns a JWT token.   |
| Change Password | POST   | /auth/change-password   | Requires current and new password. |
| Logout          | POST   | /auth/logout            | Invalidate the JWT token.          |

## 2️⃣ Dashboard & Expenses Routes

| Description         | Method      | Route         | Notes                                              |
| ------------------- | ----------- | ------------- | -------------------------------------------------- |
| Get Dashboard       | GET         | /dashboard    | Fetch total expenses, stats, and trends.           |
| Get All Expenses    | GET         | /expenses     | List all expenses (supports filters/search).       |
| Add New Expense     | POST        | /expenses     | Create a new expense record.                       |
| Get Expense Details | GET         | /expenses/:id | Fetch details of a specific expense (for editing). |
| Edit Expense        | PUT / PATCH | /expenses/:id | Update a specific expense.                         |
| Delete Expense      | DELETE      | /expenses/:id | Delete a specific expense record.                  |

## 3️⃣ Categories Routes

| Description          | Method      | Route           | Notes                                               |
| -------------------- | ----------- | --------------- | --------------------------------------------------- |
| Get All Categories   | GET         | /categories     | List all expense categories.                        |
| Add New Category     | POST        | /categories     | Create a new category.                              |
| Get Category Details | GET         | /categories/:id | Fetch details of a specific category (for editing). |
| Edit Category        | PUT / PATCH | /categories/:id | Update category name, icon, or color.               |
| Delete Category      | DELETE      | /categories/:id | Delete a specific category.                         |

## 4️⃣ Profile Routes

| Description            | Method      | Route           | Notes                                      |
| ---------------------- | ----------- | --------------- | ------------------------------------------ |
| Get Profile            | GET         | /profile        | Fetch user profile data and stats.         |
| Edit Profile           | PUT / PATCH | /profile        | Update name, email, or preferred currency. |
| Delete Account         | DELETE      | /profile        | Permanently delete user account.           |
| Export Data            | GET         | /profile/export | Download expense data.                     |
