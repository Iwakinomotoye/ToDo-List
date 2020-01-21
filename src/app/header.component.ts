import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <div class='container'>
            <h2><img src="assets/To-Do-List.png">ToDoList</h2>
            <div>Created with Angular by <a href="https://twitter.com/iwakintoye">@IwakinOmotoye</a></div>
        </div>
    `,
    styles: [`
    img {
        height: 50px;
        margin: 0 10px;
    }
    .container {
        text-align: center;
        margin-bottom: 30px;
        color: #fa5;
    }
    `]
})

export class HeaderComponent {

}
