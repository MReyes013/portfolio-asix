import {
  ArrowUpRight,
  Brain,
  Code2,
  GraduationCap,
  Languages,
  Terminal,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const defaultAvatar = "/images/Foto-carnet.jpg";

type AboutSection = "formacion" | "idiomas" | null;

type Language = {
  name: string;
  level: string;
};

const sidebarTranslations = {
  ES: {
    available: "Disponible para trabajar",
    heroTitle: "Aprender. Construir. Romper. Proteger.",
    heroDescription: "",
    profile: "Perfil",
    aboutMe: "About Me",
    aboutDescription: "Conoce un poco más sobre mí.",
    changeProfilePhoto: "Cambiar foto de perfil",
    aboutHeaderDescription:
      "Técnico superior de ASIX, apasionado por los sistemas, las redes y la tecnología.",
    closeAbout: "Cerrar About Me",
    languagesTitle: "Idiomas",
    communication: "Comunicación",
    level: "Nivel",
    cyberMode: "Dark Mode",
    cyberModeActive: "Modo oscuro",

    cyberTerminal: [
      "> INICIALIZANDO SISTEMA...",
      "> CARGANDO PERFIL...",
      "> SISTEMAS ........ [OK]",
      "> REDES ........... [OK]",
      "> SEGURIDAD ....... [ACTIVE]",
      "> ACCESO CONCEDIDO_",
    ],

    sections: {
      formacion: {
        title: "Quién soy",
        description:
          "Mi historia, mi camino profesional y mis competencias.",
      },

      idiomas: {
        title: "Idiomas",
        description:
          "Idiomas que utilizo en mi comunicación diaria.",
      },
    },

    about: {
      formacion: {
        label: "Quién soy",

        headline:
          "Inquieto por naturaleza. Persistente por convicción. Apasionado por la ciberseguridad.",

        intro:
          "Mi camino comenzó en la electricidad y evolucionó hacia los sistemas, las redes y la ciberseguridad.",

        paradigm: {
          label: "Paradigma",
          title: "Autonomía con propósito.",

          description:
            "Creo en construir mi propio camino, aprendiendo, cuestionando y buscando mis propias respuestas. Para mí, el éxito no reside únicamente en alcanzar metas, sino en tener la libertad de elegir mi rumbo, compartir tiempo con quienes importan y avanzar sin perder mis valores ni la persona que quiero ser.",

          success: "Éxito = libertad",

          values: [
            "Libertad financiera",
            "Tiempo",
            "Familia",
            "Aprendizaje",
          ],
        },

        competencies: {
          label: "Competencias",
          title: "Hard Skills + Soft Skills",

          hardSkills: "Hard Skills",
          softSkills: "Soft Skills",

          hard: [
            "Linux",
            "Redes",
            "TCP/IP",
            "Servidores",
            "SSH",
            "Infraestructura",
            "Sistemas",
          ],

          soft: [
            "Aprendizaje continuo",
            "Resolución de problemas",
            "Trabajo en equipo",
            "Adaptabilidad",
            "Comunicación",
            "Organización",
          ],
        },
      },
    },

    languageNames: [
      {
        name: "Español",
        level: "Nativo",
      },
      {
        name: "Catalán",
        level: "Nativo",
      },
      {
        name: "Inglés",
        level: "B2 Intermedio",
      },
    ],
  },

  EN: {
    available: "Available for work",
    heroTitle: "Learn. Build. Break. Protect.",
    heroDescription: "",
    profile: "Profile",
    aboutMe: "About Me",
    aboutDescription: "Discover more about me.",
    changeProfilePhoto: "Change profile photo",
    aboutHeaderDescription:
      "Higher Technician in Computer Network System Management, passionate about systems, networks and technology.",
    closeAbout: "Close About Me",
    languagesTitle: "Languages",
    communication: "Communication",
    level: "Level",
    cyberMode: "Cyber Mode",
    cyberModeActive: "Cyber Mode active",

    cyberTerminal: [
      "> INITIALIZING SYSTEM...",
      "> LOADING PROFILE...",
      "> SYSTEMS .......... [OK]",
      "> NETWORK .......... [OK]",
      "> SECURITY ......... [ACTIVE]",
      "> ACCESS GRANTED_",
    ],

    sections: {
      formacion: {
        title: "Who I am",
        description:
          "My story, professional journey and skills.",
      },

      idiomas: {
        title: "Languages",
        description:
          "Languages I use in my daily communication.",
      },
    },

    about: {
      formacion: {
        label: "Who I am",

        headline:
          "Restless by nature. Persistent by conviction. Passionate about cybersecurity.",

        intro:
          "My journey started in electrical studies and evolved towards systems, networking and cybersecurity.",

        paradigm: {
          label: "Paradigm",
          title: "Autonomy with purpose.",

          description:
            "I believe in forging my own path, learning, questioning and seeking my own answers. For me, success lies not only in achieving goals, but in having the freedom to choose my own direction, spending time with those who matter and moving forward without losing sight of my values or the person I want to be.",

          success: "Success = freedom",

          values: [
            "Financial freedom",
            "Time",
            "Family",
            "Learning",
          ],
        },

        competencies: {
          label: "Skills",
          title: "Hard Skills + Soft Skills",

          hardSkills: "Hard Skills",
          softSkills: "Soft Skills",

          hard: [
            "Linux",
            "Networks",
            "TCP/IP",
            "Servers",
            "SSH",
            "Infrastructure",
            "Systems",
          ],

          soft: [
            "Continuous learning",
            "Problem solving",
            "Teamwork",
            "Adaptability",
            "Communication",
            "Organization",
          ],
        },
      },
    },

    languageNames: [
      {
        name: "Spanish",
        level: "Native",
      },
      {
        name: "Catalan",
        level: "Native",
      },
      {
        name: "English",
        level: "B2 Intermediate",
      },
    ],
  },
} as const;

function AboutCard({
  number,
  title,
  description,
  icon,
  active,
  onClick,
  cyberMode,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  cyberMode: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-h-[170px] rounded-[1.5rem] p-6 text-left transition-all duration-300 ${
        active
          ? cyberMode
            ? "border border-[#00ff66]/20 bg-[#07140b] text-[#b7ffc9]"
            : "bg-black text-white"
          : cyberMode
            ? "border border-[#00ff66]/10 bg-[#07100a] text-[#d9ffe3] hover:bg-[#0a1a0e]"
            : "bg-[#F3F4F6] text-black hover:bg-[#E9EAEC]"
      }`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`text-xs font-medium tracking-[0.18em] ${
            active
              ? cyberMode
                ? "text-[#00ff66]/40"
                : "text-white/50"
              : cyberMode
                ? "text-[#00ff66]/30"
                : "text-black/35"
          }`}
        >
          {number}
        </span>

        <div
          className={`transition-all duration-300 ${
            active
              ? "translate-x-0 opacity-100"
              : "translate-x-1 opacity-70 group-hover:translate-x-0 group-hover:opacity-100"
          }`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold tracking-tight">
          {title}
        </h3>

        <p
          className={`mt-2 text-sm leading-5 ${
            active
              ? cyberMode
                ? "text-[#b7ffc9]/60"
                : "text-white/60"
              : cyberMode
                ? "text-[#d9ffe3]/50"
                : "text-black/50"
          }`}
        >
          {description}
        </p>
      </div>

      <div
        className={`absolute bottom-0 left-6 right-6 h-[2px] rounded-full transition-all duration-300 ${
          active
            ? cyberMode
              ? "bg-[#00ff66] shadow-[0_0_12px_rgba(0,255,102,0.7)]"
              : "bg-white"
            : "bg-transparent"
        }`}
      />
    </button>
  );
}

function CyberTerminal({
  language,
}: {
  language: "ES" | "EN";
}) {
  const lines = sidebarTranslations[language].cyberTerminal;

  const [visibleLines, setVisibleLines] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setVisibleLines(1);
    setTypedText("");
    setLineIndex(0);
    setCharIndex(0);
  }, [language]);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const restartTimer = window.setTimeout(() => {
        setVisibleLines(1);
        setLineIndex(0);
        setCharIndex(0);
        setTypedText("");
      }, 2800);

      return () => window.clearTimeout(restartTimer);
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timer = window.setTimeout(() => {
        setTypedText((previous) => previous + currentLine[charIndex]);
        setCharIndex((previous) => previous + 1);
      }, 32);

      return () => window.clearTimeout(timer);
    }

    const nextLineTimer = window.setTimeout(() => {
      setVisibleLines((previous) =>
        Math.min(previous + 1, lines.length),
      );

      setLineIndex((previous) => previous + 1);
      setCharIndex(0);
      setTypedText("");
    }, 420);

    return () => window.clearTimeout(nextLineTimer);
  }, [charIndex, lineIndex, lines]);

  return (
    <div className="relative mt-7 overflow-hidden rounded-[1.25rem] border border-[#00ff66]/10 bg-black/80 p-4 font-mono text-[10px] leading-6 shadow-[0_0_35px_rgba(0,255,102,0.04)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,102,0.025)_50%)] bg-[length:100%_4px]" />

      <div className="relative">
        <div className="mb-3 flex items-center gap-2 border-b border-[#00ff66]/10 pb-3">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-[#00ff66]/80 shadow-[0_0_8px_rgba(0,255,102,0.7)]" />

          <span className="ml-2 text-[#00ff66]/25">
            terminal://portfolio
          </span>
        </div>

        <div className="min-h-[150px]">
          {lines.map((line, index) => {
            if (index >= visibleLines) {
              return null;
            }

            const isCurrent = index === lineIndex;

            return (
              <div
                key={`${line}-${index}`}
                className={`transition-opacity duration-300 ${
                  index < lineIndex
                    ? "text-[#00ff66]/35"
                    : "text-[#00ff66]/75"
                }`}
              >
                {isCurrent ? typedText : line}

                {isCurrent && (
                  <span className="ml-0.5 inline-block animate-pulse text-[#00ff66]">
                    ▮
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AboutExperience({
  section,
  language,
  cyberMode,
}: {
  section: Exclude<AboutSection, null>;
  language: "ES" | "EN";
  cyberMode: boolean;
}) {
  const t = sidebarTranslations[language];

  if (section === "formacion") {
    return (
      <div className="animate-[fadeIn_400ms_ease-out]">
        <div
          className={`rounded-[1.5rem] p-7 sm:p-9 ${
            cyberMode
              ? "border border-[#00ff66]/10 bg-[#030804] text-[#eafff0]"
              : "bg-black text-white"
          }`}
        >
          <p
            className={`text-xs font-medium uppercase tracking-[0.2em] ${
              cyberMode
                ? "text-[#00ff66]/40"
                : "text-white/35"
            }`}
          >
            {t.about.formacion.label}
          </p>

          <h3 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
            {t.about.formacion.headline}
          </h3>

          <p
            className={`mt-6 max-w-4xl text-sm leading-7 sm:text-base ${
              cyberMode
                ? "text-[#d9ffe3]/55"
                : "text-white/55"
            }`}
          >
            {t.about.formacion.intro}
          </p>

          {cyberMode && (
            <CyberTerminal language={language} />
          )}
        </div>

        <div
          className={`group relative mt-4 overflow-hidden rounded-[1.5rem] p-7 sm:p-8 ${
            cyberMode
              ? "border border-[#00ff66]/10 bg-[#030804] text-[#eafff0]"
              : "bg-black text-white"
          }`}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-110" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full border border-white/5 transition-transform duration-700 group-hover:scale-105" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    cyberMode
                      ? "text-[#00ff66]/40"
                      : "text-white/35"
                  }`}
                >
                  02 — {t.about.formacion.paradigm.label}
                </p>

                <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
                  {t.about.formacion.paradigm.title}
                </h3>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                  cyberMode
                    ? "border-[#00ff66]/15 bg-[#00ff66]/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <Brain
                  size={19}
                  strokeWidth={1.5}
                  className={`transition-transform duration-500 group-hover:scale-110 ${
                    cyberMode
                      ? "text-[#00ff66]/60"
                      : "text-white/55"
                  }`}
                />
              </div>
            </div>

            <div
              className={`relative mt-10 overflow-hidden rounded-[1.25rem] border p-6 sm:p-7 ${
                cyberMode
                  ? "border-[#00ff66]/10 bg-[#00ff66]/[0.03]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      cyberMode
                        ? "text-[#00ff66]/30"
                        : "text-white/30"
                    }`}
                  >
                    {language === "ES"
                      ? "Mi forma de verlo"
                      : "The way I see it"}
                  </span>

                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
                      cyberMode
                        ? "text-[#00ff66]/20"
                        : "text-white/20"
                    }`}
                  >
                    01
                  </span>
                </div>

                <div>
                  <p className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                    {language === "ES"
                      ? "LIBERTAD"
                      : "FREEDOM"}
                  </p>

                  <div
                    className={`mt-4 h-px w-full ${
                      cyberMode
                        ? "bg-[#00ff66]/10"
                        : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`h-px w-1/3 transition-all duration-700 group-hover:w-2/3 ${
                        cyberMode
                          ? "bg-[#00ff66]"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-4">
                  {t.about.formacion.paradigm.values.map(
                    (value, index) => (
                      <div
                        key={value}
                        className={`group/value rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 ${
                          cyberMode
                            ? "border-[#00ff66]/10 bg-[#00ff66]/[0.02] hover:border-[#00ff66]/20 hover:bg-[#00ff66]/[0.05]"
                            : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.07]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={`text-[9px] font-semibold tracking-[0.15em] ${
                              cyberMode
                                ? "text-[#00ff66]/25"
                                : "text-white/25"
                            }`}
                          >
                            0{index + 1}
                          </span>

                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover/value:scale-150 ${
                              cyberMode
                                ? "bg-[#00ff66]/50"
                                : "bg-white/30"
                            }`}
                          />
                        </div>

                        <p
                          className={`mt-7 text-xs font-medium leading-5 ${
                            cyberMode
                              ? "text-[#d9ffe3]/65"
                              : "text-white/65"
                          }`}
                        >
                          {value}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <p
              className={`mt-7 max-w-4xl text-sm leading-7 sm:text-base ${
                cyberMode
                  ? "text-[#d9ffe3]/55"
                  : "text-white/55"
              }`}
            >
              {t.about.formacion.paradigm.description}
            </p>

            <div
              className={`mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${
                cyberMode
                  ? "border-[#00ff66]/10"
                  : "border-white/10"
              }`}
            >
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  cyberMode
                    ? "text-[#00ff66]/30"
                    : "text-white/30"
                }`}
              >
                {language === "ES"
                  ? "Mi definición de éxito"
                  : "My definition of success"}
              </span>

              <span
                className={`text-sm font-semibold ${
                  cyberMode
                    ? "text-[#00ff66]"
                    : "text-white"
                }`}
              >
                {t.about.formacion.paradigm.success}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-4 flex items-end justify-between gap-5">
            <div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  cyberMode
                    ? "text-[#00ff66]/35"
                    : "text-black/30"
                }`}
              >
                03 — {t.about.formacion.competencies.label}
              </p>

              <h3
                className={`mt-2 text-2xl font-semibold tracking-tight ${
                  cyberMode
                    ? "text-[#eafff0]"
                    : "text-black"
                }`}
              >
                {t.about.formacion.competencies.title}
              </h3>
            </div>

            <Code2
              size={22}
              strokeWidth={1.5}
              className={
                cyberMode
                  ? "text-[#00ff66]/30"
                  : "text-black/20"
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div
              className={`rounded-[1.5rem] p-7 transition-transform duration-300 hover:-translate-y-1 ${
                cyberMode
                  ? "border border-[#00ff66]/10 bg-[#030804] text-[#eafff0]"
                  : "bg-black text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    cyberMode
                      ? "bg-[#00ff66]/5"
                      : "bg-white/10"
                  }`}
                >
                  <Code2
                    size={18}
                    strokeWidth={1.6}
                    className={
                      cyberMode
                        ? "text-[#00ff66]"
                        : undefined
                    }
                  />
                </div>

                <div>
                  <p
                    className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
                      cyberMode
                        ? "text-[#00ff66]/35"
                        : "text-white/35"
                    }`}
                  >
                    Technical
                  </p>

                  <h4 className="mt-1 font-semibold">
                    {t.about.formacion.competencies.hardSkills}
                  </h4>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {t.about.formacion.competencies.hard.map(
                  (skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border px-3 py-2 text-xs transition-colors duration-300 ${
                        cyberMode
                          ? "border-[#00ff66]/10 text-[#d9ffe3]/65 hover:border-[#00ff66]/30 hover:text-[#00ff66]"
                          : "border-white/10 text-white/65 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div
              className={`rounded-[1.5rem] p-7 transition-transform duration-300 hover:-translate-y-1 ${
                cyberMode
                  ? "border border-[#00ff66]/10 bg-[#07100a] text-[#eafff0]"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    cyberMode
                      ? "bg-[#00ff66]/5"
                      : "bg-[#F3F4F6]"
                  }`}
                >
                  <Brain
                    size={18}
                    strokeWidth={1.6}
                    className={
                      cyberMode
                        ? "text-[#00ff66]"
                        : undefined
                    }
                  />
                </div>

                <div>
                  <p
                    className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
                      cyberMode
                        ? "text-[#00ff66]/35"
                        : "text-black/25"
                    }`}
                  >
                    Personal
                  </p>

                  <h4 className="mt-1 font-semibold">
                    {t.about.formacion.competencies.softSkills}
                  </h4>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {t.about.formacion.competencies.soft.map(
                  (skill) => (
                    <span
                      key={skill}
                      className={`rounded-full px-3 py-2 text-xs transition-colors duration-300 ${
                        cyberMode
                          ? "bg-[#00ff66]/5 text-[#d9ffe3]/60 hover:bg-[#00ff66]/10 hover:text-[#00ff66]"
                          : "bg-[#F3F4F6] text-black/60 hover:bg-black hover:text-white"
                      }`}
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const languages: Language[] =
    sidebarTranslations[language].languageNames.map(
      ({ name, level }) => ({
        name,
        level,
      }),
    );

  return (
    <div className="animate-[fadeIn_400ms_ease-out]">
      <div className="mb-8">
        <p
          className={`text-xs font-medium uppercase tracking-[0.2em] ${
            cyberMode
              ? "text-[#00ff66]/35"
              : "text-black/35"
          }`}
        >
          {t.languagesTitle}
        </p>

        <h3
          className={`mt-4 max-w-3xl text-3xl font-semibold tracking-tight ${
            cyberMode
              ? "text-[#eafff0]"
              : "text-black"
          }`}
        >
          {t.communication}
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div
          className={`group relative overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1 ${
            cyberMode
              ? "border border-[#00ff66]/10 bg-[#030804] text-[#eafff0]"
              : "bg-black text-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <span
              className={`text-xs font-medium tracking-[0.18em] ${
                cyberMode
                  ? "text-[#00ff66]/35"
                  : "text-white/35"
              }`}
            >
              01
            </span>

            <Languages
              size={21}
              strokeWidth={1.5}
              className={`transition-transform duration-500 group-hover:rotate-6 ${
                cyberMode
                  ? "text-[#00ff66]/45"
                  : "text-white/40"
              }`}
            />
          </div>

          <div className="mt-16">
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                cyberMode
                  ? "text-[#00ff66]/35"
                  : "text-white/35"
              }`}
            >
              {languages[0].level}
            </p>

            <h4 className="mt-3 text-4xl font-semibold tracking-tight">
              {languages[0].name}
            </h4>

            <div className="mt-8 flex items-end justify-between">
              <span
                className={`text-xs ${
                  cyberMode
                    ? "text-[#d9ffe3]/35"
                    : "text-white/35"
                }`}
              >
                {t.level}
              </span>

              <span
                className={`text-sm font-semibold ${
                  cyberMode
                    ? "text-[#00ff66]/70"
                    : "text-white/70"
                }`}
              >
                100%
              </span>
            </div>

            <div
              className={`mt-3 h-1.5 overflow-hidden rounded-full ${
                cyberMode
                  ? "bg-[#00ff66]/10"
                  : "bg-white/10"
              }`}
            >
              <div
                className={`h-full w-full origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[0.97] ${
                  cyberMode
                    ? "bg-[#00ff66]"
                    : "bg-white"
                }`}
              />
            </div>
          </div>

          <div
            className={`pointer-events-none absolute -bottom-24 -right-16 h-52 w-52 rounded-full border transition-transform duration-700 group-hover:scale-110 ${
              cyberMode
                ? "border-[#00ff66]/10"
                : "border-white/10"
            }`}
          />
        </div>

        <div
          className={`group relative overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1 ${
            cyberMode
              ? "border border-[#00ff66]/10 bg-[#07100a] text-[#eafff0]"
              : "bg-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <span
              className={`text-xs font-medium tracking-[0.18em] ${
                cyberMode
                  ? "text-[#00ff66]/30"
                  : "text-black/25"
              }`}
            >
              02
            </span>

            <Languages
              size={20}
              strokeWidth={1.5}
              className={`transition-transform duration-500 group-hover:rotate-6 ${
                cyberMode
                  ? "text-[#00ff66]/35"
                  : "text-black/30"
              }`}
            />
          </div>

          <div className="mt-16">
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                cyberMode
                  ? "text-[#00ff66]/30"
                  : "text-black/30"
              }`}
            >
              {languages[1].level}
            </p>

            <h4 className="mt-3 text-4xl font-semibold tracking-tight">
              {languages[1].name}
            </h4>

            <div className="mt-8 flex items-end justify-between">
              <span
                className={`text-xs ${
                  cyberMode
                    ? "text-[#d9ffe3]/30"
                    : "text-black/30"
                }`}
              >
                {t.level}
              </span>

              <span
                className={`text-sm font-semibold ${
                  cyberMode
                    ? "text-[#00ff66]/60"
                    : "text-black/55"
                }`}
              >
                100%
              </span>
            </div>

            <div
              className={`mt-3 h-1.5 overflow-hidden rounded-full ${
                cyberMode
                  ? "bg-[#00ff66]/10"
                  : "bg-[#F3F4F6]"
              }`}
            >
              <div
                className={`h-full w-full origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[0.97] ${
                  cyberMode
                    ? "bg-[#00ff66]"
                    : "bg-black"
                }`}
              />
            </div>
          </div>

          <div
            className={`pointer-events-none absolute -bottom-24 -right-16 h-52 w-52 rounded-full border transition-transform duration-700 group-hover:scale-110 ${
              cyberMode
                ? "border-[#00ff66]/10"
                : "border-black/5"
            }`}
          />
        </div>

        <div
          className={`group relative overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1 md:col-span-2 ${
            cyberMode
              ? "border border-[#00ff66]/10 bg-[#0a160d] text-[#eafff0]"
              : "bg-[#E8EEF7]"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium tracking-[0.18em] ${
                  cyberMode
                    ? "text-[#00ff66]/30"
                    : "text-black/25"
                }`}
              >
                03
              </span>

              <span
                className={`h-1 w-1 rounded-full ${
                  cyberMode
                    ? "bg-[#00ff66]/30"
                    : "bg-black/20"
                }`}
              />

              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                  cyberMode
                    ? "bg-[#00ff66]/10 text-[#00ff66]/70"
                    : "bg-white text-black/55"
                }`}
              >
                B2
              </span>
            </div>

            <Languages
              size={20}
              strokeWidth={1.5}
              className={`transition-transform duration-500 group-hover:rotate-6 ${
                cyberMode
                  ? "text-[#00ff66]/35"
                  : "text-black/30"
              }`}
            />
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-end">
            <div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  cyberMode
                    ? "text-[#00ff66]/30"
                    : "text-black/30"
                }`}
              >
                {languages[2].level}
              </p>

              <h4 className="mt-3 text-4xl font-semibold tracking-tight">
                {languages[2].name}
              </h4>
            </div>

            <div>
              <div className="flex items-end justify-between">
                <span
                  className={`text-xs ${
                    cyberMode
                      ? "text-[#d9ffe3]/30"
                      : "text-black/30"
                  }`}
                >
                  {t.level}
                </span>

                <span
                  className={`text-sm font-semibold ${
                    cyberMode
                      ? "text-[#00ff66]/65"
                      : "text-black/55"
                  }`}
                >
                  B2
                </span>
              </div>

              <div className="mt-3 flex h-2 gap-1">
                <span
                  className={`flex-1 rounded-full ${
                    cyberMode
                      ? "bg-[#00ff66]"
                      : "bg-black"
                  }`}
                />
                <span
                  className={`flex-1 rounded-full ${
                    cyberMode
                      ? "bg-[#00ff66]"
                      : "bg-black"
                  }`}
                />
                <span
                  className={`flex-1 rounded-full ${
                    cyberMode
                      ? "bg-[#00ff66]"
                      : "bg-black"
                  }`}
                />
                <span
                  className={`flex-1 rounded-full ${
                    cyberMode
                      ? "bg-[#00ff66]/20"
                      : "bg-black/20"
                  }`}
                />
                <span
                  className={`flex-1 rounded-full ${
                    cyberMode
                      ? "bg-[#00ff66]/10"
                      : "bg-black/10"
                  }`}
                />
              </div>
            </div>
          </div>

          <div
            className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border transition-transform duration-700 group-hover:scale-110 ${
              cyberMode
                ? "border-[#00ff66]/10"
                : "border-black/5"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

type SidebarProps = {
  language: "ES" | "EN";
  cyberMode: boolean;
  setCyberMode: (value: boolean) => void;
};

export default function Sidebar({
  language,
  cyberMode,
  setCyberMode,
}: SidebarProps) {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [aboutOpen, setAboutOpen] = useState(false);

  const [activeSection, setActiveSection] =
    useState<AboutSection>("formacion");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setAvatar(imageUrl);
  };

  const openAbout = () => {
    setAboutOpen(true);
    setActiveSection("formacion");
  };

  const closeAbout = () => {
    setAboutOpen(false);
  };

  const sections = [
    {
      id: "formacion" as const,
      number: "01",
      title:
        sidebarTranslations[language].sections.formacion.title,
      description:
        sidebarTranslations[language].sections.formacion
          .description,
      icon: (
        <GraduationCap
          size={20}
          strokeWidth={1.6}
        />
      ),
    },

    {
      id: "idiomas" as const,
      number: "02",
      title:
        sidebarTranslations[language].sections.idiomas.title,
      description:
        sidebarTranslations[language].sections.idiomas
          .description,
      icon: (
        <Languages
          size={20}
          strokeWidth={1.6}
        />
      ),
    },
  ];

  return (
    <>
      <aside
        className={`flex min-h-full flex-col px-7 py-8 transition-colors duration-700 sm:px-10 lg:px-12 lg:py-10 ${
          cyberMode
            ? "bg-[#020602] text-[#eafff0]"
            : "bg-white text-black"
        }`}
      >
        {/* PERFIL */}
        <div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={handleAvatarClick}
              className={`group relative block shrink-0 ${
                cyberMode
                  ? "animate-[cyberPulse_3s_ease-in-out_infinite]"
                  : ""
              }`}
              aria-label={
                sidebarTranslations[language]
                  .changeProfilePhoto
              }
            >
              <img
                src={avatar}
                alt="Martin Reyes Sanhueza"
                className={`h-20 w-20 rounded-full object-cover transition-all duration-700 ${
                  cyberMode
                    ? "border border-[#00ff66]/30 grayscale-[20%] contrast-125"
                    : ""
                }`}
              />

              {cyberMode && (
                <>
                  <span className="pointer-events-none absolute inset-[-3px] rounded-full border border-[#00ff66]/20 animate-ping" />

                  <span className="pointer-events-none absolute inset-[-6px] rounded-full border border-[#00ff66]/10" />
                </>
              )}

              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Upload
                  size={19}
                  strokeWidth={1.7}
                  className="text-white"
                />
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="text-sm font-semibold tracking-tight">
                Martin Reyes Sanhueza
              </h1>

              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-medium transition-colors duration-500 ${
                  cyberMode
                    ? "border border-[#00ff66]/10 bg-[#00ff66]/5 text-[#00ff66]/70"
                    : "bg-[#F3F4F6] text-black/60"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
                      cyberMode
                        ? "bg-[#00ff66]"
                        : "bg-green-500"
                    }`}
                  />

                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      cyberMode
                        ? "bg-[#00ff66]"
                        : "bg-green-500"
                    }`}
                  />
                </span>

                {sidebarTranslations[language].available}
              </span>
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="mt-14">
          <h2
            className={`max-w-xl text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em] ${
              cyberMode
                ? "animate-[cyberFlicker_5s_ease-in-out_infinite]"
                : ""
            }`}
          >
            {sidebarTranslations[language].heroTitle}
          </h2>

          <p
            className={`mt-8 max-w-xl text-base leading-7 ${
              cyberMode
                ? "text-[#d9ffe3]/50"
                : "text-black/50"
            }`}
          >
            {sidebarTranslations[language].heroDescription}
          </p>
        </div>

        {/* ABOUT ME */}
        <div className="mt-12">
          <button
            type="button"
            onClick={openAbout}
            className={`group flex w-full items-center justify-between rounded-[1.5rem] p-6 text-left transition-all duration-500 ${
              cyberMode
                ? "border border-[#00ff66]/10 bg-[#07100a] text-[#eafff0] hover:bg-[#0a1a0e]"
                : "bg-[#F3F4F6] text-black hover:bg-black hover:text-white"
            }`}
          >
            <div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  cyberMode
                    ? "text-[#00ff66]/35 group-hover:text-[#00ff66]/50"
                    : "text-black/35 group-hover:text-white/40"
                }`}
              >
                {sidebarTranslations[language].profile}
              </p>

              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                {sidebarTranslations[language].aboutMe}
              </h3>

              <p
                className={`mt-2 text-sm transition-colors ${
                  cyberMode
                    ? "text-[#d9ffe3]/45 group-hover:text-[#d9ffe3]/60"
                    : "text-black/45 group-hover:text-white/50"
                }`}
              >
                {sidebarTranslations[language].aboutDescription}
              </p>
            </div>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1 ${
                cyberMode
                  ? "bg-[#00ff66]/10 text-[#00ff66]"
                  : "bg-white text-black"
              }`}
            >
              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
              />
            </div>
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {["LinkedIn", "Instagram", "X", "GitHub"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className={`text-xs transition-colors ${
                    cyberMode
                      ? "text-[#d9ffe3]/35 hover:text-[#00ff66]"
                      : "text-black/40 hover:text-black"
                  }`}
                >
                  {social}
                </a>
              ),
            )}
          </div>

          {/* CYBER MODE */}
          <button
            type="button"
            onClick={() => setCyberMode(!cyberMode)}
            className={`group relative mt-5 flex w-full items-center justify-between overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-500 ${
              cyberMode
                ? "border-[#00ff66]/30 bg-[#00ff66]/5 text-[#00ff66] hover:bg-[#00ff66]/10"
                : "border-black/5 bg-[#F3F4F6] text-black/55 hover:bg-black hover:text-white"
            }`}
          >
            {cyberMode && (
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(0,255,102,0.06),transparent)] animate-[cyberScan_2.5s_linear_infinite]" />
            )}

            <div className="relative flex items-center gap-3">
              <Terminal
                size={16}
                strokeWidth={1.7}
              />

              <span className="text-xs font-semibold tracking-tight">
                {cyberMode
                  ? sidebarTranslations[language]
                      .cyberModeActive
                  : sidebarTranslations[language].cyberMode}
              </span>
            </div>

            <span
              className={`relative h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                cyberMode
                  ? "bg-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.8)]"
                  : "bg-black/20"
              }`}
            />
          </button>
        </div>
      </aside>

      {/* ABOUT ME OVERLAY */}
      {aboutOpen && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-colors duration-500 sm:p-8 ${
            cyberMode
              ? "bg-black/75"
              : "bg-black/50"
          }`}
        >
          <div
            className={`relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] shadow-2xl transition-colors duration-700 ${
              cyberMode
                ? "border border-[#00ff66]/10 bg-[#020602] text-[#eafff0]"
                : "bg-white"
            }`}
          >
            {/* HEADER */}
            <div
              className={`flex shrink-0 items-start justify-between gap-8 border-b px-6 py-6 sm:px-8 sm:py-7 lg:px-10 ${
                cyberMode
                  ? "border-[#00ff66]/10"
                  : "border-black/5"
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      cyberMode
                        ? "text-[#00ff66]/40"
                        : "text-black/35"
                    }`}
                  >
                    {sidebarTranslations[language].profile}
                  </span>

                  <span
                    className={`h-1 w-1 rounded-full ${
                      cyberMode
                        ? "bg-[#00ff66]/30"
                        : "bg-black/20"
                    }`}
                  />

                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      cyberMode
                        ? "text-[#00ff66]/40"
                        : "text-black/35"
                    }`}
                  >
                    {sidebarTranslations[language].aboutMe}
                  </span>
                </div>

                <p
                  className={`mt-3 max-w-xl text-sm leading-6 ${
                    cyberMode
                      ? "text-[#d9ffe3]/45"
                      : "text-black/45"
                  }`}
                >
                  {
                    sidebarTranslations[language]
                      .aboutHeaderDescription
                  }
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    cyberMode
                      ? "text-[#00ff66]/25"
                      : "text-black/25"
                  }`}
                >
                  {activeSection === "formacion" &&
                    "01 / 02"}

                  {activeSection === "idiomas" &&
                    "02 / 02"}
                </span>

                <button
                  type="button"
                  onClick={closeAbout}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    cyberMode
                      ? "bg-[#00ff66]/5 text-[#00ff66] hover:bg-[#00ff66] hover:text-black"
                      : "bg-[#F3F4F6] hover:bg-black hover:text-white"
                  }`}
                  aria-label={
                    sidebarTranslations[language]
                      .closeAbout
                  }
                >
                  <X
                    size={18}
                    strokeWidth={1.7}
                  />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="grid gap-3 sm:grid-cols-2">
                {sections.map((section) => (
                  <AboutCard
                    key={section.id}
                    number={section.number}
                    title={section.title}
                    description={section.description}
                    icon={section.icon}
                    active={
                      activeSection === section.id
                    }
                    onClick={() =>
                      setActiveSection(section.id)
                    }
                    cyberMode={cyberMode}
                  />
                ))}
              </div>

              <div
                className={`mt-5 rounded-[1.75rem] p-5 sm:p-7 lg:p-8 ${
                  cyberMode
                    ? "border border-[#00ff66]/10 bg-[#07100a]"
                    : "bg-[#F3F4F6]"
                }`}
              >
                {activeSection && (
                  <AboutExperience
                    section={activeSection}
                    language={language}
                    cyberMode={cyberMode}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CYBER ANIMATIONS */}
      <style>
        {`
          @keyframes cyberPulse {
            0%, 100% {
              transform: scale(1);
              filter: brightness(1);
            }

            50% {
              transform: scale(1.015);
              filter: brightness(1.12);
            }
          }

          @keyframes cyberFlicker {
            0%, 100% {
              opacity: 1;
            }

            48% {
              opacity: 1;
            }

            49% {
              opacity: 0.82;
            }

            50% {
              opacity: 1;
            }

            72% {
              opacity: 1;
            }

            73% {
              opacity: 0.9;
            }

            74% {
              opacity: 1;
            }
          }

          @keyframes cyberScan {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(120%);
            }
          }
        `}
      </style>
    </>
  );
}