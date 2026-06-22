import '@testing-library/jest-dom/vitest';
import { createElement } from 'react';
import en from './messages/en.json';

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

type Messages = Record<string, Record<string, string>>;

function translate(namespace: string, key: string) {
  const dict = (en as Messages)[namespace];
  return dict?.[key] ?? key;
}

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) =>
    translate(namespace, key),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => (key: string) =>
    translate(namespace, key),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

function buildHrefString(href: unknown): string {
  if (typeof href === 'string') return href;
  const { pathname = '/', query } = (href as {
    pathname?: string;
    query?: Record<string, string | number>;
  }) ?? {};
  if (!query) return pathname;
  const search = new URLSearchParams(
    Object.entries(query).map(([k, v]) => [k, String(v)])
  ).toString();
  return search ? `${pathname}?${search}` : pathname;
}

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({
      href,
      children,
      ...props
    }: {
      href: unknown;
      children?: import('react').ReactNode;
    }) => {
      const url = buildHrefString(href);
      return createElement('a', { href: url, ...props }, children);
    },
    redirect: vi.fn(),
    usePathname: () => '/',
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
    getPathname: () => '/',
  }),
}));
