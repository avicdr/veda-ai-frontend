'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, CalendarPlus, ChevronDown, CloudUpload, Mic, Minus, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppShell } from '@/components/layout/app-shell';
import { createAssignment } from '@/lib/api/assignments';
import { useAssignmentFormStore } from '@/stores/assignment-form-store';

const questionTypeOptions = ['Multiple Choice Questions', 'Short Questions', 'Diagram/Graph-Based Questions', 'Numerical Problems'];

const assignmentSchema = z.object({
  dueDate: z.string().min(1, 'Due date is required'),
  instructions: z.string().min(1, 'Instructions are required')
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

type QuestionRow = {
  type: string;
  count: number;
  marks: number;
};

const initialRows: QuestionRow[] = [
  { type: 'Multiple Choice Questions', count: 4, marks: 1 },
  { type: 'Short Questions', count: 3, marks: 2 },
  { type: 'Diagram/Graph-Based Questions', count: 5, marks: 5 },
  { type: 'Numerical Problems', count: 5, marks: 5 }
];

export function AssignmentFormShell() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [rows, setRows] = useState<QuestionRow[]>(initialRows);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { setDraft } = useAssignmentFormStore();
  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      dueDate: '',
      instructions: ''
    }
  });

  const totals = useMemo(
    () => ({
      questions: rows.reduce((sum, row) => sum + row.count, 0),
      marks: rows.reduce((sum, row) => sum + row.count * row.marks, 0)
    }),
    [rows]
  );

  async function onSubmit(values: AssignmentFormValues) {
    if (fileError) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        title: `${rows[0]?.type ?? 'Question'} Assessment`,
        subject: 'Science',
        classLevel: 'Class 8',
        dueDate: values.dueDate,
        questionTypes: rows.map((row) => row.type),
        numberOfQuestions: totals.questions,
        marks: totals.marks,
        difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
        instructions: values.instructions
      };

      setDraft({
        ...payload,
        questionTypes: payload.questionTypes,
        difficultyDistribution: payload.difficultyDistribution
      });

      const response = await createAssignment(payload);
      router.push(`/assignments/${response.assignment._id}`);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setFileName(null);
      setFileError(null);
      return;
    }

    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      setFileName(null);
      setFileError('Upload a JPEG, PNG, or PDF file');
      return;
    }

    setFileName(file.name);
    setFileError(null);
  }

  function updateRow(index: number, key: keyof QuestionRow, value: number | string) {
    setRows((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row)));
  }

  function removeRow(index: number) {
    setRows((current) => current.filter((_, rowIndex) => rowIndex !== index));
  }

  return (
    <AppShell>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-[1120px]">
        {/* Desktop header */}
        <div className="mb-8 hidden lg:block">
          <div className="mb-9 flex items-start gap-3">
            <span className="mt-2 h-5 w-5 rounded-full border-[5px] border-[#8DE0A4] bg-[#28C864]" />
            <div>
              <h1 className="text-[22px] font-black tracking-[-0.04em] text-[#2D2D2D]">Create Assignment</h1>
              <p className="mt-1 text-sm font-medium text-[#9B9B9B]">Set up a new assignment for your students</p>
            </div>
          </div>
          <div className="mx-auto flex max-w-[820px] gap-2">
            <div className="h-1 flex-1 rounded-full bg-[#575757]" />
            <div className="h-1 flex-1 rounded-full bg-[#D7D7D7]" />
          </div>
        </div>

        {/* Mobile header */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => router.back()}
            className="grid h-12 w-12 place-items-center rounded-full bg-[#EFEFEF]"
          >
            <ArrowLeft size={26} />
          </button>
          <h1 className="text-base font-black tracking-[-0.04em]">Create Assignment</h1>
          <span className="h-12 w-12" />
        </div>
        <div className="mb-6 flex gap-2 lg:hidden">
          <div className="h-1 flex-1 rounded-full bg-[#575757]" />
          <div className="h-1 flex-1 rounded-full bg-[#E7E7E7]" />
        </div>

        <section className="rounded-[30px] border border-white/80 bg-[#ECECEC] px-5 py-7 shadow-[0_20px_65px_rgba(255,255,255,0.36)] lg:rounded-[36px] lg:px-8 lg:py-8">
          <h2 className="text-xl font-black tracking-[-0.04em] lg:text-[22px]">Assignment Details</h2>
          <p className="mt-2 text-sm font-medium text-[#8C8C8C]">Basic information about your assignment</p>

          {/* File upload */}
          <label className="mt-8 flex h-[202px] cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#C8C8C8] bg-white/35 text-center lg:h-[186px]">
            <CloudUpload size={30} strokeWidth={2.7} />
            <p className="mt-6 text-base font-bold">{fileName ?? 'Choose a file or drag & drop it here'}</p>
            <p className="mt-2 text-sm font-medium text-[#B0B0B0]">JPEG, PNG, PDF – up to 10MB</p>
            <span className="mt-5 rounded-full bg-white px-7 py-2 text-sm font-bold">Browse Files</span>
            <input type="file" accept="image/png,image/jpeg,application/pdf" className="sr-only" onChange={handleFileChange} />
          </label>
          {fileError ? <p className="mt-2 text-sm font-semibold text-rose-700">{fileError}</p> : null}

          <p className="mt-4 text-center text-base font-bold text-[#888]">Upload images of your preferred document/image</p>

          {/* Due date */}
          <label className="mt-6 block">
            <span className="text-base font-black">Due Date</span>
            <div className="mt-3 flex h-11 items-center rounded-full border border-[#D5D5D5] bg-[#EAEAEA] px-4">
              <input
                {...form.register('dueDate')}
                type="date"
                className="min-w-0 flex-1 bg-transparent text-base font-bold text-[#2D2D2D] outline-none placeholder:text-[#B5B5B5] [color-scheme:light]"
              />
              <CalendarPlus size={22} className="pointer-events-none" />
            </div>
            {form.formState.errors.dueDate && (
              <p className="mt-1 text-sm font-semibold text-rose-700">{form.formState.errors.dueDate.message}</p>
            )}
          </label>

          {/* Question types – desktop column headers */}
          <div className="mt-5 hidden grid-cols-[1fr_132px_104px] gap-5 text-base font-black lg:grid">
            <span>Question Type</span>
            <span className="text-center">No. of Questions</span>
            <span className="text-center">Marks</span>
          </div>

          <div className="mt-3 space-y-4 lg:space-y-3">
            {rows.map((row, index) => (
              <QuestionTypeRow
                key={`${row.type}-${index}`}
                row={row}
                index={index}
                onChange={updateRow}
                onRemove={removeRow}
                compact={false}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setRows((current) => [...current, { type: questionTypeOptions[0] ?? 'Question Type', count: 1, marks: 1 }])}
            className="mt-5 inline-flex items-center gap-3 text-sm font-black lg:text-base"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#252525] text-white">
              <Plus size={24} />
            </span>
            Add Question Type
          </button>

          <div className="mt-6 flex flex-col items-end gap-2 text-base font-black">
            <p>Total Questions : {totals.questions}</p>
            <p>Total Marks : {totals.marks}</p>
          </div>

          {/* Instructions */}
          <label className="mt-6 block">
            <span className="text-base font-black">Additional Information (For better output)</span>
            <div className="mt-3 flex min-h-[96px] rounded-[16px] border border-dashed border-[#D5D5D5] bg-white/30 px-4 py-4">
              <textarea
                {...form.register('instructions')}
                placeholder="e.g Generate a question paper for 3 hour exam duration..."
                className="min-h-[80px] flex-1 resize-none bg-transparent text-base outline-none placeholder:text-[#8F8F8F]"
              />
              <Mic size={21} className="mt-auto" />
            </div>
            {form.formState.errors.instructions && (
              <p className="mt-1 text-sm font-semibold text-rose-700">{form.formState.errors.instructions.message}</p>
            )}
          </label>

          {submitError && (
            <p className="mt-4 text-sm font-semibold text-rose-700">{submitError}</p>
          )}
        </section>

        <div className="mt-7 flex items-center justify-between lg:mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-base font-bold"
          >
            <ArrowLeft size={21} />
            Previous
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#171717] px-7 text-base font-bold text-white disabled:opacity-60"
          >
            {submitting ? 'Creating…' : 'Next'}
            {!submitting && <ArrowRight size={21} />}
          </button>
        </div>
      </form>
    </AppShell>
  );
}

function QuestionTypeRow({
  row,
  index,
  onChange,
  onRemove
}: {
  row: QuestionRow;
  index: number;
  onChange: (index: number, key: keyof QuestionRow, value: string | number) => void;
  onRemove: (index: number) => void;
  compact: boolean;
}) {
  return (
    <div className="relative grid gap-3 rounded-[22px] bg-white p-3 lg:grid-cols-[1fr_28px_132px_104px] lg:items-center lg:rounded-none lg:bg-transparent lg:p-0">
      <label className="flex h-11 items-center rounded-full bg-white px-4 text-sm font-medium lg:bg-white lg:text-base">
        <select value={row.type} onChange={(event) => onChange(index, 'type', event.target.value)} className="min-w-0 flex-1 appearance-none bg-transparent outline-none">
          {questionTypeOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={18} />
      </label>
      <button type="button" onClick={() => onRemove(index)} className="hidden justify-self-center lg:block">
        <X size={18} />
      </button>
      <Counter value={row.count} onChange={(value) => onChange(index, 'count', value)} />
      <Counter value={row.marks} onChange={(value) => onChange(index, 'marks', value)} />
      <button type="button" onClick={() => onRemove(index)} className="absolute right-7 mt-1 lg:hidden">
        <X size={18} />
      </button>
    </div>
  );
}

function Counter({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="grid h-11 grid-cols-[1fr_36px_1fr] items-center rounded-full bg-white text-center text-lg font-black">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} className="text-[#BDBDBD]">
        <Minus size={18} className="mx-auto" />
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="text-[#D0D0D0]">
        <Plus size={18} className="mx-auto" />
      </button>
    </div>
  );
}
