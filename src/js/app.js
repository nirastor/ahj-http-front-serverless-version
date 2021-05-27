import TicketDialog from './ticketDialog';
import DeleteDialog from './deleteDialog';

class App {
  constructor() {
    this.appEl = document.querySelector('.app');
    this.tickedDialogEl = document.querySelector('.ticket-dialog');
    this.tickedDialog = new TicketDialog(
      this.tickedDialogEl,
      this.addTicket.bind(this),
      this.editTicket.bind(this),
    );
    this.deleteDialogEl = document.querySelector('.delete-dialog');
    this.deleteDialog = new DeleteDialog(
      this.deleteDialogEl,
      this.removeItemById.bind(this),
    );
    this.colEl = null;
    this.tickets = [
      {
        id: 1,
        status: false,
        shortDescription: 'Задача 1',
        longDescription: 'Описание задачи один',
        dateTime: new Date('2021-05-21, 12:45'),
      },
      {
        id: 2,
        status: false,
        shortDescription: 'Вторая таска',
        longDescription: 'И её большое описание\n1.сначал это\n2.потом другое',
        dateTime: new Date('2021-05-17, 11:17'),
      },
    ];
  }

  init() {
    this.colEl = document.createElement('div');
    this.colEl.classList.add('column');
    this.appEl.appendChild(this.colEl);

    this.colEl.innerHTML = `
      <button type="button" class="add-button">Добавить тикет</button>
      <ul class="list"></ul>
    `;

    this.initListeners();
    this.tickedDialog.init();
    this.deleteDialog.init();
    this.drawTickets();
  }

  initListeners() {
    const button = this.colEl.querySelector('.add-button');
    button.addEventListener('click', () => {
      this.tickedDialog.setAdd();
      this.tickedDialog.show();
    });
  }

  removeItemById(id) {
    const index = this.tickets.findIndex((o) => o.id === id);
    if (index === -1) return;
    this.tickets.splice(index, 1);
    this.drawTickets();
  }

  changeStatusById(id) {
    const index = this.tickets.findIndex((o) => o.id === id);
    if (index === -1) return;
    this.tickets[index].status = !this.tickets[index].status;
    this.drawTickets();
  }

  getDescriptionById(id) {
    const index = this.tickets.findIndex((o) => o.id === id);
    return index === -1
      ? 'Элемент не существует'
      : this.tickets[index].longDescription;
  }

  addTicket(ticket) {
    this.tickets.push(ticket);
    this.drawTickets();
  }

  editTicket(ticket) {
    const index = this.tickets.findIndex((o) => o.id === ticket.id);
    if (index === -1) return;
    this.tickets.splice(index, 1, ticket);
    this.drawTickets();
  }

  drawTickets() {
    const list = this.colEl.querySelector('.list');
    list.innerHTML = '';
    const taskTemplate = document.querySelector('.task-template');
    this.tickets.forEach((t) => {
      const taskEl = taskTemplate.cloneNode(true);
      taskEl.classList.add('task');
      taskEl.classList.remove('task-template');
      if (t.status) {
        taskEl.querySelector('.task-status').classList.add('task-satus-done');
      }
      taskEl.querySelector('.task-short-name').innerText = t.shortDescription;
      taskEl.querySelector('.task-datetime').innerText = t.dateTime.toLocaleDateString();

      taskEl.querySelector('.button-task-edit').addEventListener('click', () => {
        this.tickedDialog.setEdit(t);
        this.tickedDialog.show();
      });

      taskEl.querySelector('.button-task-delete').addEventListener('click', () => {
        this.deleteDialog.setId(t.id);
        this.deleteDialog.show();
      });

      taskEl.querySelector('.task-status').addEventListener('click', () => {
        this.changeStatusById(t.id);
      });

      taskEl.addEventListener('click', (e) => {
        if (Array.from(e.target.classList).includes('task-control')) return;
        const description = taskEl.querySelector('.task-description');
        if (Array.from(description.classList).includes('display-none')) {
          description.innerText = this.getDescriptionById(t.id);
        }
        description.classList.toggle('display-none');
      });

      list.appendChild(taskEl);
    });
  }
}

const app = new App();
app.init();
