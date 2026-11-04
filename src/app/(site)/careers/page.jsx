import { redirect } from 'next/navigation';

// The Careers nav item opens the open roles page.
export const metadata = { title: "Careers at Scalric — Join Our Team", description: "Explore careers at Scalric and see how we work, what we value and which roles are open.", alternates: { canonical: "/careers/openings" } };

export default function Page() {
  redirect('/careers/openings');
}
