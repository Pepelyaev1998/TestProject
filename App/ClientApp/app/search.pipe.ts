import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform {
    transform(itemList: any, searchKeyword: string) {
        if (!itemList)
            return [];
        if (!searchKeyword)
            return itemList;
        let filteredList: any[] = [];
        if (itemList.length > 0) {
            searchKeyword = searchKeyword.toLowerCase();
            itemList.forEach((item: { [s: string]: unknown; } | ArrayLike<unknown>) => {
                //Object.values(item) => gives the list of all the property values of the 'item' object
                let propValueList = Object.values(item);
                for (let i = 0; i < propValueList.length; i++) {
                    if (propValueList[i]) {
                        if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1) {
                            filteredList.push(item);
                            break;
                        }
                    }
                }
            });
        }
        return filteredList;
    }
    //transform(techniques: any, value: any) {
    //    return techniques.filter((technique: { name: string | any[]; model: string | any[]; number: number | any[]; amount: number | any[]; }) => { return (technique.name.includes(value) || technique.model.includes(value) || technique.number.toString().includes(value) || technique.amount.toString().includes(value)) })
}