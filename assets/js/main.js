// Albi Flight Design System - Main JavaScript
console.log('Albi Flight Design System loaded');

// Add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.style.cssText = 'position:absolute;top:0.5rem;right:0.5rem;padding:0.25rem 0.5rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;border-radius:0.25rem;cursor:pointer;font-size:0.75rem;';

    const pre = block.parentElement;
    pre.style.position = 'relative';

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent);
      button.textContent = 'Copied!';
      setTimeout(() => button.textContent = 'Copy', 2000);
    });

    pre.appendChild(button);
  });
});
