// utils/preloadHelper.js
export async function preloadPage(pathname) {
  switch (pathname) {
    case '/about':
      await import('../about/page');
      break;
    case '/projects':
    //   await import('../projects/page');
      break;
    case '/contact':
    //   await import('../contact/page');
      break;
    // tambahkan lainnya kalau perlu
    default:
      break;
  }
}
