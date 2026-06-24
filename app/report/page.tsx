import type { Metadata } from "next";
import ReportClient from "./ReportClient";

export const metadata: Metadata = {
  title: "Report Abuse & DMCA Takedown Request | Storeflz",
  description: "Submit copyright takedown requests (DMCA) or report malware and prohibited mirror link folders. Storeflz respects safety and copyright policies.",
  alternates: {
    canonical: "https://storeflz.com/report"
  },
  themeColor: "#09090b"
};

export default function ReportPage() {
  return <ReportClient />;
}
