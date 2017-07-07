import { Component, OnInit, OnDestroy } from '@angular/core';
import { OpportunityService } from './opportunity.service';
import {Observable} from 'rxjs/Rx';
import { Opportunity } from "./opportunity";
import { ChartData } from "../chartData";

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css'],
  providers: [OpportunityService]
})
export class OpportunitiesComponent implements OnInit {
	private opportunities: Array<Opportunity> = [];

  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {
        labels: {
          fontSize: 20
        }
      },
     scales: {
         yAxes: [
          {
              display: true,
              ticks: {
                fontSize: 20
              }
          }
         ],
         xAxes: [
          {
              display: true,
              ticks: {
                fontSize: 20
              }
          }
         ],
      }
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

  constructor(private opportunityService : OpportunityService) { 
    Observable.interval(10000).subscribe(x => { //every 10 seconds
		    this.getOpportunities();
		});
  }

  ngOnInit() {
  	this.getOpportunities();
  }

  public getOpportunities(){

  	this.opportunityService.getOpportunities().then(response => {
  		this.opportunities = response;
      this.setValuesToChart();
  	});
  }

  public setValuesToChart(){
    this.clearValues();
    var newData = new ChartData();
    this.opportunities.forEach((opportunity) =>{

      this.barChartLabels.push(opportunity.customer);
      newData.data.push(opportunity.estimatedValue);
      newData.label = " Estimated Value USD";
    });
    this.barChartData.push(newData);
    this.barChartData = this.barChartData.slice();
  }

  public clearValues(){
    //data
    this.barChartData.forEach((info) =>{
      info.data.slice(0);
    });
    this.barChartData.splice(0);

    //labels
    this.barChartLabels.splice(0);
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }
}
