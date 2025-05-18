import Layout from "./components/Layout";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Layout />
      <Toaster richColors position="top-right" theme="dark" />
    </div>
  );
}

export default App;
