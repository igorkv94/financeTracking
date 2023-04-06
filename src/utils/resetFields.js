export function resetFields(formRef) {
  Array.from(formRef.querySelectorAll('input')).forEach((input) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, '');

    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
}
