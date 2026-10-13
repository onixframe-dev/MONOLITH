/**
 * Class name utility — conditionally joins class names.
 */
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}
