import { Technique } from "./technique";
import { TypeTechnique } from "./TypeTechnique";
import { techniqueAndType } from "./techniquAndType";

export class Room {
    constructor(
        public id?: number,
        public length?: number,
        public width?: number,
        public name?: string,
        public technique?: techniqueAndType []
    ) { }

}