import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="p-message p-message-error">
      {{ text }}
    </div>
  `,
  styles: [`
    .p-message-error{
      margin: 0;
      margin-top: 4px;
      padding: 3px;
    }
  `]
})
export class MessageComponent {

  @Input() error: string = '';
  @Input() control?: FormControl = new FormControl();
  @Input() text: string = '';

  temErro(): boolean{
    // este método retorna através do control, o erro que é passado como parâmetro
    // e ainda o dirty, pra verificar se o campo está "sujo"
    if(!this.control?.hasError(this.error)){
      return false;
    } else if (!this.control?.touched || !this.control?.dirty){
      return false;
    }
    return true;
  }
}
