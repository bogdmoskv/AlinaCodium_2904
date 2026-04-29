import { Injectable } from "@angular/core";
import { LogService } from "./log.service";

@Injectable()
export class DataService{
    private data: string[] = [ "Tom", "Bob", "Sam" ]

    constructor(private logService: LogService) {}

    getData(): string[] {
        this.logService.write("операция получения данных");
        return this.data;
    }

    addData(name: string){
        this.data.push(name);
        this.logService.write("операция добавления данных");
    }
}