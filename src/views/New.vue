<template lang="pug">
    main.v-content
        .v-content__wrap
            v-container
                v-layout(justify-center)
                    v-flex(xl8 lg10 md12)
                        section.mb-4
                            v-container(fluid grid-list-lg)
                                v-layout(align-center justify-space-between row )
                                    v-flex(text-left)
                                        h1 Создать новую задачу
                                    v-flex(text-right)
                                        v-btn(
                                            :to="{ name: 'home' }",
                                            color="primary"
                                        )
                                            v-icon(left ) fas fa-angle-double-left
                                            | Назад
                        section
                            NewTask
</template>

<script lang='babel' type="text/babel">
    // eslint-disable-next-line
    /* eslint-disable */

    import NewTask from '@/components/NewTask.vue';

    export default {
        name: 'New',
        components: {
            NewTask
        }
    }
</script>
