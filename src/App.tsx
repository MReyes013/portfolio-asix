import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProjectGallery from "./ProjectGallery";

export type SiteLanguage = "ES" | "EN";

export default function App() {
  const [language, setLanguage] = useState<SiteLanguage>("ES");
  const [cyberMode, setCyberMode] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-white">
      <div className="flex h-full flex-col lg:flex-row">

        {/* SIDEBAR */}
        <div className="h-full w-[38%] shrink-0 overflow-y-auto border-r border-black/5">
          <Sidebar
            language={language}
            cyberMode={cyberMode}
            setCyberMode={setCyberMode}
          />
        </div>

        {/* PORTFOLIO */}
        <main className="h-full flex-1 overflow-y-auto bg-white">
          <ProjectGallery
            language={language}
            setLanguage={setLanguage}
            cyberMode={cyberMode}
          />
        </main>

      </div>
    </div>
  );
}