/**
 * ROOT LAYOUT
 * 
 * Responsibility:
 * - Define the root HTML structure for the entire application
 * - Wrap all pages with common providers (theme, auth, etc.)
 * - Include global metadata (title, description, viewport)
 * - Load global fonts and base styles
 */

import type { Metadata } from "next";

import "./globals.css";
import "katex/dist/katex.min.css";
import AppChrome from "./components/AppChrome";

export const metadata: Metadata = {
    title: "CalTronic V2",
    description: "Advanced learning system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="dark" suppressHydrationWarning>
            <head>
                <script
                    // Minimal theme boot: default is dark; allow persisted light and eye-comfort.
                    dangerouslySetInnerHTML={{
                        __html:
                            "(function(){try{var t=localStorage.getItem('caltronic:theme');if(t==='light'||t==='dark'||t==='eye-comfort'){document.documentElement.dataset.theme=t;}}catch(e){}})();",
                    }}
                />
            </head>
            <body suppressHydrationWarning>
                {/* TODO: Add global providers here (ThemeProvider, AuthProvider, etc.) */}
                <AppChrome>{children}</AppChrome>
            </body>
        </html>
    );
}
