import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchParams from "./components/SearchParams";
import WebContext from "./context/web-context";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <WebContext.Provider>
        <div className="App">
          <div>
            <h1>Adopt Me!</h1>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <SearchParams />
                  </ErrorBoundary>
                }
              />
              <Route path="*" element={<SearchParams />} />
            </Routes>
          </div>
        </div>
      </WebContext.Provider>
    </BrowserRouter>
  );
}

export default App;
