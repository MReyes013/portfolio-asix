import {
  ArrowDown,
  ArrowUp,
  Check,
  Languages,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type Project = {
  id: number;
  image: string | null;
  title: string;
  description: string;
  technologies: string[];
  type: string;
  status: string;
};

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
    changeImage: "Cambiar imagen",
    save: "Guardar",
    edit: "Editar",
    newTag: "Nueva etiqueta",
    add: "Añadir",
    completed: "Completado",
    inProgress: "En progreso",
    planned: "Planificado",
    projects: "Proyectos",
    selectedProjects: "Proyectos seleccionados",
    moveUp: "Subir",
    moveDown: "Bajar",
    deleteProject: "Eliminar proyecto",
    portfolio: "Portfolio",
    addProject: "Añadir Proyecto",
    addProjectDescription:
      "Crea una nueva pieza para mostrar en tu portfolio.",
    deleteTechnology: "Eliminar",
  },

  EN: {
    mainProject: "Main project",
    personalProject: "Personal project",
    academicProject: "Academic project",
    professionalProject: "Professional project",
    changeImage: "Change image",
    save: "Save",
    edit: "Edit",
    newTag: "New tag",
    add: "Add",
    completed: "Completed",
    inProgress: "In progress",
    planned: "Planned",
    projects: "Projects",
    selectedProjects: "Selected projects",
    moveUp: "Move up",
    moveDown: "Move down",
    deleteProject: "Delete project",
    portfolio: "Portfolio",
    addProject: "Add Project",
    addProjectDescription:
      "Create a new piece to showcase in your portfolio.",
    deleteTechnology: "Delete",
  },
};

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

const initialProjects: Project[] = [
  {
    id: 0,
    image: "/images/portfolio.png",
    title: "Mi Portfolio",
    description:
      "Portfolio personal desarrollado con React, TypeScript y Tailwind CSS para mostrar mi formación, proyectos y evolución hacia la ciberseguridad.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Lucide React",
    ],
    type: "Proyecto personal",
    status: "En progreso",
  },

  {
    id: 1,
    image: null,
    title: "Proyecto de infraestructura Linux",
    description:
      "Configuración y administración de un entorno Linux orientado a servicios, sistemas y seguridad.",
    technologies: [
      "Linux",
      "Servidores",
      "SSH",
    ],
    type: "Proyecto personal",
    status: "Completado",
  },

  {
    id: 2,
    image: null,
    title: "Infraestructura y redes",
    description:
      "Diseño y configuración de una infraestructura de red trabajando conceptos de TCP/IP, networking y comunicación.",
    technologies: [
      "TCP/IP",
      "Networking",
      "Infraestructura",
    ],
    type: "Proyecto académico",
    status: "En progreso",
  },
];

