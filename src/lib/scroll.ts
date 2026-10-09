export function scrollToSection(href: string) {
  const target = document.querySelector(href) as HTMLElement | null;
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, {
      offset: 0,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}