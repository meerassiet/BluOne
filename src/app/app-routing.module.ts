import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchlistComponent } from './components/branchlist/branchlist.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'branchlist', component: BranchlistComponent },
  { path: 'search', component: SearchComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
