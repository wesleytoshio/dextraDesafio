import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  collection(): Observable<any> {
    return this.http.get(`${environment.API_URL}/series?mockDate=2011-03-01`)
  }
  
  //show details about a single series
  serie(serieId): Observable<any> {
    return this.http.get(`${environment.API_URL}/series/1/seasons?mockDate=2023-03-01`, this.getHeaders())
  }

  //list all seasons of a given series
  seasons(serieId): Observable<any> {
    return this.http.get(`${environment.API_URL}/series/${serieId}/seasons`)
  }

  //show details about a specific season
  season(serieId,seasonId): Observable<any> {
    return this.http.get(`${environment.API_URL}/series/${serieId}/seasons/${seasonId}`)
  }

  //list all episodes of a given season
  episodes(serieId,seasonId): Observable<any> {
    return this.http.get(`${environment.API_URL}/series/${serieId}/seasons/${seasonId}/episodes`)
  }

  //show details of a specific episode
  episode(serieId,seasonId,episodeId): Observable<any> {
    return this.http.get(`${environment.API_URL}/series/${serieId}/seasons/${seasonId}/episodes/${episodeId}`)
  }

  detail(imdbId): Observable<any> {
    return this.http.get(`${environment.OMDb_URL}/?i=${imdbId}&apikey=${environment.OMDb_KEY}`)
  }
  getHeaders(): { headers: HttpHeaders } {
    const headerOptions = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return { headers: new HttpHeaders(headerOptions) };
  }
}
