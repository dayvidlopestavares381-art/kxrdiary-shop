type P = { className?: string }

export const InstagramIcon = ({ className = 'size-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const PinterestIcon = ({ className = 'size-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.64 19.31c-.09-.78-.17-1.98.03-2.83l1.2-5.08s-.3-.62-.3-1.53c0-1.43.83-2.5 1.87-2.5.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.43-.24 1.02.52 1.86 1.53 1.86 1.84 0 3.25-1.94 3.25-4.74 0-2.48-1.78-4.21-4.33-4.21-2.95 0-4.68 2.21-4.68 4.5 0 .89.34 1.85.77 2.37a.3.3 0 0 1 .07.3l-.29 1.17c-.04.19-.15.23-.34.14-1.28-.6-2.08-2.47-2.08-3.97 0-3.23 2.35-6.2 6.77-6.2 3.55 0 6.32 2.53 6.32 5.92 0 3.53-2.23 6.37-5.32 6.37-1.04 0-2.02-.54-2.35-1.18l-.64 2.44c-.23.89-.86 2.01-1.28 2.69A10 10 0 1 0 12 2Z" />
  </svg>
)

export const FacebookIcon = ({ className = 'size-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a21 21 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.9v2.15H7.92v2.94h2.54V21h3.04Z" />
  </svg>
)

export const XIcon = ({ className = 'size-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.58l11.09 14.44Z" />
  </svg>
)

export const WhatsAppIcon = ({ className = 'size-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2.5 21.5l4.65-1.02A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.76.6.62-2.69-.2-.31a8.2 8.2 0 1 1 6.82 3.73Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43l-.76-1.82c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06c0 1.21.88 2.39 1 2.55.12.17 1.74 2.65 4.21 3.72 1.57.68 2.18.74 2.96.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
)
