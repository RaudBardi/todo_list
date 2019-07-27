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
                                        h1 Обзор задачи
                                    v-flex(text-right)
                                        v-btn(
                                            :to="{ name: 'home' }",
                                            color="primary"
                                        )
                                            v-icon(left ) fas fa-angle-double-left
                                            | Назад
                        section
                            BrowseTask(:id="id")
</template>

<script lang='babel' type="text/babel">
    // eslint-disable-next-line
    /* eslint-disable */

    import BrowseTask from '@/components/BrowseTask.vue';

    export default {
        name: 'New',
        data: () => ({
           id: Number | String
        }),
        components: {
            BrowseTask
        },
        created: function () {
            if (this.$route.query.id) {
                this.id = this.$route.query.id;
            }
        }
    }
</script>
