import type { Assignment, QuestionPaper } from '@/types/assignment';
import { io } from 'socket.io-client';

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:4000';

type AssignmentSocketHandlers = {
  onStarted: () => void;
  onProgress: (progress: number) => void;
  onCompleted: (payload: { assignmentId: string; assignment?: Assignment; paper: QuestionPaper | null }) => void;
  onFailed: (payload: { assignmentId: string; message?: string }) => void;
};

export function connectAssignmentSocket(assignmentId: string, handlers: AssignmentSocketHandlers) {
  const socket = io(socketUrl, { transports: ['websocket'] });

  socket.on('connect', () => {
    socket.emit('assignment:join', assignmentId);
  });

  socket.on('generation-started', handlers.onStarted);
  socket.on('generation-progress', (payload: { progress: number }) => handlers.onProgress(payload.progress));
  socket.on('generation-completed', handlers.onCompleted);
  socket.on('generation-failed', handlers.onFailed);

  return socket;
}
