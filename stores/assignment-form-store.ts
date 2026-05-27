import { create } from 'zustand';

type AssignmentDraft = {
  title: string;
  subject: string;
  classLevel: string;
  dueDate: string;
  questionTypes: string[];
  numberOfQuestions: number;
  marks: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  instructions: string;
};

type AssignmentFormStore = {
  draft: AssignmentDraft;
  setDraft: (draft: AssignmentDraft) => void;
  hydrateDraft: () => AssignmentDraft;
};

const defaultDraft: AssignmentDraft = {
  title: '',
  subject: '',
  classLevel: '',
  dueDate: '',
  questionTypes: ['Short answer', 'Long answer'],
  numberOfQuestions: 10,
  marks: 50,
  difficultyDistribution: {
    easy: 30,
    medium: 50,
    hard: 20
  },
  instructions: ''
};

export const useAssignmentFormStore = create<AssignmentFormStore>((set, get) => ({
  draft: defaultDraft,
  setDraft: (draft) => set({ draft }),
  hydrateDraft: () => get().draft
}));
