import type { Assignment, QuestionPaper } from '@/types/assignment';

export const demoAssignments: Assignment[] = [
  {
    _id: 'demo-001',
    title: 'CBSE Grade 8 Science – Chemical Effects',
    subject: 'Science',
    classLevel: 'Class 8',
    dueDate: '2026-06-15T00:00:00.000Z',
    instructions:
      'Generate a 3-hour exam covering electroplating, chemical effects of electric current, and electrolysis. Mix easy, medium, and hard questions.',
    status: 'completed',
    createdAt: '2026-05-20T09:00:00.000Z',
    updatedAt: '2026-05-20T09:05:00.000Z'
  },
  {
    _id: 'demo-002',
    title: 'English Literature – Poetry Analysis',
    subject: 'English',
    classLevel: 'Class 10',
    dueDate: '2026-06-20T00:00:00.000Z',
    instructions:
      'Focus on comprehension and critical analysis of NCERT poems. Include short answer and long answer questions.',
    status: 'completed',
    createdAt: '2026-05-22T11:30:00.000Z',
    updatedAt: '2026-05-22T11:35:00.000Z'
  },
  {
    _id: 'demo-003',
    title: 'Mathematics – Algebra & Geometry',
    subject: 'Mathematics',
    classLevel: 'Class 9',
    dueDate: '2026-06-25T00:00:00.000Z',
    instructions:
      'Cover linear equations, coordinate geometry, and basic trigonometry. Include numerical problems and diagram-based questions.',
    status: 'processing',
    createdAt: '2026-05-27T08:00:00.000Z',
    updatedAt: '2026-05-27T08:01:00.000Z'
  },
  {
    _id: 'demo-004',
    title: 'History – Modern India',
    subject: 'Social Science',
    classLevel: 'Class 8',
    dueDate: '2026-07-01T00:00:00.000Z',
    instructions:
      'Focus on Indian independence movement, important leaders, and key events. Include MCQs, short and long answer questions.',
    status: 'completed',
    createdAt: '2026-05-25T14:00:00.000Z',
    updatedAt: '2026-05-25T14:06:00.000Z'
  }
];

export const demoPaper: QuestionPaper = {
  _id: 'demo-paper-001',
  assignmentId: 'demo-001',
  title: 'CBSE Grade 8 Science – Chemical Effects of Electric Current\nQuestion Paper',
  generatedAt: '2026-05-20T09:05:00.000Z',
  sections: [
    {
      title: 'Section A – Multiple Choice Questions',
      instruction: 'Choose the correct answer from the options given below.',
      questions: [
        {
          question:
            'Which of the following liquids is a good conductor of electricity?\n(a) Pure water  (b) Lemon juice  (c) Distilled water  (d) Oil',
          marks: 1,
          difficulty: 'Easy'
        },
        {
          question:
            'The process of depositing a thin layer of a metal over another metal using electricity is called:\n(a) Electrolysis  (b) Electroplating  (c) Galvanization  (d) Oxidation',
          marks: 1,
          difficulty: 'Easy'
        },
        {
          question:
            'In an electrolytic cell, positive ions move towards the:\n(a) Anode  (b) Cathode  (c) Electrolyte  (d) External circuit',
          marks: 1,
          difficulty: 'Medium'
        },
        {
          question:
            'During the electrolysis of brine, which gas is produced at the anode?\n(a) Hydrogen  (b) Oxygen  (c) Chlorine  (d) Nitrogen',
          marks: 1,
          difficulty: 'Medium'
        }
      ]
    },
    {
      title: 'Section B – Short Answer Questions',
      instruction: 'Answer each question in 3–4 sentences.',
      questions: [
        {
          question: 'Define electroplating. State two commercial applications of electroplating in everyday life.',
          marks: 3,
          difficulty: 'Easy'
        },
        {
          question:
            'Explain why copper sulfate solution can conduct electricity. What role do the ions play in this process?',
          marks: 3,
          difficulty: 'Medium'
        },
        {
          question:
            'What happens at each electrode during the electrolysis of water? Write the half-reactions at the anode and cathode.',
          marks: 4,
          difficulty: 'Hard'
        }
      ]
    },
    {
      title: 'Section C – Long Answer / Diagram-Based Questions',
      instruction:
        'Answer in detail. Draw a neat, labelled diagram wherever required.',
      questions: [
        {
          question:
            'Draw a labelled diagram of an electrolytic cell used to demonstrate the chemical effects of electric current. Describe the observations you would make during the experiment and explain them scientifically.',
          marks: 5,
          difficulty: 'Hard'
        },
        {
          question:
            'A student wants to electroplate a steel spoon with silver for a science project. (i) Name the electrolyte she should use. (ii) Identify the anode and cathode. (iii) Describe the step-by-step process she should follow. (iv) State two precautions she must take during the experiment.',
          marks: 5,
          difficulty: 'Hard'
        }
      ]
    }
  ]
};

export function getDemoAssignment(id: string): Assignment {
  return (
    demoAssignments.find((a) => a._id === id) ?? {
      ...demoAssignments[0]!,
      _id: id
    }
  );
}
