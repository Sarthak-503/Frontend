import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpParams } from '@angular/common/http';


// export class User {
//   code!: String;
//   title!: String;
//   description!: String;
//   purpose!: String;
//   }
//   export class User1{
//     data:any;
//   }

//   @Injectable({
//     providedIn: 'root',
//   }) 
// export class ApiService {
//   adaptation_id:number=1;
//   private  targetUrl= 'https://help-api.dataforall.org/api/';
//   key:any=1; 
//     constructor(private http: HttpClient ) {} 
//     //Selected Adaptations
//     getadaptations(): Observable<any> {
//         return this.http.get(this.targetUrl+'adaptations',{
//         });
//       }
//      getKeys(data:any):Observable<any>{
//       // this.adaptation_id=data;
//       return this.http.get(this.targetUrl+'keys?adaptation_id=${data}',{
//       });
//      }

//      getKeysData(data:any):Observable<any>{
//       return this.http.get(this.targetUrl+'keydata/${data}',{
//       });
//      }
//     //  token*, title*, parent_id*, lang
//      createData(title:string,parent_id:number):Observable<any>{
//       return this.http.post(this.targetUrl+'create?adaptation_id=${this.adaptation_id}&parent_id=${parent_id}&title=${title}',
//       { })
//      }
//      update(user: User): Observable<any> {
//       return this.http.put<any>(this.targetUrl+'update', user);
//     }
//     delete(data:any):Observable<any>{
//       return this.http.post(this.targetUrl+'delete?key=${data}',{
//       });
//      }     
// }
