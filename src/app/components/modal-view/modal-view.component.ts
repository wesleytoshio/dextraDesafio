import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';
import { SeriesService } from 'src/app/services/series.service';
import { Utils } from 'src/app/utils';
import { Calculator } from 'src/app/calculator';
@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  @Input('data') data: any;
  @Output() valueChange = new EventEmitter();
  minDate = new Date();
  maxDate: any;
  selectedDate: any;
  releaseDate: any;
  hourPerDay: any;
  seasonTotalTime: number = 0;
  isCalculated: boolean;
  isCalcTime:boolean = false;
  enablePerHour: boolean = false;
  dataCalc: any = {};
  invalidRelease: boolean=false;
  episodes: any[]=[];
  constructor(private seriesService: SeriesService, public utils: Utils) { }

  ngOnInit() {
    moment.locale('pt-br');
    moment.tz.setDefault("America/Sao_Paulo");
    this.allSeasons(this.data.id);
    this.maxDate = this.data.releaseDate;
    this.releaseDate = moment(this.data.releaseDate).toISOString();
    this.selectedDate = moment(new Date()).toISOString();

  }

  valueChanged() {
    this.valueChange.emit(false);
  }

  allSeasons(id) {
    this.seriesService.seasons(id).subscribe(
      (result) => {
        result.map(season => {
          this.getEpisodes(id, season.id);
        })
      }
    );
  }

  //get All episode of each season
  getEpisodes(serieId, seasonId) {
    this.seriesService.episodes(serieId, seasonId).subscribe(
      (result) => {
        let episodes = result.map(ep => {
          this.seasonTotalTime += this.utils.replaceDuration(ep.duration);         
          return ep
        })
      }
    );
  }

  calcTime(selectedDate?, hourPerDay?) {
    
    if (new Date(this.releaseDate) < new Date(selectedDate)) {
      this.invalidRelease=true;
    } else {
      this.invalidRelease=false;
      if (hourPerDay) {
        const calculator = new Calculator(selectedDate, this.releaseDate, this.seasonTotalTime);
        calculator.initPerHour(parseInt(hourPerDay));
        console.log(calculator.data());
        this.dataCalc = calculator.data();
        this.dataCalc.hours = Math.ceil(this.dataCalc.minutes / 60);
        this.isCalculated = true;
        console.log(this.dataCalc);
      } else {
        const calculator = new Calculator(moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'), moment(this.releaseDate).format('YYYY-MM-DD HH:mm:ss'), this.seasonTotalTime);
        calculator.initWhen();
        console.log(calculator.data());
        this.dataCalc = calculator.data();
        this.isCalculated = true;
        this.dataCalc.hours = Math.ceil(this.dataCalc.minutes / 60);
        console.log(this.dataCalc);
      }
    }


  }

  reset() {
    this.isCalculated = false;
  }
}
