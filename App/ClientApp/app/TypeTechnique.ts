import { locationPoint } from "./locationPoint";

export class TypeTechnique {
    constructor(
        public id?: number,
        public length?: number,
        public point?: locationPoint,
        public isSelected?: boolean,
        public color?: string,
        public layer?: number,
        public width?: number) { }

}