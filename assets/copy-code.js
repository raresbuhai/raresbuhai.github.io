document.addEventListener('DOMContentLoaded', () => {
  if (window.Prism) {
    Prism.highlightAll();
  }

  document.querySelectorAll('.code-block').forEach((block) => {
    const button = block.querySelector('.copy-button');
    const code = block.querySelector('code');
    const status = block.querySelector('.copy-status');

    if (!button || !code || !status) return;

    const original = button.textContent || 'Copy';
    let announceTimer;
    let resetTimer;

    const showStatus = (label) => {
      button.textContent = label;
      status.textContent = '';
      window.clearTimeout(announceTimer);
      announceTimer = window.setTimeout(() => {
        status.textContent = label;
      }, 0);
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        button.textContent = original;
        status.textContent = '';
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
