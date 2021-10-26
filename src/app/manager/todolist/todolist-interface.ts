export interface TodolistInterface {
    currentDate : string;
    listItem : successListInterface[];
}

export interface successListInterface {
    category: string;
    isSuccess: boolean;
}