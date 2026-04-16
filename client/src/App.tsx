import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const About = lazy(() => import("./pages/About"));
const Books = lazy(() => import("./pages/Books"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Receive = lazy(() => import("./pages/Receive"));
const StartHere = lazy(() => import("./pages/StartHere"));

function LegacyBooksRedirect() {
  useEffect(() => {
    window.location.replace("/books");
  }, []);

  return null;
}

function Router() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-muted-foreground/70 text-sm tracking-wide">
          Loading...
        </div>
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/start-here" component={StartHere} />
        <Route path="/books" component={Books} />
        <Route path="/the-book-series" component={LegacyBooksRedirect} />
        <Route path="/about" component={About} />
        <Route path="/receive" component={Receive} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
