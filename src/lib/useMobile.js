import React from 'react';

/** True on phone-sized screens. Starts false (matches the server render) and updates after mount, so banners can switch layout. */
export function useMobile(query = '(max-width: 760px)') {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return mobile;
}
