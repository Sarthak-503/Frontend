import { Component, OnInit, Input, ViewEncapsulation, OnChanges, AfterContentInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/Api.service';
import { CommonService } from 'src/app/shared/common.service';
import { TitleCasePipe } from './pipe';
import { AuthService } from 'src/app/shared/auth.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AngularEditorModule ,AngularEditorComponent} from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  processing = false;
  processMsg = "";
  updateform: FormGroup;
  errors: any;
  failure=false;
  isSignedIn!: boolean;
  comingdata: any;
  statuscode: string = "";
  loginerror = false;
  data: any;
  loginornot: string = "";
  userdetails: [] = [];
  titleShow = "";
  htmlContent='';
  editor: any;
  adapKey: string = '';
  adapParentKey: string = ''

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public api: ApiService,
    public commonservice: CommonService,
    private builder: FormBuilder,
  ) {
    this.updateform = this.fb.group({
      code: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      desc: ['', Validators.compose([Validators.required])],
      purpose: ['', Validators.compose([])],
      key: ['', Validators.compose([Validators.required])],
      id: ['', Validators.compose([Validators.required])],
      related_keys: ['', Validators.compose([])],
      lang:['',Validators.compose([Validators.required])]
    });
  }


  Options: string[] = ['en', 'fr', 'es', 'pt', 'ar'];
  selectedOption: string = 'en';
  languagedetails: any;
  idofkey = 1;
  lang = "en";
  selectOption(option: string): void {
    this.selectedOption = option;
    this.lang = option;
  }

  ngOnInit(): void {
   var num:any;
    this.commonservice.getParentVariableChanges().subscribe((variable) => {
      if(variable){
        num=variable;
      }
      // get all the keys
      this.api.getKeys(num).subscribe(res=>{
        let topKeyID = res?.data[0]?.id;
        let topKeyName = res?.data[0]?.title;
        this.commonservice.setNode(topKeyName)
        // get the top keys data
        this.api.getKeysData(topKeyID).subscribe((result) => {

          // this.updateform.patchValue(result.data);
          this.languagedetails = result.data.translations;
          // this.updateform.value.related_keys=result.data.related_keys[0].key;

          // // Excluding Related Keys

          // change variable based on clicked
          const index = result.data.translations.findIndex((obj: any) => obj.locale === this.lang);
          if (index !== -1) {
            // if data already present
            this.updateform.patchValue(result.data.translations[index]);
          }
          const excludedField = 'related_keys'; // Field to exclude from patching
          const { [excludedField]: omittedField, ...patchData } = result;
          this.updateform.patchValue(patchData);

          // Set the form data
          this.setFormValues(result.data);
        })
      })
    })
    this.commonservice.getIdChanges().subscribe((Id) => {
      this.api.getKeysData(Id).subscribe((result) => {
        this.commonservice.setKey(result.data.parentKey);
        this.languagedetails = result.data.translations;

        // change variable based on clicked
        const index = result.data.translations.findIndex((obj: any) => obj.locale === this.lang);
        if (index !== -1) {
          // if data already present
          this.updateform.patchValue(result.data.translations[index]);
        }
        const excludedField = 'related_keys'; // Field to exclude from patching
        const { [excludedField]: omittedField, ...patchData } = result;
        this.updateform.patchValue(patchData);
        // this.updateform.patchValue(result.data);

        // Set the form data
        this.setFormValues(result.data);
      })
    })
  }
  EmptyValue = { locale: '', title: '', desc: '', purpose: '' };

  updatevalue() {
    //  var i=0;
    for (let i = 0; i < ((this.languagedetails).length); i++) {
      //console.log(this.languagedetails.length);
      if (this.lang === this.languagedetails[i].locale) {
        this.updateform.patchValue(this.languagedetails[i]);
        break;
      }
      if (this.lang !== this.languagedetails[i].locale && i == ((this.languagedetails).length) - 1) {
        this.updateform.patchValue(this.EmptyValue);
      }
    }
  }

  onSubmit() {
    if(!this.updateform.value.code || !this.updateform.value.title || !this.updateform.value.desc) {
      alert('Please fill mandatory input! Code, Title and Description fields are mandatory.');
      return false;
    }
    this.processMsg = "";
    this.processing = true;
    // ----------- prepare parent key
    var parentKey = this.commonservice.getKey(); // Node's parent key
    var pCode = this.commonservice.getProductCode();
    var nodeKey = ((parentKey) ? parentKey : pCode) + '-' + this.updateform.value.code;
    if(!this.updateform.value.key || (nodeKey != this.updateform.value.key)) {
      if(this.adapParentKey == '') {
        let parts: string[] = this.adapKey.split('-');
        this.updateform.value.key = parts[0] + '-' + this.updateform.value.code;
      } else {
        this.updateform.value.key = nodeKey;
        this.updateform.get('key')?.setValue(nodeKey);
      }
    }
    // const formValues = this.updateform.value;

    // console.log(this.updateform.value);
    // if(this.updateform.value.related_keys.length!=0){
    //   this.updateform.value.related_keys=this.updateform.value.related_keys[0].key;
    //   this.updateform.value.code=this.updateform.value.code;
    // }
    this.updateform.value.lang=this.lang;
    this.api.update(this.updateform.value).subscribe(
       (result) => {
        // if(result.data.status)
        this.showMessage(false, result); // success
        // change the values in case of update
        this.updateform.value.locale=this.lang;
        this.updateform.value.related_keys=result.data.related_keys;
        const index = this.languagedetails.findIndex((obj: any) => obj.locale === this.updateform.value.lang);
        if (index !== -1) {
          // if data already present
          this.languagedetails[index] = this.updateform.value;
        }else {
          // if new lang data
          this.languagedetails.push(this.updateform.value);
        }
      },
      (error) => {
        this.showMessage(true, error); // failed

        this.commonservice.errorHandler(error);
      })
  }

  rmverror() {
    this.loginerror = false;
  }
  forget() {
    this.router.navigate(['forgetpassword']);
  }
  // Handle response
  responseHandler(userdata: any) {
    // this.token.handleData(userdata.data.token);  //access_token
    // this.loginornot=userdata.success;
    // this.dataofuser.Name=userdata.data.user.name;
    // this.dataofuser.Email=userdata.data.user.email;
  }

  /// Function to set form values once get the data from API
  setFormValues(data: any) {
    // Prepare related keys
    var relatedKeysAr: any = [];
    if(data.related_keys.length > 0) {
      for(var i = 0; i< data.related_keys.length; i++) {
        relatedKeysAr.push(data.related_keys[i].key);
      }
    }
    this.adapKey = data?.key ?? '';
    this.adapParentKey = data?.parentKey ?? '';
    this.updateform.get('related_keys')?.setValue((relatedKeysAr.length > 0) ? relatedKeysAr.join(',') : "");
    this.updateform.get('code')?.setValue(data.code);
    this.updateform.get('key')?.setValue(data.key);
    this.updateform.get('id')?.setValue(data.id);
    // update data after key change
    this.languagedetails = data?.translations;
    this.updatevalue();
  }

  showMessage(error: boolean, data: any) {
    this.processMsg = data.message;
    this.processing = false;
  }

  descriptioncontent="";
  purposecontent="";
  toolbarConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '14rem',
    minHeight: '7rem',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    showToolbar: true,
    placeholder: 'Enter text here...',
    toolbarHiddenButtons: [
      [
      'strikeThrough',
      'subscript',
      'superscript',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
      // 'insertUnorderedList',
      'insertOrderedList',
      'heading',
      'fontName',
      'fontSize',
      'textColor',
      'backgroundColor',
      // 'customClasses',
      'link',
      'unlink',
      // 'insertImage',
      'insertVideo',
      // 'insertHorizontalRule',
      'removeFormat',
      'undo',
      'redo',
      'code',
      ]
      // 'toggleEditorMode',
    ],
    customClasses: [
      {
        name: "Title",
        class: "dfaHelpTitleOFEditor",
        tag:'h1'
      },
    ],
  };
  handleCodeIconClick(): void {
    const editor = document.querySelector('.angular-editor-textarea');
    const currentContent = editor?.innerHTML;
    const modifiedContent = `<p>${currentContent}</p>`;
    // editor.innerHTML = modifiedContent;
  }

  // handleCodeIconClick(editor: AngularEditorComponent): void {
  //   // const htmlCode = '<font color="red">Hello, World!</font>'; // Retrieve the HTML code from your API

  //   // Manipulate the HTML code
  //   // const updatedHtmlCode = `<p>${htmlCode.replace(/<\/?font[^>]*>/g, '')}</p>`;

  //   // Insert the modified HTML code into the editor's textarea
  //   // editor.insertContent(updatedHtmlCode);
  //   const htmlCode = '<font color="red">Hello, World!</font>'; // Retrieve the HTML code from your API
  //   console.log(htmlCode);
  //   const modifiedCode = `<p>${htmlCode}</p>`;

  //   // Set the modified HTML code as the editor's content
  //   editor.html = modifiedCode;
  // }
}
