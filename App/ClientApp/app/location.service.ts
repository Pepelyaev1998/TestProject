import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technique } from './technique';
import { TypeTechnique } from './TypeTechnique';
import { Room } from './Room';

@Injectable()
export class LocationService {
    private url = "/api/locations";
    constructor(private http: HttpClient) {
    }

    getLocations() {
        return this.http.get(this.url);
    }

    SaveLocation(product: Room) {
        console.log(product);
        return this.http.post(this.url, product);
    }
    deleteRoom(room: Room) {
        return this.http.delete(this.url + '/' + room.id);
    }

}