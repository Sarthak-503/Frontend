import { Injectable} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, of as observableOf, Subject,Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  constructor(public router: Router) {  }
  
  IdofAdaptaions: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  Key: BehaviorSubject<string> = new BehaviorSubject<string>("BYD-DASH");
  title: BehaviorSubject<string> = new BehaviorSubject<string>("DASHBOARD");
  Id: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  // parentkey:BehaviorSubject<string> = new BehaviorSubject<string>("BYD-DASH");
  parentId: BehaviorSubject<number> = new BehaviorSubject<number>(1);




  public firstvar: any;
  private FirstvariableSubject: Subject<number> = new Subject<number>();

  setParentVariable(value: number): void {
    this.firstvar = value;
    this.FirstvariableSubject.next(value);
  }
  
  getParentVariable(): number {
    return this.firstvar;
  }
  
  getParentVariableChanges(): Observable<number> {
    return this.FirstvariableSubject.asObservable();
  }



  private var: number=1;
  private variableSubject: Subject<number> = new Subject<number>();

  setVariable(value: number): void {
    this.var = value;
    this.variableSubject.next(value);
  }

  getVariable(): number {
    return this.var;
  }
  
  getVariableChanges(): Observable<number> {
    return this.variableSubject.asObservable();
  }
   
  private Parentdofchild: number=1;
  private ParentVarId: Subject<number> = new Subject<number>();

  setParentId(id: number): void {
    this.idofchild = id;
    this.VarId.next(id);
  }

  getParentId(): number {
    return this.idofchild;
  }
  
  getParentIdChanges(): Observable<number> {
    return this.VarId.asObservable();
  }

   
// // Data(Key) of Parent Key to be sent to the form
//   private parentkeyy:string="BYD-DASH";
//   private VARKEY: Subject<string> = new Subject<string>();
//   setKey(val: string): void {
//     this.parentkeyy = val;
//     this.VARKEY.next(val);
//   }

//   getKey(): number {
//     return this.var;
//   }
  
//   getKeyChanges(): Observable<string> {
//     return this.VARKEY.asObservable();
//   }


  // // Data(title) of the newly created key be sent to the form
  // private titleofparent:string="DASHBOARD";
  // private VARTITLE: Subject<string> = new Subject<string>();
  // settitle(val: string): void {
  //   this.titleofparent = val;
  //   this.VARTITLE.next(val);
  // }

  // gettitle(): string {
  //   return this.titleofparent;
  // }
  
  // gettitleChanges(): Observable<string> { 
  //   return this.VARTITLE.asObservable();
  // }



  //Data(Id) of newly created child 
  private idofchild: number=1;
  private VarId: Subject<number> = new Subject<number>();

  setId(id: number): void {
    this.idofchild = id;
    this.VarId.next(id);
  }

  getId(): number {
    return this.idofchild;
  }
  
  getIdChanges(): Observable<number> {
    // console.log("Sarthak");
    return this.VarId.asObservable();
  }

  
  //Data(ParentKey) of newly created child 
  private ParentKeyofchild: string="";
  private VarKey: Subject<string> = new Subject<string>();

  setKey(key: string): void {
    this.ParentKeyofchild = key;
    this.VarKey.next(key);
  }

  getKey(): string {
    return this.ParentKeyofchild;
  }
  
  getKeyChanges(): Observable<string> {
    // console.log("Sarthak");
    return this.VarKey.asObservable();
  }


  //Data(Node Show) of newly created child 
  private Node: string="Dashboards";
  private VarNode: Subject<string> = new Subject<string>();

  setNode(node: string): void {
    this.Node = node;
    this.VarNode.next(node);
  }

  getNode(): string {
    return this.Node;
  }
  
  getNodeChanges(): Observable<string> {
    // console.log("Sarthak");
    return this.VarNode.asObservable();
  }

  private selProductCode: string = "";
  private VarCode: Subject<string> = new Subject<string>();
  setProductCode(key: string): void {
    this.selProductCode = key;
    this.VarCode.next(key);
  }
  getProductCode(): string {
    return this.selProductCode;
  }

  errorHandler(error:any) {
    if(error.status == '401' || error.status == 401) {
      // Redirect to login screen
      this.router.navigate(['login']);
    } else {
      console.log(error);
    }
    
  }

  
   
}
