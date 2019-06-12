import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalViewComponent } from 'src/app/components/modal-view/modal-view.component';
import { MaterialModule } from 'src/app/material.module';
import { NgPipesModule, FilterByPipe } from 'ngx-pipes';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgPipesModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomeComponent,ModalViewComponent],
  providers:[FilterByPipe]
})
export class HomePageModule {}
