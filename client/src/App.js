import { Routes, Route, Navigate } from "react-router-dom";
import "./css/main.css";
import Home from "./components/Home";
import SavedReviews from "./components/SavedReviews";
import LogIn from "./components/LogIn";
import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";
import MainContainer from "./components/MainContainer";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <RequireNotAuth>
              <LogIn />
            </RequireNotAuth>
          }
        />
        <Route
          path="*"
          element={
            //<RequireAuth>
              <QueryClientProvider client={queryClient}>
                <MainContainer></MainContainer>
              </QueryClientProvider>
            //</RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
