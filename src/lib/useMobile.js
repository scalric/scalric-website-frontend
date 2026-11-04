import React from 'react';

/**
 * True on phone-sized screens, false on larger ones. It is `null` on the server and on the first browser frame, because
 * the screen width is not known yet: callers that treat it as true/false see `null` as "not a phone", exactly as before.
 * Above-the-fold banners pass it to <Responsive> so the first paint is already the right layout (no desktop-then-phone flash).
 */
export function useMobile(query = '(max-width: 760px)') {
  const [mobile, setMobile] = React.useState(null);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return mobile;
}

/**
 * Conditional rendering without the first-paint flash. Once the screen width is known it renders only `m` (phones) or
 * `d` (larger screens). Before that (server HTML, first frame) it renders both, and CSS media queries show just the one
 * that matches, so phones never see the desktop banner for a moment. `bp` is the breakpoint: 760 (default) or 680.
 */
export function Responsive({ mobile, m, d, bp = 760 }) {
  if (mobile === true) return m;
  if (mobile === false) return d;
  return <><div className={`ssr-m-${bp}`}>{m}</div><div className={`ssr-d-${bp}`}>{d}</div></>;
}
