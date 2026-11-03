import { toSearchString } from '@/lib/query.js';
import OpeningsPage from '@/views/OpeningsPage.jsx';

export const metadata = { title: "Open Roles at Scalric — Careers", description: "Browse current open roles at Scalric across engineering, consulting and operations.", alternates: { canonical: "/careers/openings" } };

export default async function Page({ searchParams }) {
  return <OpeningsPage search={toSearchString(await searchParams)} />;
}
