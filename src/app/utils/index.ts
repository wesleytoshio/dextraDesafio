import * as moment from 'moment';
import 'moment-timezone';
export class Utils {

  /**
   * Esta função remove os textos da string e separa os números.
   * Em seguida, converte em minutos.
   * @param duration 
   */
  replaceDuration(duration?: string) {
    let str, h, m;
    str = duration.split(' ');
    if (str.length > 1) {
      h = parseInt(str[0].replace(/[^\d]+/g, '')) * 60;
      m = parseInt(str[1].replace(/[^\d]+/g, ''));
      return h + m;

    } else {
      m = parseInt(str[0].replace(/[^\d]+/g, ''));
      return m
    }

  }

  /**
 * Essa função converte o tempo total em horas e minutos
 * Ex: 1 hora e 20 minutos
 * @returns string
 */
  public timeConvert(n): any {
    console.log(n);
    
    let num = (n * 60);
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${num} ${rhours} ${rhours > 1 ? 'horas' : 'hora'} e ${rminutes} ${rhours > 1 ? 'minutos' : 'minuto'}`;
  }

  public getTimeFromMins(mins) {
    let h = Math.ceil(mins / 60)
    
    return h > 1 ? `${h} horas` : `${h} hora`;
}
}


