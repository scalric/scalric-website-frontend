import { toSearchString } from '@/lib/query.js';
import InsightsPage from '@/views/InsightsPage.jsx';

export const metadata = { title: "Insights on Technology, AI & Business | Scalric", description: "Practical articles from Scalric on AI, data, automation and process, written to help teams make better technology decisions.", alternates: { canonical: "/insights" } };

export default async function Page({ searchParams }) {
  return <InsightsPage search={toSearchString(await searchParams)} />;
}
