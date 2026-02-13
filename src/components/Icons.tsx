import React from 'react';

type IconProps = {
    className?: string;
};

export const CategoryIcons = {
    burger: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <path d="M2 11h20v2H2z" />
            <path d="M21 13c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2" />
            <path d="M21 17c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2" />
            <path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
        </svg>
    ),
    chicken: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2c4.42 0 8 3.58 8 8 0 2.21-.89 4.21-2.34 5.66L12 21l-5.66-5.34C4.89 14.21 4 12.21 4 10c0-4.42 3.58-8 8-8z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    maria: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    ),
    sandwiches: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ),
    'mac-cheese': (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m19 6-7-4-7 4t0 8l7 4 7-4z" />
            <path d="M12 22v-10" />
            <path d="m19 6-7 4-7-4" />
        </svg>
    ),
    fatuta: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="11" cy="13" r="9" />
            <path d="m15.5 8.5 2-2" />
            <path d="M18.5 6.5a2.5 2.5 0 0 0-5 0" />
            <path d="M16 11l.01-.01" />
        </svg>
    ),
    tnt: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="7" y="2" width="4" height="20" rx="1" />
            <rect x="13" y="2" width="4" height="20" rx="1" />
            <path d="M9 2v4" />
            <path d="M15 2v4" />
            <path d="M22 6c-3 0-6 3-6 3s3 3 6 3" />
        </svg>
    ),
    box: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    ),
    appetizer: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
    ),
    extras: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    ),
    'mix-savory': (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 10s-3.5-3.5-10-3.5S2 10 2 10" />
            <path d="M2 10v4a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-4" />
            <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
    ),
    'mix-sweet': (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            <path d="M19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.1.2-2.15.58-3.13L12 3l6.42 5.87c.38.98.58 2.03.58 3.13z" />
        </svg>
    ),
    drinks: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M7 11v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8" />
            <path d="M18 7H6v4h12V7Z" />
            <path d="M12 2v5" />
            <path d="m15 2 1 1" />
        </svg>
    ),
};

export const UI = {
    Pin: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Phone: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    Smartphone: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    ),
    Chef: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M6 13.8V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9.8" />
            <path d="M6 10h12" />
            <path d="M6 14c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4" />
            <path d="M12 18v4" />
            <path d="M9 22h6" />
        </svg>
    ),
    Camera: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    ),
    Book: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    ),
    Users: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Fire: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 3.5 6.5 1.5 2 2 4.5 2 7a6 6 0 1 1-12 0c0-1.5 0-3 .5-4.5.5 1.5 1.5 3 2.5 4.5Z" />
        </svg>
    ),
    Tools: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    Beef: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
            <path d="M12 18v-4" />
            <path d="M8 14h8" />
        </svg>
    ),
    Bread: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M7 2a2 2 0 0 0-2 2v1a4 4 0 0 0 0 8v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a4 4 0 0 0 0-8V4a2 2 0 0 0-2-2H7z" />
        </svg>
    ),
    Rocket: (props: IconProps) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.5-1 1-4c2 1 3 2 4 4Z" />
            <path d="M15 15v5c-1 0-3-1-4-4 2-1 4-1 4-1Z" />
        </svg>
    ),
};
