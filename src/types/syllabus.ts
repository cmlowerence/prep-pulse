import { SyllabusData } from "@/types";

/**
 * TGT_SCIENCE_SYLLABUS
 *
 * Structured syllabus object for "TGT Science & Non-Medical Exam".
 *
 * - id: unique identifier (use when storing or referencing this syllabus)
 * - examName: human-readable title
 * - version: schema/content version (bump when structure or content changes)
 * - subjects: array of subject objects; each subject contains visual styling tokens
 *   (color, bgColor) and a topics array. Each topic contains subtopics with stable ids.
 *
 * NOTE: Keep ids stable (don't change them lightly) — they are intended as keys for
 * UI routing, local storage, and question-bank mapping.
 */
export const TGT_SCIENCE_SYLLABUS: SyllabusData = {
  id: "tgt-science-2025",
  examName: "TGT Science & Non-Medical Exam",
  version: "2025.1",
  subjects: [
    {
      id: "chemistry",
      name: "Chemistry",
      // Tailwind utility classes for text and background — used by UI components
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      topics: [
        {
          id: "chem_1",
          name: "Physical Chemistry",
          subtopics: [
            { id: "chem_1_01", name: "Atomic and Molecular Structure" },
            { id: "chem_1_02", name: "States of Matter (Gaseous, Liquid, Solid)" },
            { id: "chem_1_03", name: "Chemical Thermodynamics & Equilibrium" },
            { id: "chem_1_04", name: "Chemical and Phase Equilibria" },
            { id: "chem_1_05", name: "Solutions and Colligative Properties" },
            { id: "chem_1_06", name: "Electrochemistry and Electrochemical Cells" },
            { id: "chem_1_07", name: "Chemical Kinetics and Enzyme Catalysis" },
            { id: "chem_1_08", name: "Adsorption and Colloidal Solutions" },
            { id: "chem_1_09", name: "Molecular Spectroscopy" }
          ]
        },
        {
          id: "chem_2",
          name: "Organic Chemistry",
          subtopics: [
            { id: "chem_2_01", name: "Stereochemistry & Conformational Analysis" },
            { id: "chem_2_02", name: "Reaction Mechanisms (Nucleophilic, Electrophilic)" },
            { id: "chem_2_03", name: "Elimination Reactions & Rearrangements" },
            { id: "chem_2_04", name: "Name Reactions" },
            { id: "chem_2_05", name: "Qualitative Organic Analysis" },
            { id: "chem_2_06", name: "Organic Spectroscopy (UV-Visible, IR, NMR)" },
            { id: "chem_2_07", name: "Hydrocarbons, Haloalkanes, Haloarenes" },
            { id: "chem_2_08", name: "Alcohols, Phenols, Ethers, Aldehydes, Carboxylic Acids, Amines" },
            { id: "chem_2_09", name: "Heterocyclic Chemistry & Polymer Chemistry" },
            { id: "chem_2_10", name: "Natural Products & Biochemistry" }
          ]
        },
        {
          id: "chem_3",
          name: "Inorganic Chemistry",
          subtopics: [
            { id: "chem_3_01", name: "Periodic Table and Periodic Properties" },
            { id: "chem_3_02", name: "Extraction of Metals and Metallurgy" },
            { id: "chem_3_03", name: "Chemical Bonding (VSEPR and MO Theory)" },
            { id: "chem_3_04", name: "Main Group Elements (s and p-blocks)" },
            { id: "chem_3_05", name: "Transition (d-block) & Inner-transition (f-block) Elements" },
            { id: "chem_3_06", name: "Coordination Chemistry" },
            { id: "chem_3_07", name: "Bioinorganic Chemistry" },
            { id: "chem_3_08", name: "Nuclear Chemistry & Analytical Chemistry" }
          ]
        }
      ]
    },

    {
      id: "physics",
      name: "Physics",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      topics: [
        {
          id: "phy_1",
          name: "Mechanics, Relativity & Properties of Matter",
          subtopics: [
            { id: "phy_1_01", name: "Laws of Motion, Work, Energy and Power" },
            { id: "phy_1_02", name: "System of Particles and Rotational Motion" },
            { id: "phy_1_03", name: "Gravitation" },
            { id: "phy_1_04", name: "Mechanical Properties of Solids & Fluids" },
            { id: "phy_1_05", name: "Coriolis Force & Inertial/Non-inertial Frames" },
            { id: "phy_1_06", name: "Special Theory of Relativity (Lorentz, Time Dilation, Mass-Energy)" },
            { id: "phy_1_07", name: "Michelson-Morley Experiment" }
          ]
        },
        {
          id: "phy_2",
          name: "Thermal & Statistical Physics",
          subtopics: [
            { id: "phy_2_01", name: "Thermodynamics & Kinetic Theory of Gases" },
            { id: "phy_2_02", name: "Statistical Physics (M-B, B-E, F-D Statistics)" },
            { id: "phy_2_03", name: "Entropy & Thermodynamic Potentials" },
            { id: "phy_2_04", name: "Maxwell's Thermodynamic Relations" }
          ]
        },
        {
          id: "phy_3",
          name: "Electricity & Magnetism",
          subtopics: [
            { id: "phy_3_01", name: "Electrostatics, Potential, Poisson & Laplace Equations" },
            { id: "phy_3_02", name: "Current Electricity, Microscopic Ohm's Law & Hall Effect" },
            { id: "phy_3_03", name: "Magnetism, Diamagnetism, Paramagnetism, Ferromagnetism" },
            { id: "phy_3_04", name: "Electromagnetic Induction & AC" },
            { id: "phy_3_05", name: "Maxwell's Equations & Poynting Vector" },
            { id: "phy_3_06", name: "Dielectrics & Polarization" }
          ]
        },
        {
          id: "phy_4",
          name: "Optics & Waves",
          subtopics: [
            { id: "phy_4_01", name: "Oscillations (Damped, Forced, Coupled)" },
            { id: "phy_4_02", name: "Interference (Young's Double Slit, Newton's Rings, Thin Films)" },
            { id: "phy_4_03", name: "Diffraction (Fraunhofer, Fresnel, Zone Plate)" },
            { id: "phy_4_04", name: "Polarization (Malus's Law, Double Refraction, Brewster Law)" },
            { id: "phy_4_05", name: "Lasers and Holography" }
          ]
        },
        {
          id: "phy_5",
          name: "Quantum Mechanics",
          subtopics: [
            { id: "phy_5_01", name: "Photo-electric Effect & Compton Scattering" },
            { id: "phy_5_02", name: "Heisenberg Uncertainty & Wave-Particle Duality" },
            { id: "phy_5_03", name: "Schrodinger Equation (Time Dependent/Independent)" },
            { id: "phy_5_04", name: "Zeeman Effect & Stern-Gerlach Experiment" },
            { id: "phy_5_05", name: "Spin Orbit Coupling & L-S, J-J Couplings" }
          ]
        },
        {
          id: "phy_6",
          name: "Solid State & Electronics",
          subtopics: [
            { id: "phy_6_01", name: "Crystal Structure, Miller Indices, Brillouin Zones" },
            { id: "phy_6_02", name: "Band Theory, Fermi Gas & Specific Heat" },
            { id: "phy_6_03", name: "Superconductivity (BCS Theory, Meissner Effect)" },
            { id: "phy_6_04", name: "Semiconductors (Diodes, Zener, LED, Solar Cell)" },
            { id: "phy_6_05", name: "Transistors (BJT, FET, MOSFET) & Amplifiers" },
            { id: "phy_6_06", name: "Digital Electronics & Logic Gates" }
          ]
        },
        {
          id: "phy_7",
          name: "Nuclear Physics",
          subtopics: [
            { id: "phy_7_01", name: "Nuclear Models & Radioactivity" },
            { id: "phy_7_02", name: "Nuclear Reactions, Detectors & Accelerators" },
            { id: "phy_7_03", name: "Elementary Particles & Quarks Model" },
            { id: "phy_7_04", name: "Conservation Laws & Particle Symmetries" }
          ]
        }
      ]
    },

    {
      id: "maths",
      name: "Mathematics",
      color: "text-red-600",
      bgColor: "bg-red-100",
      topics: [
        {
          id: "math_1",
          name: "Algebra & Linear Algebra",
          subtopics: [
            { id: "math_1_01", name: "Sets, Relations, Functions" },
            { id: "math_1_02", name: "Complex Numbers & Quadratic Equations" },
            { id: "math_1_03", name: "Permutations, Combinations & Binomial Theorem" },
            { id: "math_1_04", name: "Sequence & Series (AP, GP, HP)" },
            { id: "math_1_05", name: "Matrices, Determinants & System of Linear Equations" },
            { id: "math_1_06", name: "Groups, Rings, Fields (Abstract Algebra)" },
            { id: "math_1_07", name: "Vector Spaces, Linear Transformations & Eigen Values" }
          ]
        },
        {
          id: "math_2",
          name: "Calculus & Analysis",
          subtopics: [
            { id: "math_2_01", name: "Limits, Continuity, Differentiability" },
            { id: "math_2_02", name: "Applications of Derivatives (Maxima/Minima, Mean Value Theorems)" },
            { id: "math_2_03", name: "Integration (Definite/Indefinite) & Area Under Curves" },
            { id: "math_2_04", name: "Partial Differentiation & Jacobians" },
            { id: "math_2_05", name: "Real Analysis (Sequences, Series, Power Series)" },
            { id: "math_2_06", name: "Complex Analysis (Analytic Functions, Cauchy-Riemann)" }
          ]
        },
        {
          id: "math_3",
          name: "Differential Equations",
          subtopics: [
            { id: "math_3_01", name: "ODEs (Homogenous, Linear, Exact)" },
            { id: "math_3_02", name: "Equations of First Order & Higher Degree (Clairaut's Form)" },
            { id: "math_3_03", name: "Linear Equations with Constant/Variable Coefficients" },
            { id: "math_3_04", name: "Partial Differential Equations (Classification)" }
          ]
        },
        {
          id: "math_4",
          name: "Geometry & Vectors",
          subtopics: [
            { id: "math_4_01", name: "Co-ordinate Geometry (2D Conics & 3D Lines/Planes)" },
            { id: "math_4_02", name: "Vector Algebra" },
            { id: "math_4_03", name: "Vector Calculus (Gradient, Divergence, Curl)" }
          ]
        },
        {
          id: "math_5",
          name: "Numerical Methods & Applied Math",
          subtopics: [
            { id: "math_5_01", name: "Numerical Analysis (Newton's Method, Simpson's Rule, Euler's Method)" },
            { id: "math_5_02", name: "Statistics (Mean, Variance, Deviation)" },
            { id: "math_5_03", name: "Probability & Bayes' Theorem" },
            { id: "math_5_04", name: "Linear Programming Problems (LPP)" }
          ]
        }
      ]
    },

    {
      id: "bed",
      name: "B.Ed & Pedagogy",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      topics: [
        {
          id: "bed_1",
          name: "B.Ed Core Subjects",
          subtopics: [
            { id: "bed_1_01", name: "Childhood and Development Years" },
            { id: "bed_1_02", name: "Contemporary India and Education" },
            { id: "bed_1_03", name: "Language Across the Curriculum" },
            { id: "bed_1_04", name: "Understanding Disciplines and Subjects" },
            { id: "bed_1_05", name: "Learning and Teaching" },
            { id: "bed_1_06", name: "Assessment for Learning" },
            { id: "bed_1_07", name: "Teaching of Physical Science & Mathematics" },
            { id: "bed_1_08", name: "Inclusive School, Gender & Society" },
            { id: "bed_1_09", name: "ICT in Teaching-Learning Process" }
          ]
        }
      ]
    },

    {
      id: "gk",
      name: "General Knowledge",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      topics: [
        {
          id: "gk_1",
          name: "General Awareness",
          subtopics: [
            { id: "gk_1_01", name: "HP General Knowledge (Moderate)" },
            { id: "gk_1_02", name: "Current Affairs (Last 1 year)" },
            { id: "gk_1_03", name: "Everyday Science (10th level)" },
            { id: "gk_1_04", name: "Logical Reasoning" },
            { id: "gk_1_05", name: "Social Science" },
            { id: "gk_1_06", name: "General English (10th level)" },
            { id: "gk_1_07", name: "General Hindi (10th level)" }
          ]
        }
      ]
    }
  ]
};