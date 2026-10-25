
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GhoshK | India Entry Compliance Advisor",
  description: "For foreign companies entering India: mandatory compliance, MCA, RBI, GST, FEMA - grounded in law, cited by rule ID. By GhoshK, Chartered Accountants.",
  metadataBase: new URL("https://www.ghoshk.com"),
  openGraph: {
    title: "India Entry Compliance Advisor - By GhoshK",
    description: "Mandatory compliance for foreign companies entering India. MCA, RBI, GST, FEMA, EPFO - with source citations. Audit ready.",
    url: "https://www.ghoshk.com/india-entry",
    siteName: "GhoshK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "India Entry Compliance Advisor - By GhoshK",
    description: "Mandatory compliance for foreign companies entering India. Audit ready, source cited.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
