export class Calculator {

    private startDate: any;
    private releaseDate: any;
    private seriesTotalTime;
    private days: any;
    private hours: any;
    private hasExpired: boolean;
    private expireDate: Date;
    constructor(startDate?, releaseDate?, seriesTotalTime?) {
  
      console.log('seriesTotalTime', seriesTotalTime);
      
      this.startDate = new Date(startDate);
      this.releaseDate = new Date(releaseDate);
      console.log('startDate', this.startDate);
      console.log('releaseDate', this.releaseDate);
      this.seriesTotalTime = seriesTotalTime;
    }
  
    initWhen() {
      this.days = this.diffDays();
      this.hours = this.recommendedHours();
      this.expireDate = this.finishWatching();
      this.hasExpired = this.hasExpiredDate();
    }
  
    initPerHour(hours?: any) {
      this.hours = hours;
      this.days = this.calcDays();
      this.expireDate = this.finishWatching();
      this.hasExpired = this.hasExpiredDate();
    }
  
    /**
   * Esta função serve para obter a diferença de dias entre duas datas.
   * @returns number  
   */
    diffDays(): number {
      try {
        const dayTime = 1000 * 60 * 60 * 24;
        const difference_ms = this.startDate.getTime() - this.releaseDate.getTime();
        return Math.abs(difference_ms / (dayTime));
      } catch (err) {
        return
      }
    }
  
    /**
  * Esta função serve para obter a diferença de dias entre duas datas.
  * @returns number  
  */
    calcDays(): number {
      try {
        return Math.abs(this.seriesTotalTime / (this.hours * 60));
      } catch (err) {
        return
      }
    }
  
    calcHours(): any {
      return Math.abs(this.seriesTotalTime / 60);
    }
  
    /**
     * Esta função serve para mostrar a data que irá terminar
     * de assistir a série.
     * @returns date 
     */
    finishWatching(): Date {
      return new Date(this.startDate.setDate(this.startDate.getDate() + this.days));
    }
  
    /**
     * Essa função mostra a quantidade de horas recomendada 
     * pela calculadora.
     * @returns number
     */
    recommendedHours(): number {
      return Math.abs(this.calcHours() / (this.days));
    }
  
    /**
     * Essa função retorna boolean se a data de encerramento é 
     * maior que data de lançamento
     * @returns Boolean 
     */
    hasExpiredDate(): boolean {
      return this.expireDate.getTime() > this.releaseDate.getTime() ? true : false;
    }
  
    data(): Object {
      return {
        minutes: Math.abs(this.hours * 60),
        days: Math.ceil(this.days),
        daysNumber:this.days,
        hasExpired: this.hasExpired,
        expireDate: this.expireDate
      }
    }
  }