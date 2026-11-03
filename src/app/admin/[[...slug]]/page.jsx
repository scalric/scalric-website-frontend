import '@/admin/admin.css';
import AdminApp from '@/admin/AdminApp.jsx';

export const metadata = { title: 'Admin — Scalric', robots: { index: false, follow: false } };

export default function Page() {
  return <AdminApp />;
}
