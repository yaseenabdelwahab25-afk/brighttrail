import { BrowserRouter, Route, Routes } from "react-router-dom";
import Brighttrail from "./pages/brighttrail";
import DesignKitDemo from "./pages/_design";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/_design" element={<DesignKitDemo />} />
          <Route path="*" element={<Brighttrail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
