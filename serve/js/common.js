class Common {
  static addCss(href) {
    if (document.getElementById(href)) return;

    const head  = document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');

    link.id   = href;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'all';
    head.appendChild(link);
    
  }
}

window.Common = Common;