'use client';
import { useEffect, useRef } from 'react';
import katex from 'katex';

interface LiveFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export default function LiveFormula({ formula, displayMode = true, className = '' }: LiveFormulaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(formula, ref.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
      } catch {
        if (ref.current) ref.current.textContent = formula;
      }
    }
  }, [formula, displayMode]);

  return <div ref={ref} className={className} />;
}
