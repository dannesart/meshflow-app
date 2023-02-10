type TUtil = {
    name: string;
    defaultClasses?: string;
}
type TLayer = {
    name: string;
    type: TUtil;
    layers?: TLayer[];
    classes: {
        [name: string]: string;
    };
}


export { TUtil, TLayer }