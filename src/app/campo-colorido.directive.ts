import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]'
})
export class CampoColoridoDirective {

  /**Vinculando propriedades do hospedeiro
   * com @ HostBinding
   * 
   * É necessário definir um valor inicial
   */
  @HostBinding('style.backgroundColor') corDeFundo: string = 'transparent';
  

  @HostListener('focus') aoGanharFoco(){
    this.corDeFundo = '#f1f8fa';
    
  }

  @HostListener('blur') aoPerderFoco(){
    this.corDeFundo = 'transparent';
  }
}
