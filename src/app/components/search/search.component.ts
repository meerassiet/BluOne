import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  IFSCForm: FormGroup;
  bankForm: FormGroup;

  IFSCSearch: any;
  branchData: any[];
  displayList: any[];
  isEmptyList = true;

  bankName; bankNames: any[];
  bankBranchNames: any;

  districtName;
  districtNames: any;
  districtNamesList: any[];

  stateName;
  stateNames: any;
  stateNamesList: any;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.branchData = JSON.parse(localStorage.getItem('branchList'));
    this.IFSCForm = this.formBuilder.group({
      IFSC: ['', Validators.required]
    });

    this.bankForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      Bank: ['', Validators.required],
      District: ['', Validators.required],
      State: ['', Validators.required]
    });

    this.bankNames = this.branchData.map(x => x.Bank);
    this.bankNames = _.uniqBy(this.bankNames);
  }

  onSubmit() {
    this.displayList = [];
    this.branchData.forEach(element => {
      if (element.IFSC_Code == this.IFSCSearch ||
        (element.BranchName == this.bankForm.value.BranchName &&
          element.Bank == this.bankForm.value.Bank &&
          element.District == this.bankForm.value.District &&
          element.State == this.bankForm.value.State)) {
        this.displayList.push(element);
      }
    });
    if (this.displayList.length == 0) {
      this.isEmptyList = true;
      alert("No matching item found");
    }
    else
      this.isEmptyList = false;
  }

  getStates(bankName) {
    this.stateNames = [];
    this.branchData.forEach(element => {
      if (element.Bank == bankName)
        this.stateNames.push({ State: element.State, District: element.District, BranchName: element.BranchName });
    });
    this.stateNamesList = [];
    this.stateNamesList = _.uniqBy(this.stateNames, 'State');
  }

  getDistricts(stateName) {
    this.districtNames = [];
    this.stateNames.forEach(element => {
      if (element.State == stateName)
        this.districtNames.push({ District: element.District, BranchName: element.BranchName });
    });
    this.districtNamesList = [];
    this.districtNamesList = _.uniqBy(this.districtNames, 'District');
  }

  getBranchNames(districtName) {
    this.bankBranchNames = [];
    this.districtNames.forEach(element => {
      if (element.District == districtName)
        this.bankBranchNames.push({ BranchName: element.BranchName });
    });
  }
}
