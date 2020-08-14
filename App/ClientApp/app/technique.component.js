var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TechniqueService } from './technique.service';
import { Technique } from './technique';
import { Status } from './status';
import { LoginService } from './login.service';
import { DomSanitizer } from '@angular/platform-browser';
var TechniqueComponent = /** @class */ (function () {
    function TechniqueComponent(techniqueService, logServ, sanitizer) {
        this.techniqueService = techniqueService;
        this.logServ = logServ;
        this.sanitizer = sanitizer;
        this.technique = new Technique();
        this.create = false;
        this.searchStr = '';
        this.values = Status;
        this.fileUrl = '';
    }
    TechniqueComponent.prototype.exportAsXLSX = function () {
        this.techniqueService.exportToExel().subscribe();
    };
    TechniqueComponent.prototype.exit = function () {
        this.logServ.logout();
    };
    TechniqueComponent.prototype.ngOnInit = function () {
        this.loadTechnique();
    };
    TechniqueComponent.prototype.loadTechnique = function () {
        var _this = this;
        this.techniqueService.getTechniques()
            .subscribe(function (data) { return _this.techniques = data; });
        console.log(this.techniques);
    };
    TechniqueComponent.prototype.sort = function (parametrSort, AscorDsc) {
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
    };
    TechniqueComponent.prototype.save = function () {
        var _this = this;
        if (this.technique.id == null) {
            this.techniqueService.createOrUpdateTechnique(this.technique)
                .subscribe(function (data) { return _this.techniques.push(data); });
        }
        else {
            this.techniqueService.createOrUpdateTechnique(this.technique)
                .subscribe(function (data) { return _this.loadTechnique(); });
        }
        this.cancel();
    };
    TechniqueComponent.prototype.editProduct = function (t) {
        this.technique = t;
    };
    TechniqueComponent.prototype.cancel = function () {
        this.technique = new Technique();
        this.create = false;
    };
    TechniqueComponent.prototype.delete = function (t) {
        var _this = this;
        this.techniqueService.deleteTechnique(t.id)
            .subscribe(function (data) { return _this.loadTechnique(); });
    };
    TechniqueComponent.prototype.add = function () {
        this.cancel();
        this.create = true;
    };
    TechniqueComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './technique.component.html',
            providers: [TechniqueService, LoginService]
        }),
        __metadata("design:paramtypes", [TechniqueService, LoginService, DomSanitizer])
    ], TechniqueComponent);
    return TechniqueComponent;
}());
export { TechniqueComponent };
//# sourceMappingURL=technique.component.js.map