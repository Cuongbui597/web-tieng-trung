import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export default function DeprecatedProductListPage({ searchParams }) {
  // Pass search params to cleanup if needed, but for SEO listing move, just redirect root
  // Ideally, preservation of query strings would be good.
  // Server Component redirect handles basic redirection.
  // Construct search params string if present
  let qs = '';
  if (searchParams) {
    const sp = new URLSearchParams(searchParams);
    const s = sp.toString();
    if (s) qs = `?${s}`;
  }

  redirect(`/cua-hang${qs}`);
}
