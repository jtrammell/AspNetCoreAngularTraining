// Interfaces for data coming in 

import { Pipe, PipeTransform } from "@angular/core";

export interface ICompanyData {
    id: BigInteger;
    companyName: string;
    dateCreated: string;
}

export interface INotice {
    id: BigInteger;
    noticeCompanyKey: BigInteger;
    noticeHide: boolean;
    noticeFromDate: string;
    noticeToDate: string;
    noticeSubject: string;
    message: string;
    noticeLink: string
}

export interface INoticeList {
    notices: [INotice];
}
