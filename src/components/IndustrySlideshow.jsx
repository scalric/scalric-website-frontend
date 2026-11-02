import React from 'react';
import { useMobile } from '../lib/useMobile.js';

const slides = [
  { src: '/assets/photos/industries-slide-3.webp', title: 'A clear view of what matters.', note: 'We bring focus to the questions worth answering.' },
  { src: '/assets/photos/industries-slide-8.webp', title: 'Progress is built one rep at a time.', note: 'We help gyms and studios keep members showing up.' },
  { src: '/assets/photos/industries-slide-7.webp', title: 'In healthcare, precision comes first.', note: 'We design technology that supports careful work and clearer care.' },
  { src: '/assets/photos/industries-slide-6.webp', title: 'Sport is decided in the details.', note: 'We help clubs and academies turn performance data into better training.' },
  { src: '/assets/photos/industries-slide-4.webp', title: 'Hospitality runs on small moments.', note: 'We build tools that free your team to focus on the guest.' },
  { src: '/assets/photos/industries-slide-5.webp', title: 'Every chair is a small business.', note: 'We help studios fill the day and keep clients coming back.' },
  { src: '/assets/photos/industries-slide-1.webp', title: 'Every sector has its own rhythm.', note: 'We start by learning how your industry really works.' },
];

/** Looping slideshow: tall photo panels glide left one at a time, forever; pauses on hover or focus. */
export default function IndustrySlideshow() {
  const mobile = useMobile();
  const [index, setIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(true);
  const paused = React.useRef(false);
  const count = slides.length;
  const loop = [...slides, ...slides];

  const next = React.useCallback(() => { setAnimate(true); setIndex((value) => value + 1); }, []);
  const prev = React.useCallback(() => {
    setIndex((value) => {
      if (value > 0) { setAnimate(true); return value - 1; }
      setAnimate(false);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => { setAnimate(true); setIndex(count - 1); }));
      return count;
    });
  }, [count]);

  React.useEffect(() => {
    const timer = window.setInterval(() => { if (!paused.current && !document.hidden) next(); }, 3500);
    return () => window.clearInterval(timer);
  }, [next]);

  const onEnd = () => { if (index >= count) { setAnimate(false); setIndex(index - count); } };
  const hold = (value) => () => { paused.current = value; };

  return <section className={`ind-slides${mobile ? ' is-m' : ''}`} aria-roledescription="carousel" aria-label="Industry highlights" onMouseEnter={hold(true)} onMouseLeave={hold(false)} onFocus={hold(true)} onBlur={hold(false)}>
    <div className="ind-slides-view">
      <div className={`ind-slides-track${animate ? '' : ' is-still'}`} style={{ '--i': index }} onTransitionEnd={onEnd}>
        {loop.map((slide, i) => <figure className="ind-slide" key={i} aria-hidden={i >= count}>
          <img src={slide.src} alt="" loading="eager" decoding="async" />
          <figcaption><h3>{slide.title}</h3><p>{slide.note}</p></figcaption>
        </figure>)}
      </div>
    </div>
    <div className="ind-slides-nav">
      <button type="button" aria-label="Previous slide" onClick={prev}>←</button>
      <button type="button" aria-label="Next slide" onClick={next}>→</button>
    </div>
  </section>;
}
