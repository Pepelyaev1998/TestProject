import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technique } from './technique';

@Injectable()
export class TechniqueService {
    fileUrl: string;
    private url = "/api/products";
    constructor(private http: HttpClient) {
    }

    getTechniques() {
        return this.http.get(this.url);
    }

    createOrUpdateTechnique(product: Technique) {
        return this.http.post(this.url, product);
    }
    deleteTechnique(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
    exportToExel() {
        return this.http.get(this.url + '/Export');
    }
}