export default function StressReliefLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3">
      <svg
        viewBox="0 0 96 96"
        className={compact ? "h-10 w-10" : "h-12 w-12"}
        aria-hidden="true"
        role="img"
      >
        <defs>
          <linearGradient id="stress-relief-sage" x1="12" x2="82" y1="18" y2="80">
            <stop stopColor="#9EAA83" />
            <stop offset="1" stopColor="#6F7F5E" />
          </linearGradient>
          <linearGradient id="stress-relief-gold" x1="62" x2="86" y1="18" y2="82">
            <stop stopColor="#E7C262" />
            <stop offset="1" stopColor="#CDA25A" />
          </linearGradient>
        </defs>
        <path
          d="M24 67C10 49 19 22 44 15c14-4 29 0 40 10C67 18 42 23 30 42c-5 8-7 17-6 25Z"
          fill="url(#stress-relief-sage)"
        />
        <path
          d="M21 66c17 11 32 5 48 1-11 19-35 22-48-1Z"
          fill="url(#stress-relief-sage)"
        />
        <path
          d="M39 70c8 5 18 5 28-1-8 10-20 11-28 1Z"
          fill="#FFFFFF"
        />
        <path
          d="M49 23c7 8 8 16 7 24-.5 5 3 8 7 12 4 4 2 8-3 10-3 1-4 3-2 6 2 4-1 7-8 8"
          fill="none"
          stroke="#303332"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M34 43c5 3 10 3 14-1" fill="none" stroke="#303332" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M63 52c9 1 14-9 25-5M63 62c10 0 16-8 28-5"
          fill="none"
          stroke="url(#stress-relief-sage)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="76" cy="34" r="8" fill="url(#stress-relief-gold)" />
        <path d="M53 82c17 1 30-9 34-28" fill="none" stroke="url(#stress-relief-gold)" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <span className={compact ? "text-xl font-semibold tracking-normal text-ink" : "text-2xl font-semibold tracking-normal text-ink"}>
        Stress Relief
      </span>
    </div>
  );
}
