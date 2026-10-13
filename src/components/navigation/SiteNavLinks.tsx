import Link from 'next/link';
import { mainNavigation } from '@/lib/site';

type SiteNavLinksProps = {
  activePath?: string | null;
  className?: string;
  onNavigate?: () => void;
};

/** Shared public navigation for header, footer, and future site surfaces. */
export function SiteNavLinks({ activePath, className, onNavigate }: SiteNavLinksProps) {
  const links = <>
    {mainNavigation.map(link => <Link
      key={link.href}
      href={link.href}
      onClick={onNavigate}
      className={activePath === link.href ? 'is-active' : undefined}
    >
      {link.label}
    </Link>)}
  </>;

  return className ? <div className={className}>{links}</div> : links;
}
