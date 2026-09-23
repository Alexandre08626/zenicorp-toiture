import StatusPage from '@/components/StatusPage';

export const metadata = { title: 'Paiement annulé', robots: { index: false } };

export default function Page() {
  return <StatusPage ok={false} />;
}
