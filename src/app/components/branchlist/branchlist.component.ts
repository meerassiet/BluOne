import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-branchlist',
  templateUrl: './branchlist.component.html',
  styleUrls: ['./branchlist.component.css']
})

export class BranchlistComponent implements OnInit {

  addForm: FormGroup;
  UserEmail: string;
  isAddBranch = false;
  branchData = [];
  districtSearch;
  districtList: any[];

  stateDistrict: Array<any> = [
    { name: 'TamilNadu', district: ['Chennai', 'Madurai'] },
    { name: 'Karnataka', district: ['Bangalore', 'Mangalore'] },
  ];

  constructor(public formBuilder: FormBuilder,
    public router: Router) { }

  ngOnInit(): void {

    if (!localStorage.getItem('currentUser'))
      this.router.navigate(['/']);

    this.UserEmail = localStorage.getItem('currentUser');
    console.log(localStorage.branchList);
    this.branchData = JSON.parse(localStorage.getItem('branchList'));
    this.branchData = _.sortBy(this.branchData, (o: { IFSC_Code: any; }) => o.IFSC_Code)


    this.addForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      IFSC_Code: ['', Validators.required],
      Bank: ['', Validators.required],
      District: ['', Validators.required],
      State: ['', Validators.required]
    });
  }

  addBranch() {
    this.isAddBranch = true;
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    else {
      if (this.branchData.some(bank => bank.IFSC_Code == this.addForm.value.IFSC_Code))
        alert("IFSC code already exists");
      else {
        this.branchData.push(this.addForm.value);
        localStorage.setItem("branchList", JSON.stringify(this.branchData));
      }
    }
  }

  getDistrict(selectedState) {
    this.districtList = this.stateDistrict.find(state => state.name == selectedState).district;
  }

  deleteItem(index) {
    this.branchData.splice(index, 1);
    localStorage.setItem("branchList", JSON.stringify(this.branchData));
  }

  LogOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  sortData(sort: Sort) {
    const data = this.branchData.slice();
    if (!sort.active || sort.direction === '') {
      this.branchData = data;
      return;
    }

    this.branchData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Bank': return compare(a.Bank, b.Bank, isAsc);
        case 'BranchName': return compare(a.BranchName, b.BranchName, isAsc);
        case 'IFSC_Code': return compare(a.IFSC_Code, b.IFSC_Code, isAsc);
        case 'District': return compare(a.District, b.District, isAsc);
        case 'State': return compare(a.State, b.State, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}