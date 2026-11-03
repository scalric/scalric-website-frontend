import { RoleDetailPage } from '@/views/CompanyCareersPages.jsx';
import { sampleRoles } from '@/data/sampleRoles.js';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const role = sampleRoles.find((entry) => entry[0] === slug);
  if (!role) return { title: 'Role — Careers at Scalric', alternates: { canonical: `/careers/${slug}` } };
  const [, title, team, location, workMode, description] = role;
  return {
    title: `${title} — Careers at Scalric`,
    description: description || `${title} (${team}, ${location}, ${workMode}) at Scalric.`,
    alternates: { canonical: `/careers/${slug}` },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <RoleDetailPage slug={decodeURIComponent(slug)} />;
}
