import { 
  FlaskConical, 
  Atom, 
  Calculator, 
  BookOpen 
} from 'lucide-react';
import { SyllabusData } from '@/types/syllabus';

export const tgtScienceSyllabus: SyllabusData = {
  physics: {
    title: "Physics",
    icon: Atom,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    sections: [
      {
        id: "phy_motion",
        title: "Motion and Force",
        topics: [
          "Linear Motion equations",
          "Newton's Laws of Motion",
          "Friction and its applications",
          "Circular Motion"
        ]
      },
      {
        id: "phy_energy",
        title: "Work, Energy and Power",
        topics: [
          "Kinetic and Potential Energy",
          "Law of Conservation of Energy",
          "Power calculations",
          "Collisions"
        ]
      },
      {
        id: "phy_optics",
        title: "Light and Optics",
        topics: [
          "Reflection and Refraction",
          "Lenses and Mirrors",
          "Human Eye and defects",
          "Wave nature of light"
        ]
      }
    ]
  },
  chemistry: {
    title: "Chemistry",
    icon: FlaskConical,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    sections: [
      {
        id: "chem_matter",
        title: "Matter and Surroundings",
        topics: [
          "States of Matter",
          "Elements, Compounds, and Mixtures",
          "Separation techniques",
          "Mole concept"
        ]
      },
      {
        id: "chem_atom",
        title: "Structure of Atom",
        topics: [
          "Electron configuration",
          "Valency and Atomic mass",
          "Isotopes and Isobars",
          "Bohr's Model"
        ]
      }
    ]
  },
  math: {
    title: "Mathematics",
    icon: Calculator,
    color: "text-green-600",
    bgColor: "bg-green-50",
    sections: [
      {
        id: "math_num",
        title: "Number Systems",
        topics: [
          "Real Numbers",
          "Polynomials",
          "Linear Equations in two variables",
          "Quadratic Equations"
        ]
      },
      {
        id: "math_trig",
        title: "Trigonometry",
        topics: [
          "Trigonometric Ratios",
          "Identities",
          "Heights and Distances"
        ]
      }
    ]
  },
  pedagogy: {
    title: "Teaching Aptitude",
    icon: BookOpen,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    sections: [
      {
        id: "ped_1",
        title: "Child Development",
        topics: [
          "Concept of development",
          "Piaget, Kohlberg, Vygotsky constructs",
          "Inclusive education"
        ]
      }
    ]
  }
};
