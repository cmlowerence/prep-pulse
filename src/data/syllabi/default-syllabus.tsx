import { 
  FlaskConical, 
  Atom, 
  Calculator, 
  GraduationCap, 
  Globe 
} from 'lucide-react';

const syllabusData = {
  chemistry: {
    title: "Chemistry",
    icon: FlaskConical, 
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    sections: [
      {
        id: "chem_1",
        title: "Basic Concepts & Stoichiometry",
        topics: [
          "Matter & its states",
          "Atomic structure (Bohr, quantum numbers)",
          "Periodic trends (IE, EA, EN)",
          "Stoichiometry – mole, molar mass, empirical & molecular formulas",
          "Balancing chemical equations & limiting reagents"
        ]
      },
      {
        id: "chem_2",
        title: "Chemical Bonding & Molecular Structure",
        topics: [
          "Ionic vs covalent bonding",
          "VSEPR, hybridization, molecular shapes",
          "Polarity & dipole moment",
          "Lewis structures & resonance",
          "Intermolecular forces (H-bonding, dipole-dipole, London dispersion)"
        ]
      },
      {
        id: "chem_3",
        title: "Thermochemistry & Chemical Kinetics",
        topics: [
          "Energy, enthalpy, heat capacity, Hess' Law",
          "Reaction rates, rate laws, order of reaction",
          "Activation energy & Arrhenius equation",
          "Catalysis & collision theory"
        ]
      },
      {
        id: "chem_4",
        title: "Equilibrium & Acids-Bases",
        topics: [
          "Chemical equilibrium (Kc, Kp)",
          "Le Chatelier's principle",
          "Acids & bases (Bronsted-Lowry, Lewis)",
          "pH, pKa, buffer solutions, titrations"
        ]
      },
      {
        id: "chem_5",
        title: "Electrochemistry & Redox",
        topics: [
          "Oxidation states, balancing redox reactions",
          "Galvanic cells, cell potential, Nernst equation",
          "Electrolytic processes & Faraday's laws"
        ]
      }
    ]
  },
  physics: {
    title: "Physics",
    icon: Atom,
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    sections: [
      {
        id: "phy_1",
        title: "Mechanics",
        topics: [
          "Kinematics (velocity, acceleration, projectile motion)",
          "Newton's laws & applications",
          "Work, energy, and the work-energy theorem",
          "Conservation of momentum & collisions",
          "Rotational motion & angular momentum"
        ]
      },
      {
        id: "phy_2",
        title: "Waves & Oscillations",
        topics: [
          "Simple harmonic motion",
          "Wave equation, wave speed, superposition",
          "Doppler effect",
          "Standing waves in strings and pipes"
        ]
      },
      {
        id: "phy_3",
        title: "Thermodynamics",
        topics: [
          "Zeroth, First, Second law of thermodynamics",
          "Heat engines & refrigerators",
          "Entropy and free energy"
        ]
      },
      {
        id: "phy_4",
        title: "Optics & Electromagnetism",
        topics: [
          "Geometrical optics (lenses, mirrors)",
          "Electrostatics (Coulomb's law, Gauss' law)",
          "Magnetostatics & Maxwell's equations",
          "EM waves & their properties"
        ]
      },
      {
        id: "phy_5",
        title: "Quantum Mechanics",
        topics: [
          "Photo-electric Effect & Compton Scattering",
          "Heisenberg Uncertainty & Wave-Particle Duality",
          "Schrodinger Equation (Time Dependent/Independent)",
          "Particle in a box & atomic orbitals"
        ]
      }
    ]
  },
  mathematics: {
    title: "Mathematics",
    icon: Calculator,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    sections: [
      {
        id: "math_1",
        title: "Algebra & Functions",
        topics: [
          "Polynomial & rational functions",
          "Sequences & series (arithmetic, geometric)",
          "Exponential & logarithmic functions",
          "Complex numbers basics"
        ]
      },
      {
        id: "math_2",
        title: "Calculus",
        topics: [
          "Limits & continuity",
          "Differentiation rules & applications",
          "Integration techniques & applications",
          "Sequences, series & Taylor expansions"
        ]
      },
      {
        id: "math_3",
        title: "Vectors & Coordinate Geometry",
        topics: [
          "2D & 3D vectors",
          "Lines & planes in space",
          "Conic sections & parametric equations"
        ]
      },
      {
        id: "math_4",
        title: "Probability & Statistics",
        topics: [
          "Descriptive statistics (mean, variance)",
          "Probability rules, conditional probability",
          "Discrete & continuous distributions (binomial, normal)"
        ]
      }
    ]
  },
  general: {
    title: "General Studies",
    icon: GraduationCap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    sections: [
      {
        id: "gen_1",
        title: "Study Skills & Exam Strategy",
        topics: [
          "Time management & planning",
          "Active recall & spaced repetition",
          "Note-taking methods (Cornell, mind maps)",
          "Exam day strategies & stress coping"
        ]
      },
      {
        id: "gen_2",
        title: "Current Affairs & General Knowledge",
        topics: [
          "National & international news summary",
          "Important dates & events",
          "Basic economics & polity overview"
        ]
      },
      {
        id: "gen_3",
        title: "Teaching Aptitude",
        topics: [
          "Pedagogy basics",
          "Learning theories (constructivism, behaviorism)",
          "Assessment types & formative feedback"
        ]
      }
    ]
  },
  extras: {
    title: "Extras",
    icon: Globe,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    sections: [
      {
        id: "extr_1",
        title: "Practical Labs & Experiments",
        topics: [
          "Simple chemistry experiments with observations",
          "Physics lab demonstrations (pendulum, waves)",
          "Math modeling exercises"
        ]
      },
      {
        id: "extr_2",
        title: "Reference Books & Videos",
        topics: [
          "Recommended textbooks",
          "Top YouTube channels & playlists",
          "Important research articles (summary)"
        ]
      }
    ]
  }
};

export default syllabusData;
