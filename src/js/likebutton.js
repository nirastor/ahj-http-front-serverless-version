export default class LikeButton {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.container = null;
    this.button = null;
  }

  init() {
    this.containerEl = document.createElement('section');
    this.containerEl.classList.add('section');
    this.containerEl.innerHTML = `
      <button type="button" class="button button-like">Like</button>
  `;
    this.parentEl.appendChild(this.containerEl);
    this.initListeners();
  }

  initListeners() {
    this.button = this.containerEl.querySelector('.button-like');
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      const heart = document.createElement('div');
      heart.classList.add('heart');
      const randomInt0to3 = Math.floor(Math.random() * 4);
      heart.style.animationName = `fly-${randomInt0to3}`;
      heart.addEventListener('animationend', (evt) => {
        evt.preventDefault();
        heart.remove();
      });
      this.button.appendChild(heart);
    });
  }
}
