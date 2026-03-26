"use client";

import React, { useMemo } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import 'katex/dist/katex.min.css';

import katex from 'katex';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface LiveFormulaProps {
  math: string;
  param?: string | string[]; // Which parameters trigger highlight
  block?: boolean;
}

export default function LiveFormula({ math, param, block = false }: LiveFormulaProps) {
  const activeHighlight = useSimulationStore((state) => state.activeHighlight);

  const isHighlighted = useMemo(() => {
    if (!param || !activeHighlight) return false;
    if (Array.isArray(param)) {
      return param.includes(activeHighlight);
    }
    return param === activeHighlight;
  }, [param, activeHighlight]);

  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch {
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={cn(
        "transition-all duration-300 ease-in-out inline-block rounded",
        isHighlighted ? "bg-yellow-200 dark:bg-yellow-900/50 shadow-[0_0_8px_rgba(253,224,71,0.5)]" : "bg-transparent",
        block ? "my-4 text-center w-full overflow-x-auto py-2" : "px-1 mx-0.5"
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
