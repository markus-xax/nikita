import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AppLayout } from "./components/app-layout";
import { OverviewPage } from "./pages/OverviewPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { BasicHtmlPage } from "./pages/examples/BasicHtmlPage";
import { FormsPage } from "./pages/examples/FormsPage";
import { InteractivePage } from "./pages/examples/InteractivePage";
import { LayoutsPage } from "./pages/examples/LayoutsPage";
import { DomPage } from "./pages/examples/DomPage";

function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/examples/basic-html" element={<BasicHtmlPage />} />
          <Route path="/examples/forms" element={<FormsPage />} />
          <Route path="/examples/interactive" element={<InteractivePage />} />
          <Route path="/examples/layouts" element={<LayoutsPage />} />
          <Route path="/examples/dom" element={<DomPage />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;

