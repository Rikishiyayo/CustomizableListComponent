export enum FilterItemType {
    checkbox,
    radio,
    dropdown,
    range
}

export class FilterItemTypeAndTitle {
    type: FilterItemType;
    title: string;
}

export class CheckBoxFilter extends FilterItemTypeAndTitle {
    values: Array<string>;
    selectedValues: Array<string>;
}

export class RangeFilter extends FilterItemTypeAndTitle {
    minValue: number;
    maxValue: number;
}

export class RadioFilter extends FilterItemTypeAndTitle {
    values: Array<string>;
    selectedValue: string;
}

export class DropdownFilter extends FilterItemTypeAndTitle {
    values: Array<string>;
    selectedValue: string;
}

export type FilterItem = CheckBoxFilter | RangeFilter | RadioFilter | DropdownFilter;

export class Pager {
    totalPages: number;
    currentPage: number;
}


export class ListState {
    items: Array<any>;
    filters: Array<FilterItem>;
    pager: Pager;
}
