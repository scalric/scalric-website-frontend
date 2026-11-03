import { toSearchString } from '@/lib/query.js';
import ContactPage from '@/views/ContactPage.jsx';

export const metadata = { title: "Contact Scalric — Talk to Our Team", description: "Tell us about your challenge. Contact Scalric for technology, data, AI and consulting support.", alternates: { canonical: "/contact" } };

export default async function Page({ searchParams }) {
  return <ContactPage search={toSearchString(await searchParams)} />;
}
