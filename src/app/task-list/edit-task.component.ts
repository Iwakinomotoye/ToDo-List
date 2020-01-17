import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'edit-task',
    template: `
    <div (click)="onClick()">
        <i class="fa fa-pencil"></i>
    </div>
    `,
    styles: [`
    div {
        padding: 2px 10px;
        background-color: #ccc;
        color: #000;
        border-radius: 5px;
    }
    div:hover {
        background: #28a745;;
        color: #fff;
    }
    `]
})

export class EditTaskComponent {
    // class="fa fa-pencil"
    @Output() edit = new EventEmitter();

    onClick() {
        this.edit.emit();
    }
}