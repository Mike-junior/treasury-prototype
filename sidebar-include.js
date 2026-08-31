// E&M TMS — Shared Sidebar
// Drop <div id="sidebar-root"></div><script src="sidebar-include.js"></script>
// anywhere in <body> and the full sidebar renders automatically.
// The current page's link is highlighted based on the filename.

(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';

  var sections = [
    {
      label: 'Main',
      items: [
        { href: '02-dashboard.html',      icon: 'grid',        label: 'Dashboard' },
        { href: '03-deal-capture.html',   icon: 'plus',        label: 'Deal Capture',       badge: '3' },
        { href: '04-cash-position.html',  icon: 'activity',    label: 'Cash Position' },
        { href: '20-fx-nop-monitor.html', icon: 'globe',       label: 'FX / NOP Monitor' },
        { href: '05-limits-exposure.html',icon: 'shield',      label: 'Limits & Exposure',  badge: '2', badgeWarn: true },
      ]
    },
    {
      label: 'Front Office',
      items: [
        { href: '21-treasury-sales.html', icon: 'star',        label: 'Treasury Sales' },
        { href: '08-auth-queue.html',     icon: 'clock',       label: 'Auth Queue',         badge: '5' },
        { href: '09-deal-register.html',  icon: 'list',        label: 'Deal Register' },
      ]
    },
    {
      label: 'Back Office',
      items: [
        { href: '12-settlement.html',              icon: 'credit-card',  label: 'Settlement' },
        { href: '30-confirmation-matching.html',   icon: 'check-square', label: 'Confirmation Matching', badge: '2', badgeWarn: true },
        { href: '31-corporate-actions.html',       icon: 'calendar',     label: 'Corporate Actions',     badge: '2', badgeWarn: true },
        { href: '06-reconciliation.html',          icon: 'layers',       label: 'Reconciliation',        badge: '4', badgeWarn: true },
        { href: '22-nostro-correspondent.html',    icon: 'bank',         label: 'Nostro & Correspondent' },
        { href: '26-accounting-gl.html',           icon: 'book-open',    label: 'Accounting & GL' },
        { href: '13-day-end.html',                 icon: 'sunset',       label: 'Day End Close' },
      ]
    },
    {
      label: 'Middle Office',
      items: [
        { href: '23-middle-office.html', icon: 'trending-up',  label: 'Valuation & Risk' },
        { href: '24-market-data.html',   icon: 'bar-chart',    label: 'Market Data' },
        { href: '25-ftp.html',           icon: 'dollar',       label: 'Funds Transfer Pricing' },
      ]
    },
    {
      label: 'Analytics',
      items: [
        { href: '07-reports.html',              icon: 'bar-chart2',  label: 'Reports' },
        { href: '10-alm.html',                  icon: 'trending-up', label: 'ALM / IRRBB' },
        { href: '11-regulatory-reports.html',   icon: 'file-text',   label: 'Reg. Reports' },
      ]
    },
    {
      label: 'Static Data',
      items: [
        { href: '15-instrument-master.html',    icon: 'file',        label: 'Instrument Master' },
        { href: '16-counterparty-master.html',  icon: 'users',       label: 'Counterparty Master' },
        { href: '17-static-data-misc.html',     icon: 'calendar',    label: 'Calendars & Brokers' },
        { href: '19-product-factory.html',      icon: 'layers',      label: 'Product Factory' },
      ]
    },
    {
      label: 'System',
      items: [
        { href: '18-user-management.html',      icon: 'user-plus',   label: 'User & Roles' },
        { href: '27-audit-trail.html',          icon: 'shield-check', label: 'Audit Trail' },
        { href: '28-integration-monitor.html',  icon: 'monitor',     label: 'Integration Monitor' },
        { href: '14-configuration.html',        icon: 'settings',    label: 'Configuration' },
        { href: '29-tenant-admin.html',         icon: 'layout',      label: 'Tenant Admin' },
      ]
    }
  ];

  var icons = {
    'grid':         '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    'plus':         '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'activity':     '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    'globe':        '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/>',
    'shield':       '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'star':         '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'clock':        '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'list':         '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>',
    'credit-card':  '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'check-square': '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    'bank':         '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
    'sunset':       '<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/>',
    'trending-up':  '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    'bar-chart':    '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    'dollar':       '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'bar-chart2':   '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    'file-text':    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    'file':         '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    'users':        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'calendar':     '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'layers':       '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    'user-plus':    '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
    'book-open':    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    'monitor':      '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    'settings':     '<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>',
    'layout':       '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'
  };

  function svgIcon(name) {
    return '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">'
      + (icons[name] || '') + '</svg>';
  }

  // Build inner HTML
  var html = '';

  // Logo
  html += '<div class="sidebar-logo">'
    + '<div class="sidebar-logo-mark">E&amp;M</div>'
    + '<div class="sidebar-logo-text"><div class="brand">E&amp;M TMS</div><div class="sub">Treasury Platform</div></div>'
    + '</div>';

  // Nav sections
  sections.forEach(function (section) {
    html += '<div class="sidebar-section">';
    html += '<div class="sidebar-section-label">' + section.label + '</div>';
    section.items.forEach(function (item) {
      var isActive = (page === item.href);
      var badge = item.badge
        ? '<span class="nav-badge' + (item.badgeWarn ? ' warning' : '') + '">' + item.badge + '</span>'
        : '';
      html += '<a href="' + item.href + '" class="nav-item' + (isActive ? ' active' : '') + '">'
        + svgIcon(item.icon)
        + item.label
        + badge
        + '</a>';
    });
    html += '</div>';
  });

  // Footer
  html += '<div class="sidebar-footer">'
    + '<div class="user-mini">'
    + '<div class="user-avatar">JM</div>'
    + '<div class="user-mini-info"><div class="name">Mike Agola</div><div class="role">Treasurer · LE-001</div></div>'
    + '</div></div>';

  // Inject
  var root = document.getElementById('sidebar-root');
  if (!root) return;
  var nav = document.createElement('nav');
  nav.className = 'sidebar';
  nav.innerHTML = html;
  root.replaceWith(nav);
})();
