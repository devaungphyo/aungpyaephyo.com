import '@/styles/app.css';
import { cn, generateMetaData, montserrat } from '@/lib/utils';
import Provider from '@/components/provider';
import { Metadata } from 'next';
import Navigation from '@/components/navigation';

export const metadata: Metadata = generateMetaData();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          montserrat.className,
          'bg-white text-neutral-800 dark:bg-[rgb(5,5,5)] dark:text-neutral-200',
        )}
      >
        <Provider>
          <main
            className={cn(
              'mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center justify-center px-4 py-7',
            )}
          >
            <Navigation />
            <section className="flex w-full flex-1 flex-col pt-8">{children}</section>
          </main>
        </Provider>
      </body>
    </html>
  );
}