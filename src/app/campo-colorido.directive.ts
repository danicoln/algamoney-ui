import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]'
})
export class CampoColoridoDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { 
    /** Com o renderer, alteramos o estilo com o 
     * método setStyle, passando como parametro o 
     * elemento nativo com o metodo nativeElement,
     * através do elemento hospedeiro elementRef,
     * passando a propriedade seguida do valor(cor)
    */
    this.renderer.setStyle(this.elementRef.nativeElement, 
      'background-color', 'yellow')
  }

}
