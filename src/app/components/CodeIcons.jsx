const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function NavIcon({ name, className = "h-4 w-4" }) {
  if (name === "home") {
    return (
      <svg {...strokeProps} className={className}>
        <path d="M4 10.5 12 4l8 6.5V20h-5v-5.5H9V20H4v-9.5Z" />
      </svg>
    );
  }

  if (name === "ranking") {
    return (
      <svg {...strokeProps} className={className}>
        <path d="M5 20V11M12 20V5M19 20v-6" />
        <path d="M3.5 20h17" />
      </svg>
    );
  }

  if (name === "hall") {
    return (
      <svg {...strokeProps} className={className}>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
        <path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3" />
        <path d="M12 13v4M8.5 20h7M10 20v-3h4v3" />
      </svg>
    );
  }

  if (name === "discord") {
    return (
      <svg {...strokeProps} className={className}>
        <path d="M4.5 5.5h15v10.5h-9.5L4.5 20V5.5Z" />
        <path d="M8.5 10.5h.01M15.5 10.5h.01" />
        <path d="M8.5 13.5c2.2 1.3 4.8 1.3 7 0" />
      </svg>
    );
  }

  return null;
}

export function SearchIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 4.5 4.5" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="m14.5 6-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="m9.5 6 6 6-6 6" />
    </svg>
  );
}

export function CopyIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 5.5h-11v11" />
    </svg>
  );
}

export function CloseIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function LogoMark({ className = "h-7 w-7" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#DC2626" />
      <path
        d="M11 8v16M21.5 8l-8 8 8 8"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function TrashIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="M5 7h14M9.5 7V4.5h5V7M7 7l1 13h8l1-13" />
      <path d="M10.5 10.5v6M13.5 10.5v6" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...strokeProps} className={className}>
      <path d="m5 12.5 4.5 4.5L19 6.5" />
    </svg>
  );
}
