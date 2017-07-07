import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProspectService{
	constructor(private http: Http){

	}

	getProspects(){
		//console.log("Obteniendo prospects desde el API");
		return this.http.get(environment.API_URL + 'prospects')
		.map((response: Response) => response.json())
		.toPromise();
	}
}