import {
  ArrowUpRight,
  Brain,
  Code2,
  GraduationCap,
  Languages,
  Leaf,
  FileText,
  Terminal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    cyberModeActive: "Restablecer",

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
    cyberMode: "Dark Mode",
    cyberModeActive: "Reset",

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
      className={`group relative flex min-h-[118px] items-center gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
        cyberMode
          ? active
            ? "border-[#00ff66]/30 bg-[#0a1b0e] text-[#eafff0]"
            : "border-[#00ff66]/10 bg-[#07100a] text-[#d9ffe3] hover:border-[#00ff66]/25"
          : active
            ? "border-blue-600 bg-[#10233f] text-white shadow-lg shadow-blue-950/10"
            : "border-black/[0.06] bg-white text-black hover:border-blue-200 hover:bg-blue-50/50"
      }`}
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
        cyberMode
          ? "bg-[#00ff66]/[0.08] text-[#00ff66]"
          : active
            ? "bg-white/10 text-white"
            : "bg-blue-50 text-blue-700"
      }`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-[10px] font-semibold tracking-[0.18em] ${
          cyberMode ? "text-[#00ff66]/45" : active ? "text-blue-200" : "text-black/35"
        }`}>{number} / 02</span>
        <span className="mt-1 block text-base font-semibold tracking-tight">{title}</span>
        <span className={`mt-1 block text-xs leading-5 ${
          cyberMode ? "text-[#d9ffe3]/50" : active ? "text-white/65" : "text-black/45"
        }`}>{description}</span>
      </span>
      <ArrowUpRight size={17} className={`shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
        cyberMode ? "text-[#00ff66]/55" : active ? "text-white/70" : "text-black/30"
      }`} />
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
      setVisibleLines((previous) => Math.min(previous + 1, lines.length));
      setLineIndex((previous) => previous + 1);
      setCharIndex(0);
      setTypedText("");
    }, 420);
    return () => window.clearTimeout(nextLineTimer);
  }, [charIndex, lineIndex, lines]);

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl border border-[#00ff66]/10 bg-black/80 p-4 font-mono text-[10px] leading-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,102,0.025)_50%)] bg-[length:100%_4px]" />
      <div className="relative">
        <div className="mb-3 flex items-center gap-2 border-b border-[#00ff66]/10 pb-3">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-[#00ff66]/80" />
          <span className="ml-2 text-[#00ff66]/35">terminal://portfolio</span>
        </div>
        <div className="min-h-[130px]">
          {lines.map((line, index) => {
            if (index >= visibleLines) return null;
            const isCurrent = index === lineIndex;
            return (
              <div key={`${line}-${index}`} className={index < lineIndex ? "text-[#00ff66]/35" : "text-[#00ff66]/75"}>
                {isCurrent ? typedText : line}
                {isCurrent && <span className="ml-0.5 animate-pulse text-[#00ff66]">▮</span>}
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
  const surface = cyberMode
    ? "border border-[#00ff66]/10 bg-[#07100a] text-[#eafff0]"
    : "border border-black/[0.06] bg-white text-[#151923]";
  const muted = cyberMode ? "text-[#d9ffe3]/60" : "text-slate-600";
  const eyebrow = cyberMode ? "text-[#00ff66]/55" : "text-blue-700";

  if (section === "formacion") {
    const hard = t.about.formacion.competencies.hard;
    const soft = t.about.formacion.competencies.soft;
    const values = t.about.formacion.paradigm.values;

    return (
      <div className="space-y-5 animate-[fadeIn_400ms_ease-out]">
        {/* Presentación */}
        <section className={`relative overflow-hidden rounded-[1.6rem] p-7 sm:p-9 ${
          cyberMode
            ? "border border-[#00ff66]/15 bg-[#030b05] text-[#eafff0]"
            : "bg-[#10233f] text-white"
        }`}>
          {!cyberMode && (
            <>
              <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
            </>
          )}
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : "bg-white/10 text-blue-100"
              }`}>{t.about.formacion.label}</span>
              <span className={`text-[10px] font-medium uppercase tracking-[0.15em] ${
                cyberMode ? "text-[#00ff66]/35" : "text-white/45"
              }`}>ASIX · Systems · Networks · Cybersecurity</span>
            </div>
            <h3 className="mt-6 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.8rem]">
              {t.about.formacion.headline}
            </h3>
            <p className={`mt-5 max-w-3xl text-sm leading-7 sm:text-base ${
              cyberMode ? "text-[#d9ffe3]/65" : "text-blue-50/75"
            }`}>{t.about.formacion.intro}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {(language === "ES"
                ? ["Sistemas", "Redes", "Resolución de problemas", "Ciberseguridad"]
                : ["Systems", "Networking", "Problem solving", "Cybersecurity"]
              ).map((item) => (
                <span key={item} className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                  cyberMode ? "border-[#00ff66]/15 bg-[#00ff66]/[0.04] text-[#d9ffe3]/70" : "border-white/15 bg-white/[0.06] text-white/80"
                }`}>{item}</span>
              ))}
            </div>
            {cyberMode && <CyberTerminal language={language} />}
          </div>
        </section>

        {/* Enfoque personal */}
        <section className={`overflow-hidden rounded-[1.6rem] p-6 sm:p-8 ${surface}`}>
          <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${eyebrow}`}>
                02 — {t.about.formacion.paradigm.label}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {t.about.formacion.paradigm.title}
              </h3>
              <p className={`mt-4 text-sm leading-7 ${muted}`}>
                {t.about.formacion.paradigm.description}
              </p>
              <div className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : "bg-blue-50 text-blue-800"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${cyberMode ? "bg-[#00ff66]" : "bg-blue-600"}`} />
                {t.about.formacion.paradigm.success}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {values.map((value, index) => (
                <div key={value} className={`rounded-xl border p-4 transition-transform duration-300 hover:-translate-y-1 ${
                  cyberMode ? "border-[#00ff66]/10 bg-black/20" : "border-blue-100 bg-[#F5F8FC]"
                }`}>
                  <span className={`text-[10px] font-semibold tracking-[0.15em] ${eyebrow}`}>0{index + 1}</span>
                  <p className={`mt-5 text-sm font-semibold ${cyberMode ? "text-[#d9ffe3]/80" : "text-slate-800"}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competencias */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${eyebrow}`}>
                03 — {t.about.formacion.competencies.label}
              </p>
              <h3 className={`mt-2 text-2xl font-semibold tracking-tight ${cyberMode ? "text-[#eafff0]" : "text-slate-900"}`}>
                {t.about.formacion.competencies.title}
              </h3>
            </div>
            <Code2 size={22} strokeWidth={1.6} className={cyberMode ? "text-[#00ff66]/55" : "text-blue-700/60"} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={`rounded-[1.4rem] p-6 ${cyberMode ? "border border-[#00ff66]/10 bg-[#030b05] text-[#eafff0]" : "border border-blue-100 bg-[#F2F6FC] text-slate-900"}`}>
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : "bg-blue-100 text-blue-800"}`}><Code2 size={18} /></span>
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${eyebrow}`}>Technical</p>
                  <h4 className="mt-0.5 font-semibold">{t.about.formacion.competencies.hardSkills}</h4>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {hard.map((skill) => <span key={skill} className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                  cyberMode ? "border-[#00ff66]/10 bg-[#00ff66]/[0.04] text-[#d9ffe3]/75" : "border-blue-100 bg-white text-slate-700"
                }`}>{skill}</span>)}
              </div>
            </div>
            <div className={`rounded-[1.4rem] p-6 ${cyberMode ? "border border-[#00ff66]/10 bg-[#07100a] text-[#eafff0]" : "border border-slate-200 bg-white text-slate-900"}`}>
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : "bg-slate-100 text-slate-700"}`}><Brain size={18} /></span>
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${cyberMode ? "text-[#00ff66]/55" : "text-slate-400"}`}>Personal</p>
                  <h4 className="mt-0.5 font-semibold">{t.about.formacion.competencies.softSkills}</h4>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {soft.map((skill) => <span key={skill} className={`rounded-lg px-3 py-2 text-xs font-medium ${
                  cyberMode ? "bg-[#00ff66]/[0.06] text-[#d9ffe3]/70" : "bg-slate-100 text-slate-700"
                }`}>{skill}</span>)}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const languages: Language[] = t.languageNames.map(({ name, level }) => ({ name, level }));
  const languageCards = [
    { ...languages[0], number: "01", percentage: "100%", width: "w-full", note: language === "ES" ? "Dominio nativo" : "Native proficiency" },
    { ...languages[1], number: "02", percentage: "100%", width: "w-full", note: language === "ES" ? "Dominio nativo" : "Native proficiency" },
    { ...languages[2], number: "03", percentage: "B2", width: "w-3/5", note: language === "ES" ? "Nivel intermedio" : "Intermediate level" },
  ];

  return (
    <div className="animate-[fadeIn_400ms_ease-out]">
      <div className="mb-6">
        <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${eyebrow}`}>{t.languagesTitle}</p>
        <h3 className={`mt-2 text-3xl font-semibold tracking-tight ${cyberMode ? "text-[#eafff0]" : "text-slate-900"}`}>{t.communication}</h3>
        <p className={`mt-2 text-sm ${muted}`}>{language === "ES" ? "Idiomas y nivel de comunicación." : "Languages and communication level."}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {languageCards.map((item) => (
          <article key={item.name} className={`relative overflow-hidden rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1 ${
            cyberMode ? "border-[#00ff66]/10 bg-[#030b05] text-[#eafff0]" : "border-black/[0.06] bg-white text-slate-900"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-semibold tracking-[0.16em] ${eyebrow}`}>{item.number}</span>
              <Languages size={19} className={cyberMode ? "text-[#00ff66]/55" : "text-blue-700/60"} />
            </div>
            <p className={`mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{item.note}</p>
            <h4 className="mt-2 text-2xl font-semibold tracking-tight">{item.name}</h4>
            <div className="mt-7 flex items-center justify-between text-xs">
              <span className={muted}>{t.level}</span>
              <span className={`font-semibold ${cyberMode ? "text-[#00ff66]" : "text-blue-700"}`}>{item.level}</span>
            </div>
            <div className={`mt-2 h-1.5 overflow-hidden rounded-full ${cyberMode ? "bg-[#00ff66]/10" : "bg-slate-100"}`}>
              <div className={`h-full rounded-full ${item.width} ${cyberMode ? "bg-[#00ff66]" : "bg-blue-700"}`} />
            </div>
          </article>
        ))}
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
  const avatar = defaultAvatar;
  const [aboutOpen, setAboutOpen] = useState(false);
  const [sustainabilityOpen, setSustainabilityOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const [activeSection, setActiveSection] =
    useState<AboutSection>("formacion");

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
        className={`flex h-full min-h-0 flex-col justify-between overflow-hidden px-6 py-7 transition-colors duration-700 sm:px-8 sm:py-7 lg:px-10 lg:py-7 ${
          cyberMode
            ? "bg-[#020602] text-[#eafff0]"
            : "bg-white text-black"
        }`}
      >
        {/* PERFIL */}
        <div>
          <div className="flex items-center gap-4">
            <div
              className={`relative block shrink-0 ${
                cyberMode
                  ? "animate-[cyberPulse_3s_ease-in-out_infinite]"
                  : ""
              }`}
            >
              <img
                src={avatar}
                alt="Martin Reyes Sanhueza"
                className={`h-16 w-16 rounded-full object-cover transition-all duration-700 ${
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

            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <h1 className="text-sm font-semibold tracking-tight sm:text-base">
                Martin Reyes Sanhueza
              </h1>

              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-[9px] font-medium transition-colors duration-500 ${
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
        <div className="py-5">
          <h2
            className={`max-w-xl text-[clamp(2.5rem,4vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em] ${
              cyberMode
                ? "animate-[cyberFlicker_5s_ease-in-out_infinite]"
                : ""
            }`}
          >
            {sidebarTranslations[language].heroTitle}
          </h2>
        </div>

        {/* ABOUT ME */}
        <div className="py-3">
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

              <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
                {sidebarTranslations[language].aboutMe}
              </h3>

              <p
                className={`mt-1 text-xs transition-colors ${
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
        <div className="border-t border-black/5 pt-5">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { name: "LinkedIn", url: "https://www.linkedin.com/in/martin-reyes-864726298", icon: "linkedin" },
              { name: "Instagram", url: "#", icon: "instagram" },
              { name: "X", url: "#", icon: "x" },
              { name: "GitHub", url: "https://github.com/MReyes013", icon: "github" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url !== "#" ? "_blank" : undefined}
                rel={social.url !== "#" ? "noopener noreferrer" : undefined}
                aria-label={social.name}
                title={social.name}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${
                  cyberMode
                    ? "border-[#00ff66]/15 bg-[#00ff66]/5 text-[#d9ffe3]/55 hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10 hover:text-[#00ff66]"
                    : "border-black/10 bg-[#F3F4F6] text-black/50 hover:border-black/20 hover:bg-black hover:text-white"
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  {social.icon === "linkedin" && (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.555 9h3.564v11.452H3.555V9ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                  )}
                  {social.icon === "instagram" && (
                    <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7Zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm11 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                  )}
                  {social.icon === "x" && (
                    <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.4L5.58 22H2.45l7.25-8.29L1.9 2h6.4l4.43 6.76L18.9 2Zm-1.1 18h1.73L7.37 3.9H5.51L17.8 20Z" />
                  )}
                  {social.icon === "github" && (
                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.06 1.14a10.65 10.65 0 0 1 5.57 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
                  )}
                </svg>
              </a>
            ))}
          </div>

          {/* ACCIONES PRINCIPALES */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCvOpen(true)}
              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                cyberMode
                  ? "border-[#00ff66]/20 bg-[#00ff66]/5 text-[#00ff66]/80 hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10"
                  : "border-black/10 bg-[#F3F4F6] text-black/65 hover:border-black/25 hover:bg-black hover:text-white"
              }`}
            >
              <FileText size={14} strokeWidth={1.8} />
              {language === "ES" ? "Currículum" : "Resume"}
              <ArrowUpRight size={13} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={() => setSustainabilityOpen(true)}
              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                cyberMode
                  ? "border-[#00ff66]/20 bg-[#00ff66]/5 text-[#00ff66]/80 hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10"
                  : "border-black/10 bg-[#F3F4F6] text-black/65 hover:border-black/25 hover:bg-black hover:text-white"
              }`}
            >
              <Leaf size={14} strokeWidth={1.8} />
              {language === "ES" ? "Sostenibilidad" : "Sustainability"}
              <ArrowUpRight size={13} strokeWidth={1.8} />
            </button>

          {/* CYBER MODE */}
          <button
            type="button"
            onClick={() => setCyberMode(!cyberMode)}
            className={`group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border px-3 py-1.5 text-left transition-all duration-300 ${
              cyberMode
                ? "border-[#00ff66]/30 bg-[#00ff66]/5 text-[#00ff66] hover:bg-[#00ff66]/10"
                : "border-black/5 bg-[#F3F4F6] text-black/55 hover:bg-black hover:text-white"
            }`}
          >
            {cyberMode && (
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(0,255,102,0.06),transparent)] animate-[cyberScan_2.5s_linear_infinite]" />
            )}

            <div className="relative flex items-center gap-2">
              <Terminal
                size={13}
                strokeWidth={1.7}
              />

              <span className="text-[10px] font-semibold tracking-tight">
                {cyberMode
                  ? sidebarTranslations[language]
                      .cyberModeActive
                  : sidebarTranslations[language].cyberMode}
              </span>
            </div>

            <span
              className={`relative h-2 w-2 rounded-full transition-all duration-500 ${
                cyberMode
                  ? "bg-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.8)]"
                  : "bg-black/20"
              }`}
            />
          </button>
          </div>
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
            className={`relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] shadow-[0_30px_100px_rgba(15,23,42,0.28)] transition-colors duration-700 ${
              cyberMode
                ? "border border-[#00ff66]/10 bg-[#020602] text-[#eafff0]"
                : "border border-white/70 bg-[#F7F9FC] text-slate-900"
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

              <div className="flex items-center gap-4">
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
                className={`mt-5 rounded-[1.5rem] p-3 sm:p-4 lg:p-5 ${
                  cyberMode
                    ? "border border-[#00ff66]/10 bg-[#07100a]"
                    : "border border-black/[0.04] bg-[#EEF2F7]"
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

      {/* SUSTAINABILITY OVERLAY */}
      {sustainabilityOpen && (
        <div
          className={`fixed inset-0 z-[110] flex items-center justify-center p-3 backdrop-blur-md sm:p-6 ${cyberMode ? "bg-black/75" : "bg-black/50"}`}
          onClick={() => setSustainabilityOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sustainability-title"
            onClick={(event) => event.stopPropagation()}
            className={`relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] shadow-2xl ${cyberMode ? "border border-[#00ff66]/10 bg-[#020602] text-[#eafff0]" : "bg-white text-black"}`}
          >
            <div className={`flex shrink-0 items-center justify-between gap-4 border-b px-5 py-5 sm:px-8 ${cyberMode ? "border-[#00ff66]/10" : "border-black/5"}`}>
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/60" : "text-black/40"}`}>
                  <Leaf size={13} className="mr-2 inline" />{language === "ES" ? "ODS 16 + ODS 17" : "SDG 16 + SDG 17"}
                </p>
                <h2 id="sustainability-title" className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {language === "ES" ? "Infancia sin violencia" : "A childhood without violence"}
                </h2>
                <p className={`mt-1 text-sm ${cyberMode ? "text-[#d9ffe3]/55" : "text-black/45"}`}>
                  {language === "ES" ? "Cómo la tecnología puede ayudar a proteger." : "How technology can help protect children."}
                </p>
              </div>
              <button type="button" onClick={() => setSustainabilityOpen(false)} aria-label={language === "ES" ? "Cerrar sostenibilidad" : "Close sustainability"} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${cyberMode ? "bg-[#00ff66]/5 text-[#00ff66] hover:bg-[#00ff66] hover:text-black" : "bg-[#F3F4F6] hover:bg-black hover:text-white"}`}>
                <X size={17} strokeWidth={1.7} />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 text-justify sm:px-8 sm:py-7">
              {/* CABECERA DE LA ACTIVIDAD */}
              <section className={`mb-5 rounded-2xl border p-4 sm:p-5 ${cyberMode ? "border-[#00ff66]/15 bg-[#07100a]" : "border-black/5 bg-[#F8FAFC]"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/65" : "text-black/40"}`}>{language === "ES" ? "Portafolio profesional digital · RA1" : "Digital professional portfolio · LO1"}</p>
                    <h3 className="mt-1 text-base font-semibold">{language === "ES" ? "Reflexión: sostenibilidad, ODS y tecnología" : "Reflection: sustainability, SDGs and technology"}</h3>
                    <p className={`mt-1 text-xs ${cyberMode ? "text-[#d9ffe3]/55" : "text-black/50"}`}>{language === "ES" ? "MP1708 · Sostenibilidad aplicada al sistema productivo" : "MP1708 · Sustainability applied to the productive system"}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : "bg-white text-black/65"}`}>Martin Reyes Sanhueza</span>
                </div>
              </section>

              {/* 01 · DATOS */}
              <section className={`overflow-hidden rounded-2xl ${cyberMode ? "bg-[#07100a]" : "border border-blue-100 bg-blue-50"}`}>
                <div className="grid items-center gap-3 p-3 md:grid-cols-[1fr_220px] md:gap-5">
                  <div className="p-3 sm:p-5">
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/60" : "text-black/40"}`}>01 — {language === "ES" ? "Datos y opinión" : "Facts and opinion"}</p>
                    <div className={`mt-4 text-6xl font-semibold tracking-tight ${cyberMode ? "text-[#00ff66]" : "text-[#2563EB]"}`}>1 de cada 2</div>
                    <p className={`mt-2 max-w-md text-sm leading-6 ${cyberMode ? "text-[#d9ffe3]/70" : "text-black/60"}`}>
                      {language === "ES" ? "Hasta 1.000 millones de niños de entre 2 y 17 años sufren violencia física, sexual o emocional, o abandono, en un año. Es aproximadamente 1 de cada 2 menores." : "Up to 1 billion children aged 2 to 17 experience physical, sexual or emotional violence, or neglect, in a year. That is approximately 1 in 2 children."}
                    </p>
                    <p className={`mt-2 text-[11px] ${cyberMode ? "text-[#d9ffe3]/45" : "text-black/45"}`}>
                      {language === "ES" ? "Fuente: Organización Mundial de la Salud (OMS), ficha informativa sobre la violencia contra los niños, 7 de mayo de 2026." : "Source: World Health Organization (WHO), Violence against children fact sheet, 7 May 2026."}
                      {" "}<a href="https://www.who.int/es/news-room/fact-sheets/detail/violence-against-children" target="_blank" rel="noopener noreferrer" className={`underline underline-offset-2 ${cyberMode ? "text-[#00ff66]" : "text-blue-700"}`}>{language === "ES" ? "Consultar fuente" : "View source"}</a>
                    </p>
                    <p className={`mt-5 border-l-2 pl-4 text-sm leading-6 ${cyberMode ? "border-[#00ff66]/60 text-[#eafff0]/85" : "border-black/30 text-black/75"}`}>
                      {language === "ES" ? "Antes de trabajar este tema no era consciente de lo común que puede ser la violencia durante la infancia. Además, he entendido que no siempre es física: también puede presentarse de otras formas y pasar desapercibida. Me alegra que se estén buscando maneras de detectar estas situaciones y evitar que el mismo ciclo se repita." : "Before working on this topic, I was not aware of how common violence during childhood can be. I have also understood that it is not always physical: it can take other forms and go unnoticed. I am glad that ways are being developed to identify these situations and prevent the same cycle from repeating."}
                    </p>
                  </div>
                  <img
                    src="https://www.unicef.org/cambodia/sites/unicef.org.cambodia/files/styles/media_large_image/public/DSC_0662.jpg.webp?itok=9I4c4Il8"
                    alt={language === "ES" ? "Profesional ofreciendo apoyo y protección a una niña" : "Professional providing support and protection to a child"}
                    className="h-36 w-full rounded-xl object-cover md:h-40"
                  />
                </div>
              </section>

              {/* 02 · TECNOLOGÍA */}
              <section className="mt-7">
                <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/60" : "text-black/40"}`}>02 — {language === "ES" ? "Solución tecnológica" : "Technology solution"}</p>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className={`rounded-2xl p-5 sm:p-6 ${cyberMode ? "bg-[#07100a]" : "border border-violet-100 bg-violet-50"}`}>
                    <h3 className="text-xl font-semibold">Primero / CPIMS+</h3>
                    <p className={`mt-2 text-sm leading-6 ${cyberMode ? "text-[#d9ffe3]/65" : "text-black/60"}`}>
                      {language === "ES" ? "Es una herramienta digital que ayuda a los profesionales a registrar casos, hacer seguimiento y coordinar la ayuda a menores." : "A digital tool that helps professionals record cases, follow up and coordinate support for children."}
                    </p>
                    <div className={`mt-5 flex flex-wrap gap-2 text-xs font-medium ${cyberMode ? "text-[#00ff66]" : "text-black/65"}`}>
                      {(language === "ES" ? ["Registrar", "Proteger datos", "Coordinar ayuda"] : ["Record", "Protect data", "Coordinate support"]).map((step) => <span key={step} className={`rounded-full px-3 py-2 ${cyberMode ? "bg-[#00ff66]/10" : "bg-white"}`}>{step}</span>)}
                    </div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85"
                    alt={language === "ES" ? "Panel digital con datos y gráficos" : "Digital dashboard with data and charts"}
                    className="h-36 w-full rounded-2xl object-cover md:h-40"
                  />
                </div>
              </section>

              {/* 03 · ASG */}
              <section className="mt-7">
                <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/60" : "text-black/40"}`}>03 — {language === "ES" ? "ASG y Agenda 2030" : "ESG and 2030 Agenda"}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    { key: "A", title: language === "ES" ? "Ambiental" : "Environmental", body: language === "ES" ? "La tecnología evita papel y desplazamientos, pero consume energía y genera residuos." : "Technology can reduce paper and travel, but uses energy and creates waste." },
                    { key: "S", title: language === "ES" ? "Social" : "Social", body: language === "ES" ? "Ayuda a proteger a los menores, aunque no todos tienen el mismo acceso a la tecnología." : "It helps protect children, although not everyone has equal access to technology." },
                    { key: "G", title: language === "ES" ? "Gobernanza" : "Governance", body: language === "ES" ? "Hay que proteger los datos y evitar que personas no autorizadas accedan a ellos." : "Data must be protected and unauthorized access prevented." },
                  ].map((item) => (
                    <article key={item.key} className={`rounded-2xl p-5 ${cyberMode ? "bg-[#07100a]" : item.key === "A" ? "border border-emerald-100 bg-emerald-50" : item.key === "S" ? "border border-sky-100 bg-sky-50" : "border border-amber-100 bg-amber-50"}`}>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : item.key === "A" ? "bg-emerald-500 text-white" : item.key === "S" ? "bg-sky-500 text-white" : "bg-amber-500 text-white"}`}>{item.key}</span>
                      <h3 className="mt-3 font-semibold">{item.title}</h3>
                      <p className={`mt-2 text-sm leading-6 ${cyberMode ? "text-[#d9ffe3]/60" : "text-black/60"}`}>{item.body}</p>
                    </article>
                  ))}
                </div>
                <div className={`mt-3 flex flex-wrap items-center gap-3 rounded-2xl p-5 ${cyberMode ? "border border-[#00ff66]/10 bg-[#07100a]" : "border border-black/5 bg-white"}`}>
                  <img src="https://res.cloudinary.com/everydotorg/image/upload/f_auto%2Cc_limit%2Cw_3840%2Cq_auto/faja_covers/kbfus/ltglxjnoil9zikv5jzei" alt={language === "ES" ? "Personas colaborando en un proyecto comunitario" : "People collaborating on a community project"} className="h-16 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : "bg-sky-600 text-white"}`}>ODS 16</span><span className={`rounded-full px-3 py-1 text-xs font-semibold ${cyberMode ? "bg-[#00ff66]/10 text-[#00ff66]" : "bg-violet-600 text-white"}`}>ODS 17</span></div>
                    <p className={`mt-2 text-sm leading-6 ${cyberMode ? "text-[#d9ffe3]/70" : "text-black/65"}`}>{language === "ES" ? "El ODS 16 busca acabar con la violencia. El ODS 17 promueve la colaboración para conseguirlo." : "SDG 16 aims to end violence. SDG 17 promotes cooperation to make it happen."}</p>
                  </div>
                </div>
                <div className={`mt-3 rounded-2xl p-5 sm:p-6 ${cyberMode ? "border border-[#00ff66]/15 bg-[#07100a]" : "border border-black/5 bg-[#F8FAFC]"}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/65" : "text-black/40"}`}>{language === "ES" ? "Lo que me llevo de esta actividad" : "What I take away from this activity"}</p>
                  <p className={`mt-3 text-sm leading-7 ${cyberMode ? "text-[#eafff0]/85" : "text-black/70"}`}>
                    {language === "ES" ? "Esta actividad me ha hecho ver el problema de una forma diferente. No basta con reaccionar cuando ocurre un caso: también es importante contar con profesionales coordinados, herramientas que ayuden a hacer seguimiento y medidas para proteger la información de los menores. CPIMS+ puede facilitar la gestión y coordinación de los casos, pero no sustituye la atención humana ni garantiza por sí solo que el problema desaparezca. Para mí, la tecnología tiene valor cuando se utiliza para ayudar a las personas y se gestiona con responsabilidad." : "This activity has made me see the problem differently. It is not enough to react when a case occurs: professionals need to coordinate, tools should support case follow-up, and measures must protect children's information. CPIMS+ can make case management and coordination easier, but it does not replace human care or guarantee that the problem will disappear by itself. To me, technology is valuable when it is used to help people and managed responsibly."}
                  </p>
                </div>
              </section>

              {/* 04 · PLA DE NEGOCI */}
              <section className="mt-7">
                <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/60" : "text-black/40"}`}>04 — {language === "ES" ? "Mi futuro plan de empresa" : "My future business plan"}</p>
                <div className="mt-3 grid items-center gap-3 overflow-hidden rounded-2xl p-3 md:grid-cols-[190px_1fr]">
                  <img src="https://assets.seobotai.com/cdn-cgi/image/quality%3D75%2Cw%3D1536%2Ch%3D1024/fiegenbaum.solutions/68a3c7574eebbe86def1a8ba-1755573943639.jpg" alt={language === "ES" ? "Equipo analizando datos de sostenibilidad en una reunión" : "Team reviewing sustainability data in a meeting"} className="h-36 w-full rounded-xl object-cover md:h-40" />
                  <div className={`rounded-xl p-5 sm:p-6 ${cyberMode ? "bg-[#07100a]" : "bg-orange-50"}`}>
                    <p className={`text-sm leading-6 ${cyberMode ? "text-[#d9ffe3]/70" : "text-black/65"}`}>
                      {language === "ES" ? "Si en el futuro desarrollo un proyecto o trabajo en una empresa del ámbito tecnológico, quiero aplicar estos criterios desde el principio: utilizar los recursos de forma eficiente, cuidar a las personas y proteger la información. La sostenibilidad no debería añadirse al final, sino formar parte de las decisiones diarias." : "If I develop a project or work in a technology company in the future, I want to apply these criteria from the start: use resources efficiently, care for people and protect information. Sustainability should not be added at the end; it should be part of everyday decisions."}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {(language === "ES" ? ["Ahorrar energía", "Proteger datos", "Reducir residuos", "Actuar con responsabilidad"] : ["Save energy", "Protect data", "Reduce waste", "Act responsibly"]).map((item, index) => (
                        <div key={item} className={`rounded-xl p-3 text-xs font-medium ${cyberMode ? "bg-black/30 text-[#eafff0]/80" : "bg-white text-black/70"}`}><span className={`mr-2 font-bold ${cyberMode ? "text-[#00ff66]" : "text-black/35"}`}>0{index + 1}</span>{item}</div>
                      ))}
                    </div>
                    <p className={`mt-5 text-sm font-medium leading-6 ${cyberMode ? "text-[#00ff66]" : "text-black"}`}>
                      {language === "ES" ? "Desde ASIX puedo aportar conocimientos de sistemas, redes y ciberseguridad." : "From ASIX, I can contribute knowledge of systems, networks and cybersecurity."}
                    </p>
                  </div>
                </div>
              </section>

              {/* FUENTES Y EVIDENCIAS */}
              <section className={`mt-7 rounded-2xl border p-5 sm:p-6 ${cyberMode ? "border-[#00ff66]/15 bg-[#07100a]" : "border-black/5 bg-[#F8FAFC]"}`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${cyberMode ? "text-[#00ff66]/65" : "text-black/40"}`}>{language === "ES" ? "Fuentes y evidencias" : "Sources and evidence"}</p>
                <p className={`mt-2 text-sm leading-6 ${cyberMode ? "text-[#d9ffe3]/60" : "text-black/55"}`}>{language === "ES" ? "He utilizado fuentes institucionales para contrastar el dato y explicar los objetivos y la herramienta digital." : "I used institutional sources to check the statistic and explain the goals and the digital tool."}</p>
                <ul className={`mt-4 space-y-3 text-sm ${cyberMode ? "text-[#eafff0]/80" : "text-black/70"}`}>
                  <li><a className={`underline underline-offset-2 ${cyberMode ? "text-[#00ff66]" : "text-blue-700"}`} href="https://www.who.int/es/news-room/fact-sheets/detail/violence-against-children" target="_blank" rel="noopener noreferrer">Organización Mundial de la Salud — Violencia contra los niños</a></li>
                  <li><a className={`underline underline-offset-2 ${cyberMode ? "text-[#00ff66]" : "text-blue-700"}`} href="https://www.un.org/sustainabledevelopment/es/sustainable-development-goals/" target="_blank" rel="noopener noreferrer">Naciones Unidas — Objetivos de Desarrollo Sostenible</a></li>
                  <li><a className={`underline underline-offset-2 ${cyberMode ? "text-[#00ff66]" : "text-blue-700"}`} href="https://alliancecpha.org/sites/default/files/technical/attachments/Inter-agency%20Child%20Protection%20Case%20Management%20Guidelines_2nd%20Edition_2024.pdf" target="_blank" rel="noopener noreferrer">The Alliance — Inter-agency Child Protection Case Management Guidelines (2024), CPIMS+ / Primero</a></li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* CV OVERLAY */}
      {cvOpen && (
        <div
          className={`fixed inset-0 z-[120] flex items-center justify-center p-3 backdrop-blur-md sm:p-6 ${
            cyberMode ? "bg-black/75" : "bg-black/50"
          }`}
          onClick={() => setCvOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-title"
            onClick={(event) => event.stopPropagation()}
            className={`relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] shadow-2xl ${
              cyberMode
                ? "border border-[#00ff66]/10 bg-[#020602] text-[#eafff0]"
                : "bg-white text-black"
            }`}
          >
            <div
              className={`flex shrink-0 items-center justify-between gap-4 border-b px-5 py-4 sm:px-8 ${
                cyberMode ? "border-[#00ff66]/10" : "border-black/5"
              }`}
            >
              <div>
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    cyberMode ? "text-[#00ff66]/60" : "text-black/40"
                  }`}
                >
                  <FileText size={13} className="mr-2 inline" />
                  {language === "ES" ? "DOCUMENTACIÓN" : "DOCUMENTS"}
                </p>
                <h2 id="cv-title" className="mt-1 text-2xl font-semibold tracking-tight">
                  {language === "ES" ? "Currículum" : "Resume"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCvOpen(false)}
                aria-label={language === "ES" ? "Cerrar currículum" : "Close resume"}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                  cyberMode
                    ? "bg-[#00ff66]/5 text-[#00ff66] hover:bg-[#00ff66] hover:text-black"
                    : "bg-[#F3F4F6] hover:bg-black hover:text-white"
                }`}
              >
                <X size={17} strokeWidth={1.7} />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 sm:px-7 sm:py-6">
              <section className="mb-7">
                <h3 className="mb-3 text-sm font-semibold">
                  {language === "ES" ? "Currículum" : "Resume"}
                </h3>
                <iframe
                  src="/cv/CV.pdf"
                  title="CV"
                  className="h-[70vh] min-h-[500px] w-full rounded-xl border border-black/10 bg-white"
                />
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold">
                  Martin Reyes Sanhueza
                </h3>
                <iframe
                  src="/cv/Martin%20Reyes%20Sanhueza.pdf"
                  title="Martin Reyes Sanhueza"
                  className="h-[70vh] min-h-[500px] w-full rounded-xl border border-black/10 bg-white"
                />
              </section>
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