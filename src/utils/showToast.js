export function showToast(text, type) {
  window.dispatchEvent(new CustomEvent('showToast', { detail: { text, type } }));
}
