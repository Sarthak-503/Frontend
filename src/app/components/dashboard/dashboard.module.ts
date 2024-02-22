import { NgModule  } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { SelectorComponent } from './component/selector/selector.component';
import { HeaderComponent } from './component/header/header.component';
import { ContentComponent } from './component/content/content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule} from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field'
import {CdkAccordionModule} from '@angular/cdk/accordion'; 
import { FormsModule } from '@angular/forms';
import { TreeStructureComponent } from './component/tree-structure/tree-structure.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';
@NgModule({
  declarations: [
   MainPageComponent,
   SelectorComponent,
   HeaderComponent,
   ContentComponent,
   DashboardComponent,
   TreeStructureComponent,
   
   
  ],
  imports: [
    MatTreeModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    CdkAccordionModule,
    MatCardModule,
    FormsModule,
    AngularEditorModule
    
  ],
  exports:[ ]
})
export class DashboardModule { }




