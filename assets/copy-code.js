document.addEventListener('DOMContentLoaded', () => {
  if (window.Prism) {
    Prism.highlightAll();
  }

  document.querySelectorAll('.code-block').forEach((block) => {
    const button = block.querySelector('.copy-button');
    const code = block.querySelector('code');

    if (!button || !code) return;

    const original = button.textContent || 'Copy';
    let resetTimer;

    const showStatus = (label) => {
      button.textContent = label;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    };

    const fallbackCopy = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();

      let copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (error) {
        copied = false;
      }

      document.body.removeChild(textarea);
      showStatus(copied ? 'Copied!' : 'Copy failed');
    };

    button.addEventListener('click', () => {
      const text = code.textContent || '';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showStatus('Copied!');
        }).catch(() => {
          fallbackCopy(text);
        });
        return;
      }

      fallbackCopy(text);
    });
  });
});