export default function ProjectGallery({
  language = "ES",
  setLanguage,
  cyberMode,
  
}: ProjectGalleryProps) {
  const [projects, setProjects] =
    useState<Project[]>(initialProjects);

  const [activeProjectId, setActiveProjectId] =
    useState<number | null>(null);

  const [editingProjectId, setEditingProjectId] =
    useState<number | null>(null);

  const [newTechnology, setNewTechnology] =
    useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  // =========================================================
  // IMÁGENES
  // =========================================================

  const handleProjectClick = (projectId: number) => {
    setActiveProjectId(projectId);
    fileInputRef.current?.click();
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file || activeProjectId === null) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              image: imageUrl,
            }
          : project,
      ),
    );

    setActiveProjectId(null);
    event.target.value = "";
  };

  // =========================================================
  // EDITAR PROYECTO
  // =========================================================

  const updateProject = (
    projectId: number,
    changes: Partial<Project>,
  ) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...changes,
            }
          : project,
      ),
    );
  };

  // =========================================================
  // TECNOLOGÍAS
  // =========================================================

  const addTechnology = (projectId: number) => {
    const technology = newTechnology.trim();

    if (!technology) {
      return;
    }

    const project = projects.find(
      (item) => item.id === projectId,
    );

    if (!project) {
      return;
    }

    if (
      project.technologies.some(
        (item) =>
          item.toLowerCase() ===
          technology.toLowerCase(),
      )
    ) {
      setNewTechnology("");
      return;
    }

    updateProject(projectId, {
      technologies: [
        ...project.technologies,
        technology,
      ],
    });

    setNewTechnology("");
  };

  const removeTechnology = (
    projectId: number,
    technologyToRemove: string,
  ) => {
    const project = projects.find(
      (item) => item.id === projectId,
    );

    if (!project) {
      return;
    }

    updateProject(projectId, {
      technologies:
        project.technologies.filter(
          (technology) =>
            technology !== technologyToRemove,
        ),
    });
  };

  // =========================================================
  // ORDENAR PROYECTOS
  // =========================================================

  const moveProject = (
    projectId: number,
    direction: "up" | "down",
  ) => {
    if (projectId === 0) {
      return;
    }

    setProjects((currentProjects) => {
      const currentIndex =
        currentProjects.findIndex(
          (project) => project.id === projectId,
        );

      if (currentIndex === -1) {
        return currentProjects;
      }

      const newIndex =
        direction === "up"
          ? currentIndex - 1
          : currentIndex + 1;

      if (
        newIndex <= 0 ||
        newIndex >= currentProjects.length
      ) {
        return currentProjects;
      }

      const reorderedProjects = [
        ...currentProjects,
      ];

      const [movedProject] =
        reorderedProjects.splice(
          currentIndex,
          1,
        );

      reorderedProjects.splice(
        newIndex,
        0,
        movedProject,
      );

      return reorderedProjects;
    });
  };

  // =========================================================
  // AÑADIR PROYECTO
  // =========================================================

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      image: null,
      title:
        language === "ES"
          ? "Nuevo proyecto"
          : "New project",
      description:
        language === "ES"
          ? "Añade una descripción para explicar este proyecto."
          : "Add a description to explain this project.",
      technologies:
        language === "ES"
          ? ["Nueva tecnología"]
          : ["New technology"],
      type: "Proyecto personal",
      status: "En progreso",
    };

    setProjects((currentProjects) => [
      ...currentProjects,
      newProject,
    ]);

    setEditingProjectId(newProject.id);
  };

  // =========================================================
  // ELIMINAR PROYECTO
  // =========================================================

  const deleteProject = (projectId: number) => {
    if (projectId === 0) {
      return;
    }

    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) => project.id !== projectId,
      ),
    );

    if (editingProjectId === projectId) {
      setEditingProjectId(null);
    }
  };

  // =========================================================
  // PORTFOLIO
  // =========================================================

  const portfolioProject = projects.find(
    (project) => project.id === 0,
  );

  const regularProjects = projects.filter(
    (project) => project.id !== 0,
  );

  return (
    <section
      className={`min-h-full px-5 py-8 transition-colors duration-700 sm:px-8 sm:py-10 lg:px-12 lg:py-10 ${
        cyberMode
          ? "bg-[#050805] text-[#eafff0]"
          : "bg-white text-black"
      }`}
    >

      {/* SELECTOR DE IDIOMA */}

      <div className="mb-5 flex justify-end">
        <div
          key={language}
          className={`flex items-center gap-1 rounded-full border p-1 shadow-sm animate-[fadeIn_250ms_ease-out] transition-colors duration-700 ${
            cyberMode
              ? "border-[#00ff66]/20 bg-[#0a120d]"
              : "border-black/10 bg-[#F3F4F6]"
          }`}
        >
          <Languages
            size={15}
            strokeWidth={1.7}
            className={`ml-2 mr-1 transition-colors duration-700 ${
              cyberMode
                ? "text-[#00ff66]/50"
                : "text-black/40"
            }`}
          />

          <button
            type="button"
            onClick={() => setLanguage("ES")}
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

      {/* INPUT OCULTO */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            01 / PROYECTO PRINCIPAL
        ===================================================== */}

        {portfolioProject && (

          <section className="mb-16">

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-700 ${
                    cyberMode
                      ? "text-[#00ff66]/40"
                      : "text-black/30"
                  }`}
                >
                  01 / {translations[language].mainProject}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  {projectTranslations[language][0].title}
                </h2>

              </div>

              <span
                className={`w-fit rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-700 ${
                  cyberMode
                    ? "bg-[#00ff66] text-black"
                    : "bg-black text-white"
                }`}
              >
                {translations[language].personalProject}
              </span>

            </div>

            <article
              className={`overflow-hidden rounded-[2rem] p-5 transition-colors duration-700 sm:p-7 lg:p-9 ${
                cyberMode
                  ? "border border-[#00ff66]/10 bg-[#0a120d]"
                  : "bg-[#F3F4F6]"
              }`}
            >

              {/* IMAGEN DEL PORTFOLIO */}

              <button
                type="button"
                onClick={() =>
                  handleProjectClick(
                    portfolioProject.id,
                  )
                }
                className={`group relative block aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] text-left transition-colors duration-700 ${
                  cyberMode
                    ? "bg-black ring-1 ring-[#00ff66]/15"
                    : "bg-black"
                }`}
                aria-label={`${translations[language].changeImage} ${projectTranslations[language][0].title}`}
              >

                <img
                  src={
                    portfolioProject.image ??
                    "/images/gif.gif"
                  }
                  alt={projectTranslations[language][0].title}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    cyberMode
                      ? "bg-[#00ff66]/0 group-hover:bg-[#00ff66]/10"
                      : "bg-black/0 group-hover:bg-black/30"
                  }`}
                >

                  <div
                    className={`flex translate-y-2 items-center gap-2 rounded-full px-5 py-3 text-xs font-medium opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
                      cyberMode
                        ? "bg-[#00ff66] text-black"
                        : "bg-white text-black"
                    }`}
                  >

                    <Upload
                      size={16}
                      strokeWidth={1.7}
                    />

                    {translations[language].changeImage}

                  </div>

                </div>

              </button>

              {/* INFORMACIÓN */}

              <div className="mt-8">

                <div className="flex items-start justify-between gap-6">

                  <div className="min-w-0 flex-1">

                    {editingProjectId ===
                    portfolioProject.id ? (

                      <input
                        type="text"
                        value={
                          portfolioProject.title
                        }
                        onChange={(event) =>
                          updateProject(
                            portfolioProject.id,
                            {
                              title:
                                event.target.value,
                            },
                          )
                        }
                        className={`w-full border-b bg-transparent pb-2 text-3xl font-semibold tracking-tight outline-none transition-colors sm:text-4xl ${
                          cyberMode
                            ? "border-[#00ff66]/20 focus:border-[#00ff66]"
                            : "border-black/10 focus:border-black"
                        }`}
                      />

                    ) : (

                      <h3 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                        {
                          projectTranslations[
                            language
                          ][0].title
                        }
                      </h3>

                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setEditingProjectId(
                        editingProjectId ===
                          portfolioProject.id
                          ? null
                          : portfolioProject.id,
                      )
                    }
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-300 ${
                      editingProjectId ===
                      portfolioProject.id
                        ? cyberMode
                          ? "border-[#00ff66] bg-[#00ff66] text-black"
                          : "border-black bg-black text-white"
                        : cyberMode
                          ? "border-[#00ff66]/20 bg-[#0a120d] text-[#eafff0] hover:border-[#00ff66] hover:bg-[#00ff66] hover:text-black"
                          : "border-black/10 bg-white hover:border-black hover:bg-black hover:text-white"
                    }`}
                  >

                    {editingProjectId ===
                    portfolioProject.id ? (
                      <>
                        <Check
                          size={15}
                          strokeWidth={1.7}
                        />
                        {translations[language].save}
                      </>
                    ) : (
                      <>
                        <Pencil
                          size={15}
                          strokeWidth={1.7}
                        />
                        {translations[language].edit}
                      </>
                    )}

                  </button>

                </div>

                {/* DESCRIPCIÓN */}

                <div className="mt-5">

                  {editingProjectId ===
                  portfolioProject.id ? (

                    <textarea
                      value={
                        portfolioProject.description
                      }
                      onChange={(event) =>
                        updateProject(
                          portfolioProject.id,
                          {
                            description:
                              event.target.value,
                          },
                        )
                      }
                      rows={4}
                      className={`w-full resize-none rounded-2xl border p-4 text-sm leading-6 outline-none transition-colors ${
                        cyberMode
                          ? "border-[#00ff66]/15 bg-[#050805] text-[#eafff0] focus:border-[#00ff66]"
                          : "border-black/10 bg-white focus:border-black"
                      }`}
                    />

                  ) : (

                    <p
                      className={`max-w-3xl text-sm leading-7 transition-colors duration-700 sm:text-base ${
                        cyberMode
                          ? "text-[#eafff0]/50"
                          : "text-black/50"
                      }`}
                    >
                      {
                        projectTranslations[
                          language
                        ][0].description
                      }
                    </p>

                  )}

                </div>

                {/* TECNOLOGÍAS */}

                <div className="mt-6 flex flex-wrap items-center gap-2">

                  {portfolioProject.technologies.map(
                    (technology) => (

                      <span
                        key={technology}
                        className={`group/tag inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-700 ${
                          cyberMode
                            ? "bg-[#111c14] text-[#00ff66]/55"
                            : "bg-white text-black/45"
                        }`}
                      >

                        {technology}

                        {editingProjectId ===
                          portfolioProject.id && (

                          <button
                            type="button"
                            onClick={() =>
                              removeTechnology(
                                portfolioProject.id,
                                technology,
                              )
                            }
                            className={`transition-colors ${
                              cyberMode
                                ? "text-[#00ff66]/30 hover:text-[#00ff66]"
                                : "text-black/30 hover:text-black"
                            }`}
                            aria-label={`${translations[language].deleteTechnology} ${technology}`}
                          >

                            <X
                              size={13}
                              strokeWidth={2}
                            />

                          </button>

                        )}

                      </span>

                    ),
                  )}

                  {editingProjectId ===
                    portfolioProject.id && (

                    <div className="flex items-center gap-2">

                      <input
                        type="text"
                        value={newTechnology}
                        onChange={(event) =>
                          setNewTechnology(
                            event.target.value,
                          )
                        }
                        onKeyDown={(event) => {

                          if (
                            event.key ===
                            "Enter"
                          ) {

                            event.preventDefault();

                            addTechnology(
                              portfolioProject.id,
                            );

                          }

                        }}
                        placeholder={
                          translations[language].newTag
                        }
                        className={`h-8 w-32 rounded-full border px-3 text-xs outline-none transition-colors ${
                          cyberMode
                            ? "border-[#00ff66]/20 bg-[#050805] text-[#eafff0] placeholder:text-[#00ff66]/25 focus:border-[#00ff66]"
                            : "border-black/10 bg-white focus:border-black"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addTechnology(
                            portfolioProject.id,
                          )
                        }
                        className={`flex h-8 items-center gap-1 rounded-full px-3 text-xs transition-colors ${
                          cyberMode
                            ? "bg-[#00ff66] text-black"
                            : "bg-black text-white"
                        }`}
                      >

                        <Plus
                          size={13}
                          strokeWidth={1.8}
                        />

                        {translations[language].add}

                      </button>

                    </div>

                  )}

                </div>

                {/* TIPO / ESTADO */}

                <div className="mt-5 flex flex-wrap items-center gap-2">

                  {editingProjectId ===
                  portfolioProject.id ? (

                    <>

                      <select
                        value={
                          portfolioProject.type
                        }
                        onChange={(event) =>
                          updateProject(
                            portfolioProject.id,
                            {
                              type:
                                event.target.value,
                            },
                          )
                        }
                        className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] outline-none transition-colors ${
                          cyberMode
                            ? "border-[#00ff66]/20 bg-[#050805] text-[#eafff0]"
                            : "border-black/10 bg-white"
                        }`}
                      >

                        <option>
                          Proyecto personal
                        </option>

                        <option>
                          Proyecto académico
                        </option>

                        <option>
                          Proyecto profesional
                        </option>

                      </select>

                      <select
                        value={
                          portfolioProject.status
                        }
                        onChange={(event) =>
                          updateProject(
                            portfolioProject.id,
                            {
                              status:
                                event.target.value,
                            },
                          )
                        }
                        className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] outline-none transition-colors ${
                          cyberMode
                            ? "border-[#00ff66]/20 bg-[#050805] text-[#eafff0]"
                            : "border-black/10 bg-white"
                        }`}
                      >

                        <option>
                          Completado
                        </option>

                        <option>
                          En progreso
                        </option>

                        <option>
                          Planificado
                        </option>

                      </select>

                    </>

                  ) : (

                    <>

                      <span
                        className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-700 ${
                          cyberMode
                            ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/50"
                            : "border-black/10 bg-white text-black/45"
                        }`}
                      >
                        {
                          portfolioProject.type ===
                          "Proyecto personal"
                            ? translations[
                                language
                              ].personalProject
                            : portfolioProject.type ===
                                "Proyecto académico"
                              ? translations[
                                  language
                                ].academicProject
                              : translations[
                                  language
                                ].professionalProject
                        }
                      </span>

                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-700 ${
                          cyberMode
                            ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/50"
                            : "border-black/10 bg-white text-black/45"
                        }`}
                      >

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            cyberMode
                              ? "bg-[#00ff66]"
                              : "bg-black/30"
                          }`}
                        />

                        {
                          portfolioProject.status ===
                          "Completado"
                            ? translations[language]
                                .completed
                            : portfolioProject.status ===
                                "En progreso"
                              ? translations[
                                  language
                                ].inProgress
                              : translations[
                                  language
                                ].planned
                        }

                      </span>

                    </>

                  )}

                </div>

              </div>

            </article>

          </section>

        )}

        {/* =====================================================
            02 / PROYECTOS
        ===================================================== */}

        <section>

          <div className="mb-7">

            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-700 ${
                cyberMode
                  ? "text-[#00ff66]/40"
                  : "text-black/30"
              }`}
            >
              02 / {translations[language].projects}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {translations[language].selectedProjects}
            </h2>

          </div>

          <div className="space-y-10">

            {regularProjects.map(
              (project, index) => {

                const isEditing =
                  editingProjectId ===
                  project.id;

                return (

                  <article
                    key={project.id}
                    className="overflow-hidden rounded-[2rem]"
                  >

                    {/* IMAGEN */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProjectClick(
                          project.id,
                        )
                      }
                      className={`group relative block aspect-[16/10] w-full overflow-hidden rounded-[2rem] text-left transition-colors duration-700 ${
                        cyberMode
                          ? "bg-[#0a120d] ring-1 ring-[#00ff66]/10"
                          : "bg-[#F3F4F6]"
                      }`}
                      aria-label={`${translations[language].changeImage} ${project.title}`}
                    >

                      <img
                        src={
                          project.image ??
                          "/images/gif.gif"
                        }
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                      />

                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                          cyberMode
                            ? "bg-[#00ff66]/0 group-hover:bg-[#00ff66]/10"
                            : "bg-black/0 group-hover:bg-black/30"
                        }`}
                      >

                        <div
                          className={`flex translate-y-2 items-center gap-2 rounded-full px-5 py-3 text-xs font-medium opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
                            cyberMode
                              ? "bg-[#00ff66] text-black"
                              : "bg-white text-black"
                          }`}
                        >

                          <Upload
                            size={16}
                            strokeWidth={1.7}
                          />

                          {translations[language].changeImage}

                        </div>

                      </div>

                    </button>

                    {/* INFORMACIÓN */}

                    <div className="mt-7">

                      <div className="flex items-start justify-between gap-6">

                        <div className="min-w-0 flex-1">

                          {isEditing ? (

                            <input
                              type="text"
                              value={
                                project.title
                              }
                              onChange={(event) =>
                                updateProject(
                                  project.id,
                                  {
                                    title:
                                      event.target
                                        .value,
                                  },
                                )
                              }
                              className={`w-full border-b bg-transparent pb-2 text-3xl font-semibold tracking-tight outline-none transition-colors sm:text-4xl ${
                                cyberMode
                                  ? "border-[#00ff66]/20 focus:border-[#00ff66]"
                                  : "border-black/10 focus:border-black"
                              }`}
                            />

                          ) : (

                            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                              {
                                projectTranslations[
                                  language
                                ][
                                  project.id as
                                    1 | 2
                                ]?.title ??
                                project.title
                              }
                            </h2>

                          )}

                        </div>

                        {/* EDITAR */}

                        <button
                          type="button"
                          onClick={() =>
                            setEditingProjectId(
                              isEditing
                                ? null
                                : project.id,
                            )
                          }
                          className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-300 ${
                            isEditing
                              ? cyberMode
                                ? "border-[#00ff66] bg-[#00ff66] text-black"
                                : "border-black bg-black text-white"
                              : cyberMode
                                ? "border-[#00ff66]/20 hover:border-[#00ff66] hover:bg-[#00ff66] hover:text-black"
                                : "border-black/10 hover:border-black hover:bg-[#F3F4F6]"
                          }`}
                        >

                          {isEditing ? (
                            <>
                              <Check
                                size={15}
                                strokeWidth={
                                  1.7
                                }
                              />

                              {translations[language].save}
                            </>
                          ) : (
                            <>
                              <Pencil
                                size={15}
                                strokeWidth={
                                  1.7
                                }
                              />

                              {translations[language].edit}
                            </>
                          )}

                        </button>

                      </div>

                      {/* DESCRIPCIÓN */}

                      <div className="mt-4">

                        {isEditing ? (

                          <textarea
                            value={
                              project.description
                            }
                            onChange={(event) =>
                              updateProject(
                                project.id,
                                {
                                  description:
                                    event.target
                                      .value,
                                },
                              )
                            }
                            rows={3}
                            className={`w-full resize-none rounded-2xl border p-4 text-sm leading-6 outline-none transition-colors ${
                              cyberMode
                                ? "border-[#00ff66]/15 bg-[#0a120d] text-[#eafff0] focus:border-[#00ff66]"
                                : "border-black/10 bg-[#F3F4F6] focus:border-black"
                            }`}
                          />

                        ) : (

                          <p
                            className={`max-w-3xl text-sm leading-6 transition-colors duration-700 ${
                              cyberMode
                                ? "text-[#eafff0]/50"
                                : "text-black/50"
                            }`}
                          >
                            {
                              projectTranslations[
                                language
                              ][
                                project.id as
                                  1 | 2
                              ]?.description ??
                              project.description
                            }
                          </p>

                        )}

                      </div>

                      {/* TECNOLOGÍAS */}

                      <div className="mt-6 flex flex-wrap items-center gap-2">

                        {project.technologies.map(
                          (technology) => (

                            <span
                              key={technology}
                              className={`group/tag inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-700 ${
                                cyberMode
                                  ? "bg-[#111c14] text-[#00ff66]/55"
                                  : "bg-[#F3F4F6] text-black/45"
                              }`}
                            >

                              {technology}

                              {isEditing && (

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeTechnology(
                                      project.id,
                                      technology,
                                    )
                                  }
                                  className={`transition-colors ${
                                    cyberMode
                                      ? "text-[#00ff66]/30 hover:text-[#00ff66]"
                                      : "text-black/30 hover:text-black"
                                  }`}
                                  aria-label={`${translations[language].deleteTechnology} ${technology}`}
                                >

                                  <X
                                    size={13}
                                    strokeWidth={2}
                                  />

                                </button>

                              )}

                            </span>

                          ),
                        )}

                        {isEditing && (

                          <div className="flex items-center gap-2">

                            <input
                              type="text"
                              value={
                                newTechnology
                              }
                              onChange={(event) =>
                                setNewTechnology(
                                  event.target
                                    .value,
                                )
                              }
                              onKeyDown={(event) => {

                                if (
                                  event.key ===
                                  "Enter"
                                ) {

                                  event.preventDefault();

                                  addTechnology(
                                    project.id,
                                  );

                                }

                              }}
                              placeholder={
                                translations[language].newTag
                              }
                              className={`h-8 w-32 rounded-full border px-3 text-xs outline-none transition-colors ${
                                cyberMode
                                  ? "border-[#00ff66]/20 bg-[#050805] text-[#eafff0] placeholder:text-[#00ff66]/25 focus:border-[#00ff66]"
                                  : "border-black/10 bg-white focus:border-black"
                              }`}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                addTechnology(
                                  project.id,
                                )
                              }
                              className={`flex h-8 items-center gap-1 rounded-full px-3 text-xs ${
                                cyberMode
                                  ? "bg-[#00ff66] text-black"
                                  : "bg-black text-white"
                              }`}
                            >

                              <Plus
                                size={13}
                                strokeWidth={1.8}
                              />

                              {translations[language].add}

                            </button>

                          </div>

                        )}

                      </div>

                      {/* TIPO / ESTADO */}

                      <div className="mt-5 flex flex-wrap items-center gap-2">

                        {isEditing ? (

                          <>

                            <select
                              value={
                                project.type
                              }
                              onChange={(event) =>
                                updateProject(
                                  project.id,
                                  {
                                    type:
                                      event.target
                                        .value,
                                  },
                                )
                              }
                              className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] outline-none transition-colors ${
                                cyberMode
                                  ? "border-[#00ff66]/20 bg-[#050805] text-[#eafff0]"
                                  : "border-black/10 bg-white"
                              }`}
                            >

                              <option>
                                Proyecto personal
                              </option>

                              <option>
                                Proyecto académico
                              </option>

                              <option>
                                Proyecto profesional
                              </option>

                            </select>

                            <select
                              value={
                                project.status
                              }
                              onChange={(event) =>
                                updateProject(
                                  project.id,
                                  {
                                    status:
                                      event.target
                                        .value,
                                  },
                                )
                              }
                              className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] outline-none transition-colors ${
                                cyberMode
                                  ? "border-[#00ff66]/20 bg-[#050805] text-[#eafff0]"
                                  : "border-black/10 bg-white"
                              }`}
                            >

                              <option>
                                Completado
                              </option>

                              <option>
                                En progreso
                              </option>

                              <option>
                                Planificado
                              </option>

                            </select>

                          </>

                        ) : (

                          <>

                            <span
                              className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-700 ${
                                cyberMode
                                  ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/50"
                                  : "border-black/10 text-black/45"
                              }`}
                            >
                              {
                                project.type ===
                                "Proyecto personal"
                                  ? translations[
                                      language
                                    ].personalProject
                                  : project.type ===
                                      "Proyecto académico"
                                    ? translations[
                                        language
                                      ].academicProject
                                    : translations[
                                        language
                                      ].professionalProject
                              }
                            </span>

                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-700 ${
                                cyberMode
                                  ? "border-[#00ff66]/15 bg-[#0a120d] text-[#00ff66]/50"
                                  : "border-black/10 text-black/45"
                              }`}
                            >

                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  cyberMode
                                    ? "bg-[#00ff66]"
                                    : project.status ===
                                        "Completado"
                                      ? "bg-black"
                                      : "bg-black/30"
                                }`}
                              />

                              {
                                project.status ===
                                "Completado"
                                  ? translations[
                                      language
                                    ].completed
                                  : project.status ===
                                      "En progreso"
                                    ? translations[
                                        language
                                      ].inProgress
                                    : translations[
                                        language
                                      ].planned
                              }

                            </span>

                          </>

                        )}

                      </div>

                      {/* CONTROLES */}

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              moveProject(
                                project.id,
                                "up",
                              )
                            }
                            disabled={
                              index === 0
                            }
                            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-25 ${
                              cyberMode
                                ? "border-[#00ff66]/20 hover:border-[#00ff66] hover:bg-[#0a120d]"
                                : "border-black/10 hover:border-black hover:bg-[#F3F4F6]"
                            }`}
                          >

                            <ArrowUp
                              size={14}
                              strokeWidth={1.7}
                            />

                            {translations[language].moveUp}

                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              moveProject(
                                project.id,
                                "down",
                              )
                            }
                            disabled={
                              index ===
                              regularProjects.length - 1
                            }
                            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-25 ${
                              cyberMode
                                ? "border-[#00ff66]/20 hover:border-[#00ff66] hover:bg-[#0a120d]"
                                : "border-black/10 hover:border-black hover:bg-[#F3F4F6]"
                            }`}
                          >

                            <ArrowDown
                              size={14}
                              strokeWidth={1.7}
                            />

                            {translations[language].moveDown}

                          </button>

                        </div>

                        {/* PAPELERA */}

                        {isEditing && (

                          <button
                            type="button"
                            onClick={() =>
                              deleteProject(
                                project.id,
                              )
                            }
                            className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-xs font-medium text-red-500 transition-all hover:border-red-500 hover:bg-red-50"
                          >

                            <Trash2
                              size={14}
                              strokeWidth={1.7}
                            />

                            {translations[language].deleteProject}

                          </button>

                        )}

                      </div>

                    </div>

                  </article>

                );
              },
            )}

          </div>

        </section>

        {/* =====================================================
            AÑADIR PROYECTO
        ===================================================== */}

        <button
          type="button"
          onClick={addProject}
          className={`group mt-14 flex w-full items-center justify-between rounded-[2rem] border border-dashed p-7 text-left transition-all duration-300 sm:p-9 ${
            cyberMode
              ? "border-[#00ff66]/20 hover:border-[#00ff66] hover:bg-[#0a120d]"
              : "border-black/15 hover:border-black hover:bg-[#F3F4F6]"
          }`}
        >

          <div>

            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-700 ${
                cyberMode
                  ? "text-[#00ff66]/40"
                  : "text-black/30"
              }`}
            >
              {translations[language].portfolio}
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-tight">
              {translations[language].addProject}
            </h3>

            <p
              className={`mt-2 text-sm transition-colors duration-700 ${
                cyberMode
                  ? "text-[#eafff0]/40"
                  : "text-black/45"
              }`}
            >
              {translations[language].addProjectDescription}
            </p>

          </div>

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105 ${
              cyberMode
                ? "bg-[#00ff66] text-black"
                : "bg-black text-white"
            }`}
          >

            <Plus
              size={20}
              strokeWidth={1.7}
            />

          </div>

        </button>

      </div>

    </section>
  );
}