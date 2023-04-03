import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]'
})
export class CampoColoridoDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { 

  }

  @HostListener('focus') aoGanharFoco(){
    this.renderer.setStyle(this.elementRef.nativeElement, 
      'background-color', '#f5f8fa')
  }

  @HostListener('blur') aoPerderFoco(){
    this.renderer.setStyle(this.elementRef.nativeElement, 
      'background-color', 'transparent')
  }
}
