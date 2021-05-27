export default class SlideDown {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.containerEl = null;
    this.button = null;
    this.slideDownEl = null;
    this.isOpen = false;
  }

  init() {
    this.containerEl = document.createElement('section');
    this.containerEl.classList.add('section');
    this.containerEl.innerHTML = `
      <button type="button" class="button">Раскрыть</button>
      <div class="text slideDown">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</div>
      <div class="text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</div>
    `;
    this.parentEl.appendChild(this.containerEl);

    this.button = this.containerEl.querySelector('.button');
    this.slideDownEl = this.containerEl.querySelector('.slideDown');
    this.initListeners();
  }

  initListeners() {
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.buttonClick();
    });
  }

  buttonClick() {
    if (this.isOpen) {
      this.closeSlideDown();
    } else {
      this.openSlideDown();
    }
    this.isOpen = !this.isOpen;
  }

  openSlideDown() {
    this.button.innerText = 'Закрыть';
    this.slideDownEl.style.height = `${this.slideDownEl.scrollHeight}px`;
    this.slideDownEl.style.marginBottom = '20px';
  }

  closeSlideDown() {
    this.button.innerText = 'Раскрыть';
    this.slideDownEl.style.height = 0;
    this.slideDownEl.style.marginBottom = 0;
  }
}
