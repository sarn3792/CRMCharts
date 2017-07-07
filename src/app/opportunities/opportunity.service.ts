import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import { Opportunity } from "./opportunity";
import { Observable } from "rxjs/Rx";

@Injectable()
export class OpportunityService{
	constructor(private http: Http){

	}

	getOpportunities(){
		//console.log("Obteniendo desde el API");

		return this.http.get(environment.API_URL + 'opportunity')
		.map((response: Response) => response.json())
		.toPromise();
	}
}