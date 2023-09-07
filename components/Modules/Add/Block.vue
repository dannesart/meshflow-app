<template>
    <UIForm :class="'flex flex-col gap-6'" name="new-block-form" v-if="!select">

        <ModulesInput type="text" :max="50" :value="newBlockForm.name" @valueUpdate="$event => valueChange($event, 'name')">
            Name
        </ModulesInput>

        <ModulesInput type="text-lg" :max="100" :value="newBlockForm.description"
            @valueUpdate="$event => valueChange($event, 'description')">
            <label>
                Description <span class="text-sm text-gray-400">Optional</span>
            </label>
        </ModulesInput>


        <div name="new-block-error" class="flex gap-4 bg-red-50 p-4 rounded-lg mt-6" v-for="error in errors">
            <span class="font-bold capitalize">
                {{ error.path.join("/") }}
            </span>
            <span>
                {{ error.message }}
            </span>
        </div>
    </UIForm>
    <div v-else class="flex flex-col gap-6">
        <p>
            Pick from the list of block types
        </p>
        <div v-for="block of blocks"
            class="p-5 px-7 rounded-xl gap-6 shadow-xl flex flex-col w-full hover:shadow-2xl cursor-pointer">
            <div @click="toggleOpenBlock(block.name)" class="w-full flex ">
                <div class="flex flex-col">
                    <UIHeadline :size="'h3'">
                        {{ block.name }}
                    </UIHeadline>
                    <p class="text-sm text-gray-400">
                        {{ block.description }}
                    </p>
                </div>
                <div class="ml-auto mr-0">
                    <UIIcons :name="openBlock === block.name ? 'chevron-up' : 'chevron-down'"></UIIcons>
                </div>
            </div>
            <div class="p-3" v-if="openBlock === block.name">
                Hellloooooo
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Model, ModelSchema } from '~~/models/model';
import { useBlocksStore } from '~~/stores/blocks';

const blockStore = useBlocksStore();
const { blocks } = storeToRefs(blockStore);
const { select } = defineProps(['select']);
const events = defineEmits(['valueUpdate', 'onValid', 'onError'])
const errors = ref();
const openBlock = ref();

const toggleOpenBlock = (name: string) => {
    openBlock.value = openBlock.value === name ? '' : name;
}

const newBlockForm = ref({
    name: '',
    description: '',
    fields: [],
    serviceType: 'block'
})

const valueChange = (event: string, key: string) => {
    (newBlockForm as any).value[key] = event;
    events('valueUpdate', newBlockForm);
    validate(newBlockForm);
}

const validate = async (newBlockForm: any) => {
    const validated = await ModelSchema.partial({
        created: true,
        createdBy: true,
        updated: true,
        updatedBy: true,
        projectId: true,
        id: true
    }).safeParse(newBlockForm.value);

    if (!validated.success) {
        errors.value = [...validated.error.issues];
        events('onError', validated.error)
    } else {
        errors.value = []
        events('onValid', validated.data)
    }
}

</script>