import { TExtendedLink } from "./extendedlink.model";

export const ExtendedLinkMock: TExtendedLink = {
    label: 'Test link', 
    subLabel: "Click on me and you will be redirected to the data page", 
    route: "/data", 
    isLast: false
}

export const ExtendedLinkErrorMock = {
    label: 'Test link', 
    subLabel: "Click on me and you will be redirected to the data page",
    isLast: false
}