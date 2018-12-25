import { Player } from './player';

export enum FilterItemType {
    checkbox = 'checkbox',
    radio = 'radio',
    range = 'range',
    dropdown = 'dropdown'
}

export class FilterItem {
    constructor(public type: FilterItemType, public title: string) {
        this.type = type;
        this.title = title;
    }
}

export class CheckBoxFilter extends FilterItem {
    selectedValues: Array<string> = [];

    constructor(title: string, public values: Array<string>) {
        super(FilterItemType.checkbox, title);
        this.values = values;
    }
}

export class RangeFilter extends FilterItem {
    constructor(title: string,
        public minValue: number, public maxValue: number,
        public selectedMinValue: number, public selectedMaxValue: number) {

        super(FilterItemType.range, title);
    }
}

export class RadioFilter extends FilterItem {
    selectedValue = '';

    constructor(title: string, public values: Array<string>) {
        super(FilterItemType.radio, title);
    }
}

export class DropdownFilter extends FilterItem {
    selectedValue = '';

    constructor(title: string, public values: Array<string>) {
        super(FilterItemType.dropdown, title);
    }
}

export class Pager {
    constructor(public totalPages: number, public currentPage: number) {}
}

export class ListState {
    items: Array<Player>;
    filters: Array<FilterItem>;
    pager: Pager;
}
