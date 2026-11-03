import { toSearchString } from '@/lib/query.js';
import OpeningsPage from '@/views/OpeningsPage.jsx';

export const metadata = { title: "Careers at Scalric — Join Our Team", description: "Explore careers at Scalric and see how we work, what we value and which roles are open.", alternates: { canonical: "/careers" } };

export default async function Page({ searchParams }) {
  return <OpeningsPage search={toSearchString(await searchParams)} />;
}
