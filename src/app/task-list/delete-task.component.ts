import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'delete-task',
    template: `
    <div (click)="onClick()">
        <i class="fa fa-trash-o"></i>
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
        background: #f20;
        color: #fff;
    }
    `]
})

export class DeleteTaskComponent {
    // class="fa fa-trash-o"
    @Output() delete = new EventEmitter();

    onClick() {
        this.delete.emit();
    }
}