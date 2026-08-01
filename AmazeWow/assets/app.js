const reveals = [
  'A coincidence with excellent timing.',
  'A tiny miracle wearing ordinary clothes.',
  'Proof that curiosity still works.',
  'The exact moment ordinary became memorable.',
  'Something impossible enough to be fun.'
];

const button = document.querySelector('#wow-button');
const reveal = document.querySelector('#reveal');
const revealText = document.querySelector('#reveal-text');
let previousIndex = -1;

function chooseReveal() {
  if (!(button instanceof HTMLButtonElement)) return;
  if (!(reveal instanceof HTMLElement)) return;
  if (!(revealText instanceof HTMLElement)) return;

  let nextIndex = previousIndex;
  while (nextIndex === previousIndex && reveals.length > 1) {
    nextIndex = Math.floor(Math.random() * reveals.length);
  }

  previousIndex = nextIndex;
  button.disabled = true;
  reveal.dataset.state = 'thinking';
  revealText.textContent = 'Calculating wonder…';

  window.setTimeout(() => {
    revealText.textContent = reveals[nextIndex];
    reveal.dataset.state = 'revealed';
    button.disabled = false;
    button.focus({ preventScroll: true });
  }, 650);
}

button?.addEventListener('click', chooseReveal);
