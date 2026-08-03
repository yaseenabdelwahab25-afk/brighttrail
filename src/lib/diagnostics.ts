import type { Grade, Question } from "./curriculum";

const diagnosticQuestions: Record<Grade, Question[]> = {
  9: [
    { prompt: "What is the value of 3x + 2 when x = 4?", hint: "Substitute 4 for x.", options: ["10", "14", "20"], answer: 1, explanation: "3(4) + 2 = 14." },
    { prompt: "Which sentence is a complete claim?", hint: "Look for a subject, verb, and complete idea.", options: ["Because the policy changed.", "The policy changed after the review.", "After the review."], answer: 1, explanation: "The second option expresses a complete thought." },
    { prompt: "What is the purpose of a control group?", hint: "Think about comparison.", options: ["To provide a baseline", "To guarantee the result", "To remove all variables"], answer: 0, explanation: "A baseline helps compare the treatment condition." },
  ],
  10: [
    { prompt: "What is the slope of y = −2x + 7?", hint: "Look at the coefficient of x.", options: ["−2", "2", "7"], answer: 0, explanation: "In y = mx + b, m is the slope." },
    { prompt: "Which source detail most helps evaluate reliability?", hint: "Consider who made it and why.", options: ["The font colour", "The author, evidence, and purpose", "The length of the title"], answer: 1, explanation: "Authorship, evidence, and purpose shape reliability." },
    { prompt: "What happens to atoms in a chemical reaction?", hint: "Think conservation.", options: ["They disappear", "They are rearranged", "They become energy only"], answer: 1, explanation: "Chemical reactions rearrange atoms into new substances." },
  ],
  11: [
    { prompt: "What does a model's assumption do?", hint: "Models simplify reality.", options: ["Sets the conditions where it is useful", "Makes it automatically true", "Removes the need for data"], answer: 0, explanation: "Assumptions define the limits and conditions of a model." },
    { prompt: "What is synthesis?", hint: "Go beyond summary.", options: ["Copying one source", "Connecting ideas across sources", "Listing titles"], answer: 1, explanation: "Synthesis connects sources into a line of reasoning." },
    { prompt: "Why should a graph's axes be checked?", hint: "Scale changes what you see.", options: ["To understand the size and meaning of change", "To make the graph colourful", "To avoid reading the labels"], answer: 0, explanation: "Axis scale and units are essential to interpretation." },
  ],
  12: [
    { prompt: "What is the best first step in a major project?", hint: "Make the goal actionable.", options: ["Define the reader, outcome, and next action", "Collect everything without a purpose", "Wait until the deadline"], answer: 0, explanation: "A clear outcome and next action make planning possible." },
    { prompt: "What is the difference between correlation and causation?", hint: "One relationship is not proof of mechanism.", options: ["They are identical", "Correlation shows association; causation explains an effect", "Causation is always weaker"], answer: 1, explanation: "Association alone does not establish a causal mechanism." },
    { prompt: "What should an evidence-based conclusion include?", hint: "Be honest about limits.", options: ["Finding, reasoning, and relevant limitations", "Only the strongest-sounding claim", "A conclusion unrelated to the evidence"], answer: 0, explanation: "A responsible conclusion explains the evidence and its limits." },
  ],
};

export function getDiagnosticQuestions(grade: Grade): Question[] { return diagnosticQuestions[grade]; }
