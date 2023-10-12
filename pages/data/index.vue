<template>
    <NuxtLayout>

        <UIHeadline size="h1">
            Data types
        </UIHeadline>
        <div class="flex gap-6">
            <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
            </ModulesFilter>
            <div class="w-[1px] h-5/6 my-auto bg-slate-300 "></div>
            <ModulesAdd type="model" label="Add type" service-type="data">

            </ModulesAdd>
        </div>
        <ClientOnly>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" v-if="dataModels.length">
                <NuxtLink :to="('/data/' + item.id)" class="flex-1" v-for="(item, index) in dataModels">
                    <ModulesCard :title="item.name" :body="item.description" :tags="item.tags"></ModulesCard>
                </NuxtLink>
            </div>
            <UIEmpty v-else-if="!loading">
                No data types yet. Create one <ModulesAdd @on-add="onAdd" type="model" service-type="data"
                    button-style="system" label="Add data type">
                </ModulesAdd>
            </UIEmpty>

        </ClientOnly>

        <div v-if="loading" class="w-full flex items-center justify-center bg-gray-100 rounded-lg p-6">
            <UILoader></UILoader>
        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>
import { storeToRefs } from 'pinia';
import { DataModel } from '~~/models/data';
import { useDataStore } from '~~/stores/data';
import { useNotificationStore } from '~~/stores/notifications';

const notificationsStore = useNotificationStore();
const { setNotification } = notificationsStore;
const dataStore = useDataStore();
const { loading, dataModels } = storeToRefs(dataStore);
const { addDataModel } = dataStore;

const filters = ref({});
const sorts = ref({});


const filterChange = async (_filters: { [key: string]: any }) => {
    filters.value = { ...filters.value, ..._filters }
}

const sortChange = async (_sorts: { [key: string]: any }) => {
    sorts.value = { ...sorts.value, ..._sorts }
}

const onAdd = async (dataModel: DataModel) => {
    console.log(dataModel)
    if (await addDataModel(dataModel)) {
        setNotification("Data type created", "Your data type was successfully created", "success");
    } else {
        setNotification(
            "Data type not created",
            "The data type could not be created!",
            "fail"
        )
    }


}
const onCancel = () => {
    console.log("Cancel new data")
}

</script>