import { Status } from './status';
export class Technique {
    constructor(
        public id?: number,
        public name?: string,
        public model?: string,
        public number?: number,
        public amount?: number,
        public status?: Status,
        public notation?: string) { }

}