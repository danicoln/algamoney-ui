import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastMessage: MessageService) { }

  handle(errorResponse: any) {
    let msg: any;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

      /**
       *HttpErrorResponse
       *
       * A única alteração no código desta aula é no método handle de ErrorHandlerService.
       * Na segunda condição, ao invés de verificarmos se errorResponse instanceof Response,
       * checamos se errorResponse instanceof HttpErrorResponse.
       * Além disso o método json() não existe nesse objeto.
       * Podemos acessar a mensagem para o usuário da seguinte forma:
       */
    } else if(errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400
      && errorResponse.status <= 499){
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try{
        msg = errorResponse.error[0].mensagemUsuario;
      }catch(e){}

      console.error('Ocorreu um erro', errorResponse);
    }

    this.toastMessage.add(msg);
  }
}
