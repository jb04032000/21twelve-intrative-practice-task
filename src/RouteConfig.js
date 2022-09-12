import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import WebContext from "./context/web-context";

const SearchParams = lazy(() => import("./components/SearchParams"));
const Nopagefound = lazy(() => import("./pages/Nopagefound"));

function RoueConfig() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading....</div>}>
        <WebContext.Provider>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <SearchParams />
                </ErrorBoundary>
              }
            />

            <Route path="*" element={<Nopagefound />} />
          </Routes>
        </WebContext.Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default RoueConfig;
