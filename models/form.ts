export type TFormInput = {
    type: string;
    label: string;
    disabled: boolean;
}


export type TGroup = {
    inputs: Array<TFormInput>;
}

export type TForm = {
    groups: Array<TGroup>;
}
