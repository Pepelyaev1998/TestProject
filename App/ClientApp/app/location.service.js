var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var LocationService = /** @class */ (function () {
    function LocationService(http) {
        this.http = http;
        this.url = "/api/locations";
    }
    LocationService.prototype.getLocations = function () {
        return this.http.get(this.url);
    };
    LocationService.prototype.SaveLocation = function (product) {
        console.log(product);
        return this.http.post(this.url, product);
    };
    LocationService.prototype.deleteRoom = function (room) {
        return this.http.delete(this.url + '/' + room.id);
    };
    LocationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], LocationService);
    return LocationService;
}());
export { LocationService };
//# sourceMappingURL=location.service.js.map