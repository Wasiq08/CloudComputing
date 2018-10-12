import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService} from '../../core/services/auth/auth.service';
import { SpecialistScheduleService,OffDays,Holidays,Schedule } from "../../core/services/specialist/specialistschedule.service";
import {Sort} from '@angular/material';

@Component({
moduleId : module.id,
templateUrl : 'msgdialog.component.html'
})

export class MsgDialog implements OnInit {
    
    title = 'Social-CxN';
    msg = 'Test Message';
    okBtnTitle = 'Ok';
    cancelBtnTitle = 'Cancel';
    inputMessage = '';
    selectedDatesWorkingDay:Schedule;
    showInput;
    public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' } 
    btn:boolean = true;   
    timezoneoffset:number; 
    TimeZone;
    Color=false;

    sortedData;
    Defaultsort: Sort;
    
    constructor(private _authServices: AuthService, public dialogRef: MatDialogRef<MsgDialog>){
         //this.sortedData = this.selectedDatesWorkingDay.details.slice();
    }
    // txtarea()
    // {
    //     if(this.inputMessage != '')
    //     {
    //         this.btn=false;
    //     }
        
    // }
    
    sortData(sort: Sort) {

         console.log("sortData: PRIORITYasc "+ sort.active +sort.direction );
        const data = this.selectedDatesWorkingDay.details.slice();
        if (!sort.active || sort.direction == '') {
          this.sortedData = data;
          return;
        }
    
        if (this.Color) {
            this.sortedData = data.sort((a, b) => {
                let isAsc = sort.direction == 'asc';
                switch (sort.active) {
                  case 'PARTNERSITE': return compare(a.partnerSiteName, b.partnerSiteName, isAsc);
                  case 'DOCTOR': return compare(+a.specialistName, +b.specialistName, isAsc);
                  case 'CONTACT': return compare(+a.spcialistContactNumber, +b.spcialistContactNumber, isAsc);
                  case 'PRIORITY': return compare(+a.priority, +b.priority, isAsc);
                 
                  case 'START': return compare(+a.shiftStartTimeInUTC, +b.shiftStartTimeInUTC, isAsc);
                  case 'END': return compare(+a.shiftEndTimeInUTC, +b.shiftEndTimeInUTC, isAsc);
                  default: return 0;
                }
              });
        }else
        {
            this.sortedData = data.sort((a, b) => {
                let isAsc = sort.direction == 'asc';
                switch (sort.active) {
                  case 'PARTNERSITE': return compare(a.partnerSiteName, b.partnerSiteName, isAsc);
                  case 'DOCTOR': return compare(+a.specialistName, +b.specialistName, isAsc);
                  case 'CONTACT': return compare(+a.spcialistContactNumber, +b.spcialistContactNumber, isAsc);
                  case 'PRIORITY': return compare(+a.priority, +b.priority, isAsc);
                 
                  case 'START': return compare(+a.shiftStartTime, +b.shiftStartTime, isAsc);
                  case 'END': return compare(+a.shiftEndTime, +b.shiftEndTime, isAsc);
                  default: return 0;
                }
              });
        }
      


      }

        
    getTimezone() {
        
            var d = new Date();
            var offset = d.getTimezoneOffset();
            console.log("//T offsetcurrent: "+ offset);
        
            let getUser=this._authServices.getUser();
            console.log("//T offsetstate: "+ getUser.utcDSTOffset / 60);
            if (getUser != null) {
              offset = offset + (getUser.utcDSTOffset / 60);
              this.timezoneoffset=offset; 
            }
        
            
        
            // if()
            console.log("Timezone: "+ offset);
        }
    getState()
    {   
          let getUser=this._authServices.getUser();
          if (getUser != null) {
            this.TimeZone= getUser.stateName;
          }
          
    }
    
    ngOnInit()
    {
       
            if(this.showInput == 'scheduebox') 
            {
                this.getTimezone();
                this.getState();
                
            for (var index = 0; index < this.selectedDatesWorkingDay.details.length; index++) {
            
                if (this.selectedDatesWorkingDay.details[index].priority == 1) {
                    this.selectedDatesWorkingDay.details[index].priority = "First";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '2') {
                    this.selectedDatesWorkingDay.details[index].priority = "Second";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '3') {
                    this.selectedDatesWorkingDay.details[index].priority = "Third";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '4') {
                    this.selectedDatesWorkingDay.details[index].priority = "Fourth";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '5') {
                    this.selectedDatesWorkingDay.details[index].priority = "Fifth";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '6') {
                    this.selectedDatesWorkingDay.details[index].priority = "Sixth";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '7') {
                    this.selectedDatesWorkingDay.details[index].priority = "Seveth";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '8') {
                    this.selectedDatesWorkingDay.details[index].priority = "Eight";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '9') {
                    this.selectedDatesWorkingDay.details[index].priority = "Ninth";
                }else  if (this.selectedDatesWorkingDay.details[index].priority == '10') {
                    this.selectedDatesWorkingDay.details[index].priority = "Tenth";
                }
                
            }
            
            
            this.sortedData = this.selectedDatesWorkingDay.details.slice();

            // this.Defaultsort.active ='';
            // this.Defaultsort.direction ="asc";
            // this.sortData(this.Defaultsort) ;
                
                        // console.log("sortData:"+ sort.active +sort.direction );
            // this.selectedDatesWorkingDay.details.sort();
        }
    }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }