import { Languages } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type SiteLanguage = "ES" | "EN";

type ProjectGalleryProps = {
  language: SiteLanguage;
  setLanguage: Dispatch<SetStateAction<SiteLanguage>>;
  cyberMode: boolean;
  setCyberMode: (value: boolean) => void;
};

const translations = {
  ES: {
    mainProject: "Proyecto principal",
    personalProject: "Proyecto personal",
    academicProject: "Proyecto académico",
    professionalProject: "Proyecto profesional",
    completed: "Completado",
    inProgress: "En progreso",
    planned: "Planificado",
    projects: "Proyectos",
    selectedProjects: "Proyectos seleccionados",
  },
  EN: {
    mainProject: "Main project",
    personalProject: "Personal project",
    academicProject: "Academic project",
    professionalProject: "Professional project",
    completed: "Completed",
    inProgress: "In progress",
    planned: "Planned",
    projects: "Projects",
    selectedProjects: "Selected projects",
  },
};

const projects = [
  {
    id: 0,
    image: "/images/portfolio.png",
    type: "Proyecto personal",
    status: "En progreso",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide React"],
  },
  {
    id: 1,
    image: null,
    type: "Proyecto personal",
    status: "Completado",
    technologies: ["Linux", "Servidores", "SSH"],
  },
  {
    id: 2,
    image: null,
    type: "Proyecto académico",
    status: "En progreso",
    technologies: ["TCP/IP", "Networking", "Infraestructura"],
  },
];

const projectTranslations = {
  ES: {
    0: {
      title: "Mi Portfolio",
      description:
        "Portfolio personal desarrollado con React, TypeScript y Tailwind CSS para mostrar mi formación, proyectos y evolución hacia la ciberseguridad.",
    },
    1: {
      title: "Proyecto de infraestructura Linux",
      description:
        "Configuración y administración de un entorno Linux orientado a servicios, sistemas y seguridad.",
    },
    2: {
      title: "Infraestructura y redes",
      description:
        "Diseño y configuración de una infraestructura de red trabajando conceptos de TCP/IP, networking y comunicación.",
    },
  },
  EN: {
    0: {
      title: "My Portfolio",
      description:
        "Personal portfolio developed with React, TypeScript and Tailwind CSS to showcase my education, projects and journey towards cybersecurity.",
    },
    1: {
      title: "Linux Infrastructure Project",
      description:
        "Configuration and administration of a Linux environment focused on services, systems and security.",
    },
    2: {
      title: "Infrastructure and Networks",
      description:
        "Design and configuration of a network infrastructure working with TCP/IP, networking and communication concepts.",
    },
  },
};

