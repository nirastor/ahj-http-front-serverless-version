export default class ticketDialog {
  constructor(el, addCallback, editCallback) {
    this.el = el;
    this.add = addCallback;
    this.edit = editCallback;
    this.action = 'edit';
    this.id = null;
  }

  setEdit({ id, shortDescription, longDescription }) {
    this.action = 'edit';
    this.id = id;
    this.el.querySelector('#short-description').value = shortDescription;
    this.el.querySelector('#description').value = longDescription;
  }

  setAdd() {
    this.action = 'add';
  }

  init() {
    const cancelButton = this.el.querySelector('.ticked-dialog-cancel');
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.hide();
    });

    const confirmButton = this.el.querySelector('.ticked-dialog-confirm');
    confirmButton.addEventListener('click', (e) => {
      e.preventDefault();
      const shortDescription = this.el.querySelector('#short-description').value.trim();
      const longDescription = this.el.querySelector('#description').value.trim();
      if (!shortDescription || !longDescription) return;
      const newTicket = {
        id: this.action === 'add' ? Math.floor(Math.random() * 10000) : this.id,
        status: false,
        shortDescription,
        longDescription,
        dateTime: new Date(),
      };
      this[this.action](newTicket);
      this.el.querySelector('#short-description').value = '';
      this.el.querySelector('#description').value = '';
      this.hide();
    });
  }

  show() {
    this.el.classList.remove('display-none');
  }

  hide() {
    this.el.classList.add('display-none');
  }
}
