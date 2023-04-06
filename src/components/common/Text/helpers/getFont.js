export function getFont({ size, mobileFont, tabletFont, smallDesktopFont, font }) {
  if (size === 'smallDesktop') {
    return smallDesktopFont || font;
  }
  if (size === 'tablet') {
    return tabletFont || smallDesktopFont || font;
  }
  if (size === 'mobile') {
    return mobileFont || tabletFont || smallDesktopFont || font;
  }

  return font;
}
