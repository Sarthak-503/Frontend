import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from 'src/app/shared/common.service';

export class User {
  code!: String;
  title!: String;
  description!: String;
  purpose!: String;
  }
  export class User1{
    data:any;
  }

  @Injectable({
    providedIn: 'root',
  }) 
export class ApiService {
  adaptation_id:number=1;
  // private  targetUrl1= 'https://help-api.dataforall.org/api/';
  key:any=1; 
  constructor(private http: HttpClient, private common:CommonService ) {} 
  //Selected Adaptations
  getadaptations(): Observable<any> {
    return this.http.get(environment.API_URL + 'adaptations',{
    });
  }
     getKeys(data:any):Observable<any>{
      // this.adaptation_id=data;
      //this.common.setProductCode(data);
      //console.log(data);
      return this.http.get(`${environment.API_URL}keys?adaptation_id=${data}`,{
      });
     }

     getKeysData(data:any):Observable<any>{
      return this.http.get(`${environment.API_URL}keydata/${data}`,{
      });
     }
    //  token*, title*, parent_id*, lang
     createData(title:string,parent_id:number):Observable<any>{
      return this.http.post(`${environment.API_URL}create?adaptation_id=${this.adaptation_id}&parent_id=${parent_id}
      &title=${title}`,{
      })
     }
     update(user: User): Observable<any> {
      return this.http.put<any>(environment.API_URL + 'update', user);
    }
    delete(data:any):Observable<any>{
      return this.http.put(`${environment.API_URL}delete?id=${data.id}`,{
      });
     }     
}
