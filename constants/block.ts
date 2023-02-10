import { TUtil } from "~~/models/layer";


const utilities = <TUtil[]>[
    {
        name: "container",
        defaultClasses: "p-4"
    },
    {
        name: "button",
        defaultClasses: ""
    }
];

const defaultUtility: TUtil = utilities[0]; 

export { utilities, defaultUtility }