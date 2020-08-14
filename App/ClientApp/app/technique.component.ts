import { Component, OnInit } from '@angular/core';
import { TechniqueService } from './technique.service';
import { Technique } from './technique';
import { Status } from './status';
import { LoginService } from './login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app',
    templateUrl: './technique.component.html',
    providers: [TechniqueService, LoginService]
})
export class TechniqueComponent implements OnInit {
    technique: Technique = new Technique();
    techniques: Technique[];
    create: boolean = false;
    searchStr = '';
    values = Status;
    fileUrl = '';
    exportAsXLSX(): void {
        this.techniqueService.exportToExel().subscribe();
    }
    exit() {
        this.logServ.logout();
    }
    constructor(private techniqueService: TechniqueService, private logServ: LoginService, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.loadTechnique();
    }

    loadTechnique() {
        this.techniqueService.getTechniques()
            .subscribe((data: Technique[]) => this.techniques = data);
        console.log(this.techniques);
    }
    sort(parametrSort: string, AscorDsc: string) {
        switch (parametrSort) {
            case "Name": {
                this.techniques.sort(function (a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                break;
            }

            case "Model": {
                this.techniques.sort(function (a, b) {
                    var nameA = a.model.toUpperCase();
                    var nameB = b.model.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                break;
            }

            case "Number": {
                this.techniques.sort(function (a, b) {
                    return a.number - b.number;
                });
                break;
            }

            case "Amount": {
                this.techniques.sort(function (a, b) {
                    return a.amount - b.amount;
                });
                break;
            }

            case "Status": {
                this.techniques.sort(function (a, b) {
                    return a.status - b.status;
                });
                break;
            }

            default: {
                this.techniques.sort(function (a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                break;
            }
        }
        if (AscorDsc == "Dsc") {
            this.techniques.reverse();

        }
    }

    save() {
        if (this.technique.id == null) {
            this.techniqueService.createOrUpdateTechnique(this.technique)
                .subscribe((data: Technique) => this.techniques.push(data));
        } else {
            this.techniqueService.createOrUpdateTechnique(this.technique)
                .subscribe(data => this.loadTechnique());
        }
        this.cancel();
    }
    editProduct(t: Technique) {
        this.technique = t;
    }
    cancel() {
        this.technique = new Technique();
        this.create = false;
    }
    delete(t: Technique) {
        this.techniqueService.deleteTechnique(t.id)
            .subscribe(data => this.loadTechnique());
    }
    add() {
        this.cancel();
        this.create = true;
    }
}