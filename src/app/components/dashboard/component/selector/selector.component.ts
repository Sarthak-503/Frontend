import { AfterViewChecked, Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/Api.service';
import {Adaptations} from './selector.adaptations'
import { CommonService } from 'src/app/shared/common.service';
@Component({
  selector: 'app-selector', 
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
}) 

export class SelectorComponent implements OnInit{
//  @Output() initalAdaptationsNumber=new EventEmitter<Number>();
  adaptations:any;
  idOfAdaptations:number=1;
  apaptationName:string="";
  NodeName="";
  
  ngOnInit(){
    this.getAdaptation();
    this.common.getNodeChanges().subscribe((node)=>{
      this.NodeName=node;
    })
  }
  
  constructor(public api:ApiService, private common:CommonService, ){
  }

  getAdaptation()
  {
    this.api.getadaptations().subscribe((result)=>{
      this.adaptations=result.data;
      this.common.setParentVariable(result.data[0].id);
      this.common.setProductCode(result.data[0].code);

      this.NodeName = this.common.getNode();
    },
    (error) => {   
      this.common.errorHandler(error);   
    }
    )
  }

  onChangeAdaptation()
  {
    this.common.IdofAdaptaions.next(this.idOfAdaptations);
    // this.common.TopParent.next(this.apaptationName);
    this.common.setVariable(this.idOfAdaptations);
    this.common.setParentVariable(this.idOfAdaptations);
  }

}


