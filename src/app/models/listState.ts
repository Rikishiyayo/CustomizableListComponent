import { Player } from './player';

export enum FilterItemType {
    checkbox,
    radio,
    range,
    dropdown
}

export interface FilterItem {
    type: FilterItemType;
    title: string;
}

export interface CheckBoxFilter extends FilterItem {
    values: Array<string>;
    selectedValues: Array<string>;
}

export interface RangeFilter extends FilterItem {
    minValue: number;
    maxValue: number;
    selectedMinValue: number;
    selectedMaxValue: number;
}

export interface RadioFilter extends FilterItem {
    values: Array<string>;
    selectedValue: string;
}

export interface DropdownFilter extends FilterItem {
    values: Array<string>;
    selectedValue: string;
}

export interface Pager {
    totalPages: number;
    currentPage: number;
}

export interface ListState {
    items: Array<Player>;
    filters: Array<FilterItem>;
    pager: Pager;
}
