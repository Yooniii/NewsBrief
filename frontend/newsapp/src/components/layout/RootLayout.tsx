import { ReactNode } from "react"
import { Header } from "@/components/header"
import "@/components/layout/index.css"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="root-layout">
      <Header />
      {children}
    </div>
  );
}
