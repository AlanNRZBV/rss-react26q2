'use server';

import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';
import { redirect } from '../../i18n/navigation';

export async function searchAction(_prevState: unknown, formData: FormData) {
  const locale = await getLocale();
  const q = String(formData.get('q') ?? '').trim();

  redirect({
    href: q ? { pathname: '/', query: { q } } : '/',
    locale,
  });
}

export async function refreshAction() {
  const locale = await getLocale();
  revalidatePath(`/${locale}`);
}
