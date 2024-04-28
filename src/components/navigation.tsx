'use client';
import { navigation_links } from '../../app.config';
import Link from 'next/link';
import { motion, LayoutGroup } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SunIcon } from 'lucide-react';
const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), {
  loading: () => (
    <button className="flex size-10 items-center justify-center rounded-full opacity-50 outline-none transition-opacity hover:opacity-100">
      <SunIcon />
    </button>
  ),
  ssr: false,
});

function Navigation() {
  return (
    <aside className=" z-50 w-full bg-white py-5 tracking-tight dark:bg-[rgb(5,5,5)]">
      <div>
        <LayoutGroup>
          <nav
            className="fade relative flex scroll-pr-6 flex-row items-start justify-between px-0 pb-0 md:relative md:overflow-auto"
            id="nav"
          >
            <div className="flex flex-row space-x-0 pr-10">
              <Suspense fallback={null}>
                {navigation_links.map(({ title, href }) => {
                  return <NavItem key={title} path={href} name={title} />;
                })}
              </Suspense>
            </div>
            <ThemeToggle />
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}

let cx = (...classes: any[]) => classes.filter(Boolean).join(' ');

function NavItem({ path, name }: { path: string; name: string }) {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }
  let isActive = path === pathname;

  return (
    <Link
      key={path}
      href={path}
      className={cx(
        'relative flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200',
        {
          'text-neutral-500': !isActive,
        },
      )}
    >
      <span className=" px-4 py-1 text-sm capitalize">{name}</span>
      {path === pathname ? (
        <motion.div
          className="absolute inset-0 z-[-1]  rounded-full  bg-neutral-100 from-transparent to-neutral-900 dark:bg-neutral-600 dark:bg-gradient-to-r"
          layoutId="sidebar"
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
          }}
        />
      ) : null}
    </Link>
  );
}
export default Navigation;
