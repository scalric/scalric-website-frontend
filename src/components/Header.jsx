import React from 'react';
import { Link, Arrow } from './UI.jsx';
import SiteSearch from './SiteSearch.jsx';
import { prefetchRoles } from '../lib/roles.js';

const menus = {
  'What We Do': [
    ['Overview', '/what-we-do', 'Find the right path from problem to outcome.'],
    ['SaaS & software', '/what-we-do#saas', 'Shape digital products around real needs.'],
    ['Artificial intelligence', '/what-we-do#ai', 'Apply AI with a clear purpose.'],
    ['Data & automation', '/what-we-do#data-automation', 'Make information and operations work together.'],
    ['Consulting', '/what-we-do#consulting', 'Connect strategy to meaningful delivery.'],
  ],
  Industries: [
    ['Explore industries', '/industries', 'A starting point for sector-specific perspectives.'],
    ['Our impact', '/industries#impact', 'Real results across the sectors we serve.'],
    ['How we deliver', '/industries#how', 'The steps behind every engagement.'],
  ],
  Insights: [
    ['View all insights', '/insights', 'Ideas on technology, business and transformation.'],
    ['Success stories', '/insights#success-stories', 'Real examples of what worked.'],
  ],
  Company: [
    ['About Scalric', '/company', 'Why we exist and how we work.'],
  ],
  Careers: [
    ['Open roles', '/careers/openings', 'Explore opportunities at Scalric.'],
    ['Life at Scalric', '/careers/life', 'Build meaningful work with thoughtful teams.'],
  ],
};

const navItems = ['What We Do', 'Industries', 'Insights', 'Company', 'Careers'];

export default function Header({ currentPath }) {
  const [openMenu, setOpenMenu] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(null);
  const hoverTimer = React.useRef(null);
  const [hidden, setHidden] = React.useState(false);
  const overlay = currentPath === '/' && !openMenu && !mobileOpen;
  const close = React.useCallback(() => { clearTimeout(hoverTimer.current); setOpenMenu(null); setMobileOpen(false); setExpanded(null); }, []);
  const queueMenu = (item) => { clearTimeout(hoverTimer.current); hoverTimer.current = window.setTimeout(() => setOpenMenu(item), 150); };

  React.useEffect(() => { close(); }, [currentPath, close]);
  React.useEffect(() => { prefetchRoles(); }, []);
  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    if (!openMenu) return undefined;
    const onDown = (event) => { if (!event.target.closest('.site-header')) setOpenMenu(null); };
    const startY = window.scrollY;
    const onScroll = () => { if (Math.abs(window.scrollY - startY) > 60) setOpenMenu(null); };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { document.removeEventListener('pointerdown', onDown); window.removeEventListener('scroll', onScroll); };
  }, [openMenu]);
  React.useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') { close(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return <>
    <header className={`site-header${overlay ? ' is-overlay' : ''}${hidden && !openMenu && !mobileOpen ? ' is-hidden' : ''}`} onMouseLeave={() => { clearTimeout(hoverTimer.current); setOpenMenu(null); }}>
      <div className="header-utility"><div className="container utility-inner"><span className="region-label">India <span>(EN)</span></span><span className="utility-note">Technology · Consulting · Innovation</span></div></div>
      <div className="container header-main" onMouseOver={(event) => { if (!event.target.closest('.nav-menu-trigger')) { clearTimeout(hoverTimer.current); setOpenMenu(null); } }}>
        <Link href="/" className="brand" aria-label="Scalric home" onClick={close}><img className="logo-green" src="/assets/scalric-wordmark-blue.webp" alt="Scalric" width="135" height="34" /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <Link key={item} href={`/${item.toLowerCase().replaceAll(' ', '-')}`} className={`nav-link nav-menu-trigger${(openMenu ? openMenu === item : currentPath.startsWith(`/${item.toLowerCase().replaceAll(' ', '-')}`)) ? ' active' : ''}`} aria-haspopup="true" aria-expanded={openMenu === item} aria-controls="mega-menu" onMouseEnter={() => queueMenu(item)} onFocus={() => setOpenMenu(item)} onClick={close}>{item}</Link>)}
        </nav>
        <div className="header-actions"><Link href="/contact" className="button button-dark header-cta">Talk to us <Arrow diagonal /></Link><SiteSearch /><button className={`mobile-menu-trigger${mobileOpen ? ' is-open' : ''}`} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><i /><i /></button></div>
      </div>
      {openMenu && <div className="mega-scrim" onMouseOver={(event) => { if (event.target === event.currentTarget) setOpenMenu(null); }} onClick={(event) => { if (event.target === event.currentTarget) setOpenMenu(null); }}><section className="mega-menu" id="mega-menu" aria-label={`${openMenu} menu`} onMouseEnter={() => setOpenMenu(openMenu)}>
        <div className="mega-lead"><span className="eyebrow"><i />EXPLORE SCALRIC</span><h2>{openMenu}</h2><p>{openMenu === 'What We Do' ? 'We connect strategic thinking and technology to help solve complex business problems.' : openMenu === 'Industries' ? 'Explore the opportunities and questions shaping different sectors.' : openMenu === 'Insights' ? 'Ideas for a world where technology and business keep moving.' : openMenu === 'Company' ? 'A technology and consulting organization built around meaningful outcomes.' : 'Do work that moves important ideas forward.'}</p></div>
        <div className="mega-links">{(menus[openMenu] || []).map(([label, href, desc], index) => <Link key={label} href={href} className={`mega-link${index === 0 ? ' mega-featured' : ''}`} onClick={close}><span className="mega-link-copy"><b>{label}</b><small>{desc}</small></span><Arrow diagonal /></Link>)}</div>
        <button className="mega-close icon-button" onClick={() => setOpenMenu(null)} aria-label="Close menu">×</button>
      </section></div>}
    </header>
    {mobileOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Main navigation"><div className="mobile-menu-head"><span>Explore Scalric</span><button className="icon-button" onClick={close} aria-label="Close menu">×</button></div><div className="mobile-menu-links">{navItems.map((item) => <section key={item} className="mobile-nav-group"><div className="mobile-nav-row"><Link className="mobile-nav-toggle" href={`/${item.toLowerCase().replaceAll(' ', '-')}`} onClick={close}>{item}</Link><button type="button" className="mobile-nav-expand" aria-expanded={expanded === item} aria-label={`${item} options`} onClick={() => setExpanded(expanded === item ? null : item)}>{expanded === item ? '−' : '+'}</button></div>{expanded === item && <div className="mobile-subnav">{menus[item].map(([label, href]) => <Link key={label} href={href} onClick={close}>{label}<Arrow diagonal /></Link>)}</div>}</section>)}</div><div className="mobile-menu-bottom"><Link href="/contact" className="btn-talk" onClick={close}><span>Talk to us</span><i aria-hidden="true">→</i></Link><span>India (EN)</span></div></div>}
  </>;
}

