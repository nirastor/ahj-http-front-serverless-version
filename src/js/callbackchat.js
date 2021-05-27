export default class CallbackChat {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.container = null;
  }

  init() {
    this.container = document.createElement('div');
    this.container.classList.add('callback-chat-container');
    this.container.innerHTML = `
      <div class="callback-chat__popup callbackchat-hidden-transform">
        <div class="callback-chat__close-button">X</div>
          <div class="callback-chat__title">Напишите нам</div>
          <form class="form">
            <textarea class="callback-chat__text" name="" id="" cols="30" rows="10"></textarea>
            <button class="callback-chat__submit-button" type="submit">Отправить</button>
          </form>
        </div>
      <div class="callback-chat__open-button">&nbsp;</div>
    `;

    this.form = this.container.querySelector('.form');
    this.closeButton = this.container.querySelector('.callback-chat__close-button');
    this.openButton = this.container.querySelector('.callback-chat__open-button');
    this.popUpEl = this.container.querySelector('.callback-chat__popup');
    this.initListeners();
    this.parentEl.appendChild(this.container);
  }

  initListeners() {
    this.openButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openPopup();
    });

    this.closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.closePopup();
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.closePopup();
      this.form.reset();
    });
  }

  openPopup() {
    this.popUpEl.classList.remove('callbackchat-hidden-transform');
    this.openButton.classList.add('callbackchat-hidden-transform');
  }

  closePopup() {
    this.popUpEl.classList.add('callbackchat-hidden-transform');
    this.openButton.classList.remove('callbackchat-hidden-transform');
  }
}
