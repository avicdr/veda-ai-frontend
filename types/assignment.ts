export type AssignmentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type Assignment = {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  dueDate: string;
  instructions: string;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt: string;
};

export type Question = {
  question: string;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

export type QuestionSection = {
  title: string;
  instruction: string;
  questions: Question[];
};

export type QuestionPaper = {
  _id: string;
  assignmentId: string;
  title: string;
  sections: QuestionSection[];
  generatedAt: string;
};
