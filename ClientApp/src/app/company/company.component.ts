import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as internal from 'assert';
import { ApiService } from '../services/api.service';
import { ICompanyData, INotice, INoticeList } from './company';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public companyRecord?: ICompanyData;
  public companyNotices?: INoticeList;
  public noticeRecord?: INotice;
  public noticeKeyToEdit?: number;
  public companyKey = 257216;
  public noticeForm: FormGroup;

  constructor(
    public apiService: ApiService,
    private fb: FormBuilder,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.noticeKeyToEdit = -1;

    // Build the Notices (announcements) form
    this.noticeForm = this.fb.group({
      id: [0, [Validators.required]],
      noticeCompanyKey: [0, [Validators.required]],
      noticeHide: null,
      noticeSubject: ['', [Validators.required]],
      message: '',
      noticeLink: '',
      noticeFromDate: ['', [Validators.required]],
      noticeToDate: ['', [Validators.required]]
    });

    // get Company Record from server
    this.apiService.getCompanyRecord(this.companyKey).subscribe((result: ICompanyData)=>{
      this.companyRecord = result;
    });

    // get Announcements for the company
    this.fetchCompanyAnnouncements(this.companyKey);

  }

  // Fetch Compay Announcements
  fetchCompanyAnnouncements(companyId: number) {
    this.apiService.getCompanyAnnouncements(companyId).subscribe((result: INoticeList)=>{
      this.companyNotices = result;
    });
  }

  // Create Announcement
  createAnnouncment() {
    this.noticeForm.reset();
    debugger;
    var data = this.noticeForm.value;
    data.id = -1;
    data.noticeCompanyKey = this.companyKey;
    this.noticeForm.patchValue(data);
    this.noticeKeyToEdit = 0;
  }

  // Cancel
  cancelEdit(){
    this.noticeKeyToEdit = -1;
  }

  // Edit Announcement
  editAnnouncement(id: number) {

    // get Announcement Record
    this.apiService.getAnnouncement(id).subscribe((result: INotice)=>{
      this.noticeRecord = result;
      this.pokeAnnouncementRecord(this.noticeRecord);
      this.noticeKeyToEdit = id;
    });

  }

  // Poke Announcment into form
  pokeAnnouncementRecord(data: INotice) {
    data.message = this._sanitizer.sanitize(SecurityContext.HTML, data.message);
    data.noticeHide = !data.noticeHide;
    this.noticeForm.patchValue(data);
  }

  // Save Announcement
  saveNotice() {
    var valid = this.noticeForm.valid;
    if(valid) {
      var data = this.noticeForm.value;
      var id = data.id;
      data.noticeHide = !data.noticeHide;

      // So, How are we updating the db?
      if(id > 0){
        // Save existing Record
        this.apiService.saveAnnouncement(data.id, data).subscribe((result: INotice)=>{
          this.noticeKeyToEdit = -1;
          this.fetchCompanyAnnouncements(this.companyKey);
        });
      } else {
        // Insert New Record
        this.apiService.insertAnnouncement(data).subscribe((result: number)=>{
          if(result > 0){
            this.noticeKeyToEdit = -1;
            this.fetchCompanyAnnouncements(this.companyKey);
          } else {
            alert('Sorry, but something went wrong, the record was not insdrted!');
          }         
        });
      }
    }
  }

  // Delete Notice
  deleteNotice(id: number) {
    if (confirm("Are you sure you want to delete this Announcement?") == true) {
      debugger;
      this.apiService.deleteNotice(id).subscribe((result: boolean)=>{
        if (result){
          this.noticeKeyToEdit = -1;
          this.fetchCompanyAnnouncements(this.companyKey);
        }
      });
    }
  }

  isFieldValid(field: string) {
    var isValid = this.noticeForm.get(field).valid;
    return isValid;
  }

}

