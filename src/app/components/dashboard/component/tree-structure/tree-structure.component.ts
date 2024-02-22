import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import { ApiService } from 'src/app/shared/Api.service';
import { CommonService } from 'src/app/shared/common.service';
import { ChangeDetectorRef } from '@angular/core';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
interface TreeNode {
  children: TreeNode[];
  id:number,
  key:string,
  showInput:boolean, 
  code:string,
  Desciption:string,
  title:string,
  parentKey:string,
  parent_id:number,
  [key: string]: any;
}

 
@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.css']
})
export class TreeStructureComponent {
  treeAllData:Array<TreeNode>=[];
  searchkey:string="";
  processing = false;
  val:number=1;
  nestedTreeControl: NestedTreeControl<TreeNode>;
  nestedDataSource: MatTreeNestedDataSource<TreeNode>;
  dataChange: BehaviorSubject<TreeNode[]> = new BehaviorSubject<TreeNode[]>([]);
  parentdataChange: BehaviorSubject<TreeNode[]> = new BehaviorSubject<TreeNode[]>([]);
  private getChildren = (node: TreeNode) => { return observableOf(node.children); };
  deleteMessage = "";
  msgColor = "";

  constructor(private api:ApiService,
    private cdk:ChangeDetectorRef,
    private common:CommonService) {
    this.nestedTreeControl = new NestedTreeControl<TreeNode>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit(): void {
    var num:any;
    this.common.getParentVariableChanges().subscribe((variable) => {
      if(variable){
     num=variable;
      }
    this.api.getKeys(num).subscribe(res=>{
      this.treeAllData = res.data;
      this.nestedDataSource.data=res.data;
      this.dataChange.next(res.data);
    })
  })
    this.common.getVariableChanges().subscribe((variable) => {  
      this.api.getKeys(variable).subscribe(res=>{
        //console.log(res);
        // console.log(this.keydata);
        this.nestedDataSource.data=res.data;
        this.dataChange.next(res.data);
      });
      this.dataChange.subscribe(data => this.nestedDataSource.data = data);
  })
  }
  
  // hasNestedChild = (_: number, nodeData: TreeNode) => {return !(nodeData.type); };
  hasNestedChild(index:number, node :TreeNode){
    if(node.children !== undefined && node.children.length > 0)
      return true;
    else{
      return false;
    }
  }

  dataofchildrens:any;
  InsertedChild:any;
  LastNodeCreated:string="";
  NewNodeCreeated:boolean=false;
  tab=true;

  MakeANewKey(data:any, Nodedata:any) { 
    const inputValue = (data.target as HTMLInputElement).value;
    this.api.createData(inputValue,Nodedata.id).subscribe(res =>{
      if(res.success == true) {
        // Prepare the new node
        const newNode: TreeNode = {
          children:[],
          id: res.data.key_details.id,
          key: "",
          showInput: false,
          code: "",
          Desciption: "",
          title: inputValue, 
          parentKey: Nodedata.key,
          parent_id: Nodedata.id
        }
        // push into parent
        Nodedata.children.push(newNode);
        //this.NewNodeCreeated = true;
        this.nestedTreeControl.isExpanded(newNode);
        // Nodedata.nestedTreeControl=[...Nodedata.nestedTreeControl];
        // Update the nestedDataSource
        // this.nestedDataSource=[...this.nestedDataSource];
           
        // Retrieve the current data
        const currentData = this.nestedDataSource.data;
        // Create a new TreeNode object for the new node

        // Find the parent node where you want to add the new node  
        const parentNode: TreeNode = Nodedata;
        const childrenn = parentNode.children;
        
        // Node Added to top leval 
        // if (parentNode) {
        //   if (!parentNode.children) { 
        //     parentNode.children = [];
        //   }
        //   parentNode.children.push(newNode);
        // } else {
        //   // If parentNode is null, it means the new node is a top-level node
        // }
        // currentData.push(newNode);
        this.parentdataChange.subscribe(data => this.nestedDataSource.data = data);
        // this.parentdataChange.subscribe(data => parentNode.children = data);
        //parentNode.children.push(newNode);    
        this.nestedDataSource.data = currentData;
        this.treeAllData = this.nestedDataSource.data;
        this.cdk.detectChanges();
      } else {
        // error
      }
      
    },
    (error) => {   
      this.common.errorHandler(error);   
    }
  )
}

  var=true;
  activeNode: any;  
  toggleNode(node: TreeNode) {
    this.common.setId(node.id);
    this.activeNode=node.id;
    //  node.nestedTreeControl.collapseAll
    this.nestedDataSource.data.forEach ((node) => {
      this.nestedTreeControl.toggle(node);
      this.nestedTreeControl.collapseAll();
    })
  }

  toggleInputBox(node: TreeNode) {
    console.log(node.showInput);
    // const var=node.showInput; 
    node.showInput = !node.showInput;
  }
  onNodeClick(node:TreeNode) {
    this.common.setId(node.id);
    this.common.setKey(node.parentKey);
    this.common.setNode(node.title);
  }
  applyOnNode(){
     
  }
  getParentNodeById(data: any, searchKey: string, searchValue: number): TreeNode |null{
    for (const item of data) {
      if (item[searchKey] == searchValue) {
        return item;   // return Id of Node Found
      }
      for (const child of item.children) {
        const result = this.getParentNodeById([child], searchKey, searchValue);
        if (result) {
          return result; // Return the id from the child if found
        }
      }
    }
    
    return null; // Return null if the search value is not found
  }

  /**
   * Function to dleete a node
   * @param node 
   * @returns 
   */
  deleteNode(node :TreeNode) { 
    const delConfirmMsg = "Are you sure, you want to delete this key?";
    this.deleteMessage = "";
    this.msgColor = "";
    if(confirm(delConfirmMsg)){
      this.api.delete(node).subscribe(res=>{
        if(res.success) {
          // Key deleted Successfully
          var nestedData = this.nestedDataSource.data;
          // Getting a reference to parent Node to delete Node 
          const parentNode = this.getParentNodeById(nestedData, "id", node.parent_id);
          const nodeIndex = parentNode?.children.findIndex(Node => Node.id == node.id);
          if (nodeIndex !== undefined) {
            parentNode?.children.splice(nodeIndex, 1);
          }
          const currentData = this.nestedDataSource.data;
          this.parentdataChange.subscribe(data => this.nestedDataSource.data = data);
          this.nestedDataSource.data = currentData;
          this.cdk.detectChanges();

          this.deleteMessage = res.message;
          this.msgColor = "green";
   
        } else {
          // Error in deletion
          this.deleteMessage = res.message;
          this.msgColor = "red";
        }
      });
    }
    
    return false;
    this.api.delete(node).subscribe(res=>{
      console.log(res);
      this.deleteMessage = res.message;
      //const pNode = this.parentNodeMap.get(node);
      var currentData = this.nestedDataSource.data; 
      for (let i=0; i< currentData.length; i++) {
        if (currentData[i].id === node.id) {

          this.parentdataChange.subscribe(data => this.nestedDataSource.data = data);
        // this.parentdataChange.subscribe(data => parentNode.children = data);
        //parentNode.children.push(newNode);    
        this.treeAllData = this.nestedDataSource.data;
        this.cdk.detectChanges();

          //this.nestedDataSource.data.splice(i, 1);
  
          // if (parentNode.children) {
          //   //if you want to warn user
          // }
  
          // this.dataChange.value[0].children.splice(i, 1);
          // this.flatNodeMap.delete(node);
          // this.dataChange.next(this.data);
        }
      }
      setTimeout(function() {
        //this.deleteMessage = "";
      }, 1000);
    })
  }  
  
  // Start Search 
  searchKey(){
    this.filterTree(this.searchkey);
    // show / hide based on state of filter string
    // if (this.searchkey) {
    //   this.nestedTreeControl.expandAll();
    // } else {
    //   this.nestedTreeControl.collapseAll();
    // }
    for(const item of this.nestedDataSource.data){
      this.expandCollapseTree(item);
    }
  }
  expandCollapseTree(node: any): void {
    if(this.searchkey) { console.log(node.showInput);
      //this.nestedTreeControl.expand(node);
      //this.nestedTreeControl.toggle(node);

      if(!node.showInput){
        node.showInput = true;
        this.nestedTreeControl.expand(node);
      }

      if (node.children) {
        node.children.forEach((childNode: any) => {
          this.expandCollapseTree(childNode);
        });
      }
    }    
  }
  // pass mat input string to recursive function and return data
  filterTree(filterText: string) {
    // use filter input text, return filtered TREE_DATA, use the 'name' object value
    this.nestedDataSource.data = this.filterRecursive(filterText, this.treeAllData, 'title');
  }
  // filter recursively on a text string using property object value
  filterRecursive(filterText: string, array: any[], property: string) {
    let filteredData;

    //make a copy of the data so we don't mutate the original
    function copy(o: any) {
      return Object.assign({}, o);
    }

    // has string
    if (filterText) {
      // need the string to match the property value
      filterText = filterText.toLowerCase();
      // copy obj so we don't mutate it and filter
      filteredData = array.map(copy).filter(function x(y) {
        if (y[property].toLowerCase().includes(filterText)) {
          return true;
        }
        // if children match
        if (y.children) {
          return (y.children = y.children.map(copy).filter(x)).length;
        }
      });
      // no string, return whole array
    } else {
      filteredData = array;
    }

    return filteredData;
  }
  // End Search

  checkTopParent(node:TreeNode)
  { 
    if(node.parent_id==null)
      return false;
    else
      return true;
  }

  
}
