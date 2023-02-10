
import { TLayer } from "~~/models/layer";

export const useActiveMenu = () => {
    const value = useState('activeMenu', () => false);

    const setValue = () => {
        value.value = !value.value
    }

    return [value, setValue]
}

export const useVisualEditor = () => {
    const activeValue = useState('activeEditor', () => false);
    return activeValue

}

export const useVisualEditorLayer = () => {
    const layer = useState<TLayer>('layerProperties', () => {
        return {
            name: '',
            type: {
                name: ''
            },
            classes: {}
        }
    });
    return layer;
}

type TSettings = {
    web: boolean;
}

export const useSettings = () => {

    const value = useState<TSettings>('settings', () => {
        return {
            web: false
        }
    })

    const setValue = (settings: TSettings) => {
        value.value = settings;
    }

    return [value, setValue];
}

export const useActiveFilter = () => {
    const value = useState('activeFilter', () => false);

    const setValue = () => {
        value.value = !value.value
    }

    return [value, setValue]
}
