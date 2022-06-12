import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoidComponent } from './components/void/void.component';

const routes: Routes = [
  {
    path: 'void', component: VoidComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
