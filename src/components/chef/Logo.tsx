export function Logo() {
  return (
    <span className="flex items-center gap-2 select-none">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-chef-green" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2Zm0 2.6 5.6 3.1-5.6 3.2-5.6-3.2L12 4.6ZM6 9.6l5 2.9v6.1l-5-2.8V9.6Zm7 9v-6.1l5-2.9v6.2l-5 2.8Z"
        />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-chef-chrome-foreground">
        Progress<span className="mx-1 font-normal opacity-80">Chef</span>
        <span className="font-semibold">360</span>
        <sup className="ml-0.5 text-[8px] opacity-70">™</sup>
      </span>
    </span>
  );
}
