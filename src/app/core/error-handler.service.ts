import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor( private toastMessage: MessageService) { }

  handle(errorResponse: any){
    let msg: any;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    }else{
      msg = 'Erro ao processar o serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toastMessage.add(msg);
  }
}
