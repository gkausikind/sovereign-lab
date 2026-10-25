
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "India Entry Compliance Advisor | GhoshK",
  description: "Foreign company entering India? Check mandatory MCA, RBI, GST, FEMA, EPFO compliance with citations. By GhoshK.",
  openGraph: {
    title: "India Entry Compliance Advisor | GhoshK",
    description: "Mandatory compliance for foreign companies entering India. MCA, RBI, GST, FEMA - audit ready.",
    url: "https://www.ghoshk.com/india-entry",
    siteName: "GhoshK",
    type: "website",
  },
};
export default function IndiaEntryLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
