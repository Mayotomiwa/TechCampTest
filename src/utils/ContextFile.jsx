import { DataProvider } from "../context/AppContext";
import Home from "../screen/Home";

export default function ContextFile() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}
