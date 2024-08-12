import { getViewsCount } from '@/app/blog/_action';
import ViewCounter from '@/components/blog/views-counter';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Suspense } from 'react';

type Props = {
  slug: string;
  title: string;
  publishedAt: string;
  minimum?: boolean;
};
const Views = async ({ slug }: { slug: string }) => {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
};

const BlogPost = async ({
  slug,
  title,
  publishedAt,
  minimum = true,
}: Props) => {
  return (
    <li className='relative -mx-1.5'>
      <Link
        href={`/blog/${slug}`}
        title={title}
        className={cn(
          'block h-full w-full rounded-md  text-sm outline-none transition-all focus-within:bg-neutral-100 hover:bg-neutral-100 focus:ring-1 focus:ring-neutral-300 dark:focus-within:bg-neutral-900 dark:hover:bg-neutral-900 dark:focus:ring-neutral-500',
          minimum ? 'p-2' : 'p-3'
        )}
      >
        <article className='w-full flex flex-wrap lg:flex-nowrap sm:items-baseline sm:gap-5'>
          <time
            className='hidden lg:flex text-nowrap opacity-60 sm:w-24'
            dateTime={formatDate(publishedAt)}
            aria-label={`Written ${publishedAt}`}
          >
            {formatDate(publishedAt)}
          </time>
          <header className='w-full lg:w-auto text-sm font-medium lg:flex-1'>
            {title}
          </header>
          <Suspense fallback={<span>..</span>}>
            <p>
              <Views slug={slug} />
            </p>
          </Suspense>
        </article>
      </Link>
    </li>
  );
};

export default BlogPost;