export default function ProjectGallery({
  language = "ES",
  setLanguage,
  cyberMode,
}: ProjectGalleryProps) {
  const t = translations[language];
  const projectText = projectTranslations[language];

  const typeLabel = (type: string) => {
    if (type === "Proyecto académico") return t.academicProject;
    if (type === "Proyecto profesional") return t.professionalProject;
    return t.personalProject;
  };

  const statusLabel = (status: string) => {
    if (status === "Completado") return t.completed;
    if (status === "Planificado") return t.planned;
    return t.inProgress;
  };

  const themeText = cyberMode ? "text-[#eafff0]" : "text-black";
  const mutedText = cyberMode ? "text-[#eafff0]/50" : "text-black/50";
  const cardTheme = cyberMode
    ? "border border-[#00ff66]/10 bg-[#0a120d]"
    : "bg-[#F3F4F6]";
  const subtleTag = cyberMode
    ? "bg-[#111c14] text-[#00ff66]/65"
    : "bg-white text-black/50";

  const main = projects[0];
  const mainText = projectText[0];

  return (
    <section
      className={`min-h-full px-5 py-8 transition-colors duration-700 sm:px-8 sm:py-10 lg:px-12 lg:py-10 ${
        cyberMode ? "bg-[#050805] text-[#eafff0]" : "bg-white text-black"
      }`}
    >
      <div className="mb-5 flex justify-end">
        <div
          className={`flex items-center gap-1 rounded-full border p-1 shadow-sm transition-colors duration-700 ${
            cyberMode
              ? "border-[#00ff66]/20 bg-[#0a120d]"
              : "border-black/10 bg-[#F3F4F6]"
          }`}
        >
          <Languages
            size={15}
            strokeWidth={1.7}
            className={`ml-2 mr-1 ${
              cyberMode ? "text-[#00ff66]/50" : "text-black/40"
            }`}
          />
          <button
            type="button"
            onClick={() => setLanguage("ES")}
            aria-pressed={language === "ES"}
            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] transition-all duration-300 ${
              language === "ES"
                ? cyberMode
                  ? "bg-[#00ff66] text-black"
                  : "bg-black text-white"
                : cyberMode
                  ? "text-[#00ff66]/40 hover:text-[#00ff66]"
                  : "text-black/40 hover:text-black"
            }`}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLanguage("EN")}
            aria-pressed={language === "EN"}
            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] transition-all duration-300 ${
              language === "EN"
                ? cyberMode
                  ? "bg-[#00ff66] text-black"
                  : "bg-black text-white"
                : cyberMode
                  ? "text-[#00ff66]/40 hover:text-[#00ff66]"
                  : "text-black/40 hover:text-black"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <section className="mb-16">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  cyberMode ? "text-[#00ff66]/40" : "text-black/30"
                }`}
              >
                01 / {t.mainProject}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {mainText.title}
              </h2>
            </div>
            <span
              className={`w-fit rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] ${
                cyberMode ? "bg-[#00ff66] text-black" : "bg-black text-white"
              }`}
            >
              {t.personalProject}
            </span>
          </div>

          <article className={`overflow-hidden rounded-[2rem] p-5 transition-colors duration-700 sm:p-7 lg:p-9 ${cardTheme}`}>
            <div
              className={`relative block aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] ${
                cyberMode ? "bg-black ring-1 ring-[#00ff66]/15" : "bg-black"
              }`}
            >
              <img
                src={main.image ?? "/images/gif.gif"}
                alt={mainText.title}
                draggable={false}
                className="pointer-events-none h-full w-full select-none object-contain"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {mainText.title}
              </h3>
              <p className={`mt-5 max-w-3xl text-sm leading-7 transition-colors duration-700 sm:text-base ${mutedText}`}>
                {mainText.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {main.technologies.map((technology) => (
                  <span
                    key={technology}
                    className={`inline-flex items-center rounded-full px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] ${subtleTag}`}
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] ${
                  cyberMode
                    ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/60"
                    : "border-black/10 bg-white text-black/45"
                }`}>
                  {t.personalProject}
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] ${
                  cyberMode
                    ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/60"
                    : "border-black/10 bg-white text-black/45"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${cyberMode ? "bg-[#00ff66]" : "bg-black/30"}`} />
                  {t.inProgress}
                </span>
              </div>
            </div>
          </article>
        </section>

        <section>
          <div className="mb-7">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
              cyberMode ? "text-[#00ff66]/40" : "text-black/30"
            }`}>
              02 / {t.projects}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {t.selectedProjects}
            </h2>
          </div>

          <div className="space-y-10">
            {projects.slice(1).map((project) => {
              const content = projectText[project.id as 1 | 2];
              return (
                <article key={project.id} className="overflow-hidden rounded-[2rem]">
                  <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] ${
                    cyberMode ? "bg-[#0a120d] ring-1 ring-[#00ff66]/10" : "bg-[#F3F4F6]"
                  }`}>
                    <img
                      src={project.image ?? "/images/gif.gif"}
                      alt={content.title}
                      draggable={false}
                      className={`pointer-events-none h-full w-full select-none ${
                        project.image ? "object-cover" : "object-contain"
                      }`}
                    />
                  </div>

                  <div className="mt-7">
                    <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      {content.title}
                    </h3>
                    <p className={`mt-4 max-w-3xl text-sm leading-6 transition-colors duration-700 ${mutedText}`}>
                      {content.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className={`inline-flex items-center rounded-full px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] ${subtleTag}`}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] ${
                        cyberMode
                          ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/60"
                          : "border-black/10 text-black/45"
                      }`}>
                        {typeLabel(project.type)}
                      </span>
                      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] ${
                        cyberMode
                          ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/60"
                          : "border-black/10 text-black/45"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          cyberMode ? "bg-[#00ff66]" : project.status === "Completado" ? "bg-black" : "bg-black/30"
                        }`} />
                        {statusLabel(project.status)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
