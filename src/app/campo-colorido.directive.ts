import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]'
})
export class CampoColoridoDirective {


  @Input() cor = '#f1f8fa';

  /**Vinculando propriedades do hospedeiro
   * com @ HostBinding
   * 
   * É necessário definir um valor inicial
   */
  @HostBinding('style.backgroundColor') corDeFundo: string = 'transparent';
  

  @HostListener('focus') aoGanharFoco(){
    this.corDeFundo = this.cor;
    
  }

  @HostListener('blur') aoPerderFoco(){
    this.corDeFundo = 'transparent';
  }
}
