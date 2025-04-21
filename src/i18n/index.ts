import rosetta from 'rosetta';
import { signal } from '@preact/signals';

export type Locale = 'en' | 'pt';

export const i18n = rosetta({});
export const locale = signal<Locale>('en');

import en from './lang/en.json';
i18n.set('en', en);

export async function setLocale(l: Locale) {
  if (l === locale.value) return;
  const messages = await import(`./lang/${l}.json`).then((m) => m.default);
  i18n.set(l, messages);
  locale.value = l;
}

export function t(key: string, params?: Record<string, unknown>) {
  return i18n.t(key, params, locale.value) as string;
}
