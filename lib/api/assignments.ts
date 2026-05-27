import type { Assignment, QuestionPaper } from '@/types/assignment';
import { demoAssignments, demoPaper, getDemoAssignment } from '@/lib/demo-data';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export type CreateAssignmentPayload = {
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

export async function createAssignment(payload: CreateAssignmentPayload): Promise<{ assignment: Assignment }> {
  try {
    const response = await fetch(`${apiUrl}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to create assignment');
    }

    return response.json() as Promise<{ assignment: Assignment }>;
  } catch {
    // Backend unavailable – return a demo assignment so the UI keeps working
    const demoAssignment: Assignment = {
      _id: `demo-${Date.now()}`,
      title: payload.title,
      subject: payload.subject,
      classLevel: payload.classLevel,
      dueDate: payload.dueDate,
      instructions: payload.instructions,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return { assignment: demoAssignment };
  }
}

export async function listAssignments(): Promise<{ assignments: Assignment[] }> {
  try {
    const response = await fetch(`${apiUrl}/assignments`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to load assignments');
    }

    return response.json() as Promise<{ assignments: Assignment[] }>;
  } catch {
    // Backend unavailable – return demo data so the page renders
    return { assignments: demoAssignments };
  }
}

export async function fetchAssignment(assignmentId: string): Promise<{ assignment: Assignment; paper: QuestionPaper | null }> {
  try {
    const response = await fetch(`${apiUrl}/assignments/${assignmentId}`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to load assignment');
    }

    return response.json() as Promise<{ assignment: Assignment; paper: QuestionPaper | null }>;
  } catch {
    // Backend unavailable – return demo data
    const assignment = getDemoAssignment(assignmentId);
    const paper = assignment.status === 'completed' ? { ...demoPaper, assignmentId } : null;
    return { assignment, paper };
  }
}

export async function regenerateAssignment(assignmentId: string): Promise<{ assignment: Assignment }> {
  try {
    const response = await fetch(`${apiUrl}/assignments/${assignmentId}/regenerate`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Failed to regenerate assignment');
    }

    return response.json() as Promise<{ assignment: Assignment }>;
  } catch {
    // Backend unavailable – return current demo assignment
    return { assignment: getDemoAssignment(assignmentId) };
  }
}
