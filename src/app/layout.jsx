import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

export const metadata = {
  title: {
    default: "Deadline",
  },
  
  description: "Um dashboard de gerenciamento de tarefas para você conseguir acompanhar o seu desempenho",
  keywords: ["gerenciar tarefas", "pomodoro", "planejamento", "site para estudos", "site para foco"],
  authors: [{ name: "Laura Sampaio Neves", url: "https://www.linkedin.com/in/laura-sampaio-996222332/" }],
  openGraph: {
    title: "Deadline - dashboard de estudos",
    description: "Um dashboard de gerenciamento de tarefas para você conseguir acompanhar o seu desempenho",
    url: "https://projetobara.vercel.app",
    siteName: "Deadline",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/deadline.svg",
        width: 1200,
        height: 630,
        alt: "Logo da deadline",
      },
    ],
  },
  twitter: {
    card: "card_do_site",
    title: "Deadline",
    description: "Deadline é um site para gerenciamento de tarefas",
    images: ["/capaSite.png"],
  },
  icons: {
    icon: "/deadline.svg",
    shortcut: "/deadline.svg",
    apple: "/deadline.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
          {children}
        <Toaster />
      </body>
    </html>
  );
}
