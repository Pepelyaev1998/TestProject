import { Technique } from "./technique";
import { TypeTechnique } from "./TypeTechnique";
import { locationPoint } from "./locationPoint";

export class techniqueAndType {
    constructor(
        public technique?: Technique,
        public typeTechnique?: TypeTechnique
    ) { }

}