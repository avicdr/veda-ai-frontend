import { AppShell } from '@/components/layout/app-shell';
import { AssignmentListClient } from '@/components/assignments/assignment-list-client';
import { listAssignments } from '@/lib/api/assignments';

export default async function DashboardPage() {
  const { assignments } = await listAssignments();

  return (
    <AppShell>
      <main className="mx-auto max-w-none lg:mx-0">
        <AssignmentListClient initialAssignments={assignments} />
      </main>
    </AppShell>
  );
}
