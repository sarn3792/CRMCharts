import { Component, OnInit } from '@angular/core';
import { ProspectService } from './prospect.service';
import {Observable} from 'rxjs/Rx';
import { Prospect } from './prospect';
import { ChartData } from "../chartData";

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrls: ['./prospects.component.css'],
  providers : [ProspectService]
})
export class ProspectsComponent implements OnInit {
  private prospects: Array<Prospect> = [];

  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true, 
      scaleShowValues: true, 
      scaleValuePaddingX: 10,
      scaleValuePaddingY: 10
  };

  public barChartLabels:string[] = ['Test'];
  public barChartType : string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: ChartData[] = [
    {data: [50], label: 'Series A'}
  ];


  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#67b346',
      //backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"],
      borderColor: '#000000',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
 
  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }
  constructor(private prospectService : ProspectService) { 
  	Observable.interval(10000).subscribe(x => { //every 10 seconds
		    this.getProspect();
	});
  }

  ngOnInit() {
  	this.getProspect();
  }

  public getProspect(): void{
  	this.prospectService.getProspects().then(response => {
  		this.prospects = response;
  		this.setValuesToChart();
  	});
  }

  public setValuesToChart(): void{
  	let i =0;
  	this.clearValues();
  	var newData = new ChartData();
    this.prospects.forEach((prospect) =>{
    	if(i != 0){
	    	this.barChartLabels.push(prospect.name);
	    	newData.data.push(prospect.value);
	    	newData.label = " Estimated Prospect Value by Account Manager";
	    }
	    i++;
    });
    this.barChartData.push(newData);
    this.barChartData = this.barChartData.slice();
  }

  public clearValues() : void{
  	 //data
    this.barChartData.forEach((info) =>{
      info.data.slice(0);
    });
    this.barChartData.splice(0);

    //labels
    this.barChartLabels.splice(0);
  }

}
