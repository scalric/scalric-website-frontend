import { RoleApplyPage } from '@/views/CompanyCareersPages.jsx';
import { sampleRoles } from '@/data/sampleRoles.js';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const role = sampleRoles.find((entry) => entry[0] === slug);
  const title = role ? `Apply for ${role[1]} — Careers at Scalric` : 'Apply — Careers at Scalric';
  return {
    title,
    description: role ? `Apply for the ${role[1]} role (${role[2]}, ${role[3]}, ${role[4]}) at Scalric.` : 'Apply for a role at Scalric.',
    // The role page is the one to index; the form page is for people who already chose a role.
    alternates: { canonical: `/careers/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <RoleApplyPage slug={decodeURIComponent(slug)} />;
}
