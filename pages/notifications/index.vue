<template>
    <NuxtLayout>

        <Headline size="h1">
            Notifications
        </Headline>

        <div class="flex md:gap-6 flex-col md:flex-row">

            <NuxtLink class="flex-1 md:max-w-md">
                <Card :title="'Notis'" :body="'Just a small update'" :favorite="true" size="small"></Card>
            </NuxtLink>

        </div>


    </NuxtLayout>
</template>

<script setup lang=ts>



</script>