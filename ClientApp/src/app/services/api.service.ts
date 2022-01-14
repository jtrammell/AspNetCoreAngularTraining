import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { INotice } from '../company/company';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCompanyRecord(id: number) {
    let url = '/api/company/' + id;
    return this.http.get(url);
  }

  getCompanyAnnouncements(id: number) {
    let url = '/api/company/' + id + '/notices';
    return this.http.get(url);
  }

  getAnnouncement(id: number) {
    let url = '/api/notice/' + id;
    return this.http.get(url);
  }

  saveAnnouncement(id: number, data: INotice) {
    if(id !== 0){
      // Update the record by id
      let url = '/api/notice/' + id;
      return this.http.put<any>(url, data);
    }
  }

  insertAnnouncement(data: INotice) {
    let url = '/api/notice/';
    return this.http.post<any>(url, data);
  }

  deleteNotice(id: number) {
    let url = '/api/notice/' + id;
    return this.http.delete(url);
  }

}


