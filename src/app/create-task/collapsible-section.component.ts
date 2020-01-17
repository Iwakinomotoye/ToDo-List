import { Component, Input } from '@angular/core';

@Component ({
    selector: 'collapsible-section',
    template:  `
        <div class="collapsible">
            <div (click)="toggleVisible()" *ngIf="!TaskIn.id">Add Task</div>
            <div (click)="toggleVisible()" *ngIf="TaskIn.id">Update Task</div>
            <ng-content *ngIf="visible"></ng-content>
        </div>
    `,
    styles: [`
    .collapsible {
        padding: 10px 0;
        width: 100%;
        border-radius: 10px;
        background: #0f042b;
        color: #fff;
    }
    .collapsible div {
        font-size: 15px;
        text-align: center;
        cursor: pointer;
    }
    @media screen and (min-width: 576px){
        .collapsible div {
            font-size: 18px;
        }
    }
    `]
})

export class CollapsibleSectionComponent {
    @Input() TaskIn;
    visible = false;
    toggleVisible() {
        this.visible = !this.visible;
    }
    ngOnChanges() {
        if(this.TaskIn.id) {
            this.visible = true;
        }
    }
}