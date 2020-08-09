export class TableData{
    constructor(
        public viewHeaders : string[],
        public valueHeaders : string[],
        public rows: any,
        public mode: string,
        public userId :number
    ){}
}