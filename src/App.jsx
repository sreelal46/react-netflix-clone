import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

import Home from "./components/home/Navigate/Home";
import Shows from "./components/home/Navigate/Shows";
import Movie from "./components/home/Navigate/Movie";
import NewAndPopular from "./components/home/Navigate/NewAndPopular";
import MyList from "./components/home/Navigate/MyList";
import LoginPage from "./components/login/LoginPage";
import SignUpForm from "./components/login/SignUpPage";

// Protected route wrapper
function ProtectedRoute({ user, children }) {
  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/" replace />;
  }
  return children;
}

// Redirect logged-in users from login/signup
function AuthRoute({ user, children }) {
  if (user) {
    // Redirect to home if already logged in
    return <Navigate to="/home" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User is logged in:", currentUser.email);
      } else {
        setUser(null);
        console.log("User is logged out");
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <AuthRoute user={user}>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute user={user}>
              <SignUpForm />
            </AuthRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shows"
          element={
            <ProtectedRoute user={user}>
              <Shows title="Tv-Shows" weNeed="yes" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie"
          element={
            <ProtectedRoute user={user}>
              <Movie title="Movies" weNeed="yes" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-popular"
          element={
            <ProtectedRoute user={user}>
              <NewAndPopular title="New & Popular" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute user={user}>
              <MyList />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
