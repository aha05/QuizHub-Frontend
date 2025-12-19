import React from "react"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

// If you want Google Fonts, import them in CSS or via @import in globals.css
// Example in globals.css:
// @import url('https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap');

export const metadata = {
  title: "QuizHub - Test Your Knowledge",
  description: "Challenge yourself with engaging quizzes on QuizHub",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
