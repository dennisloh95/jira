import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticateda-app";
import { UnauthenticatedApp } from "unauthenticateda-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
