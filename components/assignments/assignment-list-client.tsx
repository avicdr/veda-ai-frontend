'use client';

import Link from 'next/link';
import { ArrowLeft, FileSearch, Filter, Plus, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { AssignmentCard } from './assignment-card';
import type { Assignment } from '@/types/assignment';

interface AssignmentListClientProps {
  initialAssignments: Assignment[];
}

export function AssignmentListClient({ initialAssignments }: AssignmentListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssignments = useMemo(() => {
    if (!searchQuery.trim()) return initialAssignments;
    const query = searchQuery.toLowerCase().trim();
    return initialAssignments.filter((assignment) =>
      assignment.title.toLowerCase().includes(query)
    );
  }, [initialAssignments, searchQuery]);

  if (initialAssignments.length === 0) {
    return (
      <>
        {/* Desktop Empty State */}
        <section className="hidden lg:block">
          <DashboardHeading hasAssignments={false} />
          <DesktopEmptyState />
        </section>

        {/* Mobile Empty State */}
        <section className="lg:hidden">
          <MobileEmptyState />
        </section>
      </>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <section className="hidden lg:block">
        <DashboardHeading hasAssignments={true} />
        
        {/* Desktop Filters */}
        <div className="mb-3 flex h-16 items-center justify-between rounded-[20px] bg-white px-5">
          <button className="flex items-center gap-2 text-sm font-bold text-[#A8A8A8]">
            <Filter size={20} />
            Filter By
          </button>
          <label className="flex h-11 w-[380px] items-center gap-3 rounded-full border border-[#D5D5D5] px-5 text-sm font-bold text-[#A8A8A8]">
            <Search size={22} />
            <input
              className="w-full bg-transparent outline-none text-[#2D2D2D]"
              placeholder="Search Assignment"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>

        {filteredAssignments.length > 0 ? (
          <section className="grid grid-cols-2 gap-3">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment._id} assignment={assignment} />
            ))}
          </section>
        ) : (
          <div className="flex h-[300px] flex-col items-center justify-center rounded-[24px] bg-white p-6 text-center">
            <Search size={48} className="mb-4 text-[#A8A8A8]" />
            <h3 className="text-lg font-bold text-[#2D2D2D]">No matching assignments</h3>
            <p className="mt-1 text-sm text-[#868686]">Try adjusting your search query.</p>
          </div>
        )}

        <CreateFloatingButton />
      </section>

      {/* Mobile Layout */}
      <section className="lg:hidden">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="grid h-12 w-12 place-items-center rounded-full bg-[#EFEFEF]">
            <ArrowLeft size={26} />
          </Link>
          <h1 className="text-xl font-black tracking-[-0.04em]">Assignments</h1>
          <span className="h-12 w-12" />
        </div>

        {/* Mobile Filters */}
        <div className="mb-5 flex h-16 items-center gap-3 rounded-[18px] bg-white px-4">
          <button className="flex items-center gap-2 text-sm font-medium text-[#9C9C9C]">
            <Filter size={20} />
            Filter
          </button>
          <label className="ml-auto flex h-11 flex-1 items-center gap-3 rounded-full border border-[#D1D1D1] px-4 text-sm text-[#B4B4B4]">
            <Search size={20} />
            <input
              className="min-w-0 flex-1 bg-transparent outline-none text-[#2D2D2D]"
              placeholder="Search Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>

        {filteredAssignments.length > 0 ? (
          <section className="space-y-5">
            {filteredAssignments.map((assignment) => (
              <Link
                href={`/assignments/${assignment._id}`}
                key={assignment._id}
                className="block rounded-[22px] bg-white px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-black tracking-[-0.05em] underline decoration-1 underline-offset-2">
                    {assignment.title}
                  </h2>
                  <span className="shrink-0 text-sm font-bold text-[#FF572A]">View &rarr;</span>
                </div>
                <div className="mt-2">
                  <StatusBadge status={assignment.status} />
                </div>
                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-base">
                  <p>
                    <span className="font-black">Assigned on :</span>{' '}
                    <span className="text-[#868686]">{formatDate(assignment.createdAt)}</span>
                  </p>
                  <p>
                    <span className="font-black">Due :</span>{' '}
                    <span className="text-[#868686]">{formatDate(assignment.dueDate)}</span>
                  </p>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="flex h-[250px] flex-col items-center justify-center rounded-[22px] bg-white p-6 text-center">
            <Search size={40} className="mb-3 text-[#A8A8A8]" />
            <h3 className="text-base font-bold text-[#2D2D2D]">No matching assignments</h3>
            <p className="mt-1 text-xs text-[#868686]">Try adjusting your search query.</p>
          </div>
        )}

        <Link
          href="/assignments/new"
          className="fixed bottom-[104px] right-3 z-20 grid h-14 w-14 place-items-center rounded-full bg-white text-[#FF572A] shadow-[0_18px_50px_rgba(0,0,0,0.15)]"
        >
          <Plus size={29} strokeWidth={2.3} />
        </Link>
      </section>
    </>
  );
}

function DashboardHeading({ hasAssignments }: { hasAssignments: boolean }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className="mt-3 h-5 w-5 rounded-full border-[5px] border-[#8DE0A4] bg-[#28C864]" />
      <div>
        <h1 className="text-[22px] font-black tracking-[-0.04em] text-[#2D2D2D]">Assignments</h1>
        <p className="mt-1 text-sm font-medium text-[#9B9B9B]">
          {hasAssignments
            ? 'Manage and create assignments for your classes.'
            : 'Create your first assignment to get started.'}
        </p>
      </div>
    </div>
  );
}

