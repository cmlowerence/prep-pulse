export function getMockStudyGuide(topic: string) {
  return `
# Study Guide: ${topic} (MOCK)

## Overview
This is a generated mock study guide for **${topic}**. In a real scenario, Gemini would generate detailed explanations here.

## Key Concepts
1. **Concept A**: Definition of concept.
2. **Concept B**: Explanation of concept.

## Important Formulas
$$
E = mc^2
$$

## Worked Examples
**Example 1:**
Calculate the force...
*Solution:* $F = ma$

## Practice Questions
1. What is the unit of force?
2. Explain Newton's Second Law.
`;
}

export function getMockQuiz(topic: string) {
  return {
    title: `Mock Quiz: ${topic}`,
    questions: [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"],
        correctIndex: 1,
        explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions."
      },
      {
        question: "Which represents Newton's Second Law?",
        options: ["F = m/a", "F = ma", "F = m + a", "F = m - a"],
        correctIndex: 1,
        explanation: "Force equals mass times acceleration."
      }
    ]
  };
}
