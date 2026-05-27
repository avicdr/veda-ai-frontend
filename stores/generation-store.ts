import { create } from 'zustand';
import type { Assignment, QuestionPaper } from '@/types/assignment';

type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed';

type GenerationStore = {
  assignment: Assignment | null;
  paper: QuestionPaper | null;
  status: GenerationStatus;
  progress: number;
  setSnapshot: (snapshot: { assignment: Assignment | null; paper: QuestionPaper | null }) => void;
  setStatus: (status: GenerationStatus) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
};

export const useGenerationStore = create<GenerationStore>((set) => ({
  assignment: null,
  paper: null,
  status: 'pending',
  progress: 0,
  setSnapshot: ({ assignment, paper }) =>
    set({
      assignment,
      paper,
      status: assignment?.status ?? 'pending',
      progress: assignment?.status === 'completed' ? 100 : 0
    }),
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  reset: () => set({ assignment: null, paper: null, status: 'pending', progress: 0 })
}));