function DesktopEmptyState() {
  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center text-center">
      <div className="max-w-[480px]">
        <EmptyIllustration />
        <h2 className="mt-8 text-2xl font-black tracking-[-0.04em] text-[#2D2D2D]">No assignments yet</h2>
        <p className="mt-3 text-base leading-6 text-[#787878]">
          Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
        </p>
        <Link
          href="/assignments/new"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#171717] px-7 text-base font-bold text-white"
        >
          <Plus size={22} />
          Create Your First Assignment
        </Link>
      </div>
    </div>
  );
}

function MobileEmptyState() {
  return (
    <div className="flex min-h-[calc(100vh-180px)] items-center justify-center text-center">
      <div>
        <EmptyIllustration />
        <h2 className="mt-8 text-xl font-black tracking-[-0.04em] text-[#2D2D2D]">No assignments yet</h2>
        <p className="mt-4 text-base leading-6 text-[#787878]">
          Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
        </p>
        <Link
          href="/assignments/new"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#171717] px-7 text-base font-bold text-white"
        >
          <Plus size={22} />
          Create Your First Assignment
        </Link>
      </div>
      <Link
        href="/assignments/new"
        className="fixed bottom-[104px] right-3 z-20 grid h-14 w-14 place-items-center rounded-full bg-white text-[#FF572A] shadow-[0_18px_50px_rgba(0,0,0,0.15)]"
      >
        <Plus size={29} strokeWidth={2.3} />
      </Link>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    completed: { label: 'Completed', className: 'bg-[#DDF7E8] text-[#168A4A]' },
    processing: { label: 'Generating…', className: 'bg-[#FFF2CC] text-[#9A6700]' },
    pending: { label: 'Pending', className: 'bg-[#F0F0F0] text-[#666]' },
    failed: { label: 'Failed', className: 'bg-[#FFE4E6] text-[#BE123C]' }
  };
  const { label, className } = map[status] ?? map.pending!;
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${className}`}>
      {label}
    </span>
  );
}

function CreateFloatingButton() {
  return (
    <Link
      href="/assignments/new"
      className="fixed bottom-5 left-1/2 z-20 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-[#171717] px-7 text-base font-bold text-white shadow-[0_-18px_80px_rgba(255,255,255,0.75)]"
    >
      <Plus size={22} />
      Create Assignment
    </Link>
  );
}

function EmptyIllustration() {
  return (
    <div className="mx-auto grid h-[250px] w-[250px] place-items-center rounded-full bg-white/55 text-[#2D2D2D]">
      <div className="relative">
        <FileSearch size={124} strokeWidth={1.6} className="text-[#CFC6E4]" />
        <span className="absolute left-12 top-11 text-6xl font-black text-[#FF4040]">x</span>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
    .format(date)
    .replace(/\//g, '-');
}
