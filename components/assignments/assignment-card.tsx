'use client';

import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Assignment } from '@/types/assignment';

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

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="relative block h-[161px] rounded-[24px] bg-white px-6 py-6 shadow-[0_18px_45px_rgba(255,255,255,0.3)]">
      <div className="flex items-start justify-between">
        <Link
          href={`/assignments/${assignment._id}`}
          className="text-2xl font-black leading-none tracking-[-0.05em] underline decoration-1 underline-offset-2"
        >
          {assignment.title}
        </Link>

        {/* Three-dots button */}
        <div ref={menuRef} className="relative ml-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen((prev) => !prev);
            }}
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-black/5"
            aria-label="Assignment options"
          >
            <MoreVertical size={25} className="text-[#A5A5A5]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 z-30 w-[160px] rounded-[14px] bg-white p-2 text-sm font-medium shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
              <Link
                href={`/assignments/${assignment._id}`}
                className="block rounded-lg px-3 py-2 text-[#2D2D2D] hover:bg-[#F4F4F4]"
                onClick={() => setMenuOpen(false)}
              >
                View Assignment
              </Link>
              <button
                type="button"
                className="w-full rounded-lg px-3 py-2 text-left text-[#F04438] hover:bg-[#FFF1F0]"
                onClick={() => setMenuOpen(false)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <Link
        href={`/assignments/${assignment._id}`}
        className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-base"
      >
        <p>
          <span className="font-black">Assigned on :</span>{' '}
          <span className="font-medium text-[#868686]">{formatDate(assignment.createdAt)}</span>
        </p>
        <p>
          <span className="font-black">Due :</span>{' '}
          <span className="font-medium text-[#868686]">{formatDate(assignment.dueDate)}</span>
        </p>
      </Link>
    </div>
  );
}
