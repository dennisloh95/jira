import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticateda-app";
import { UnauthenticatedApp } from "unauthenticateda-app";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
