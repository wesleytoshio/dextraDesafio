import { Component, OnInit } from '@angular/core';
import { SeriesService } from 'src/app/services/series.service';
import { Modal } from 'src/app/app.animations';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[Modal]
})
export class HomeComponent implements OnInit {
  series = [];
  searchText:string="";
  currentData:any={};
  isModalOpen:boolean=false;
  constructor(private seriesService: SeriesService) {
    $(document).ready(function () { $('html, body, *').mousewheel(function (e, delta) { this.scrollLeft -= (delta * 300); e.preventDefault(); }); });
  }

  ngOnInit() {
    this.getCollection();
  }

  async getCollection() {
    this.seriesService.collection().subscribe(
      (response) => {

        this.series = response.map(serie => {
          this.seriesService.detail(serie.imdbId).subscribe(data => { serie.extra = data });
          return serie
        });
        console.log(this.series);
      });
  }

  openModal(item:any){
    console.log(item);
    
    this.currentData = item;
    this.isModalOpen=true;
  }

  closeModal(event){
    this.isModalOpen=event;
  }
}
