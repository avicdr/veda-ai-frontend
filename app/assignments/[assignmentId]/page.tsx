import { QuestionPaperShell } from '@/components/question-paper/question-paper-shell';

type Props = {
  params: Promise<{ assignmentId: string }>;
};

export default async function AssignmentResultPage({ params }: Props) {
  const { assignmentId } = await params;
  return <QuestionPaperShell assignmentId={assignmentId} />;
}
