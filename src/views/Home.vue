<template lang="pug">
    main.v-content
        .v-content__wrap
            v-container
                v-layout(justify-center)
                    v-flex(xl8 lg10 md12)
                        section
                            v-container(fluid grid-list-lg)
                                v-layout(align-center justify-space-between row )
                                    v-flex(text-left)
                                        h1 "Todo List" Менеджер
                                    v-flex(text-right)
                                        v-btn(
                                            :to="{ name: 'new' }",
                                            color="success"
                                        )
                                            v-icon(left ) far fa-plus-square
                                            | Новая задача
                        v-divider.my-4
                        section
                            TodoList
</template>

<script lang='babel' type="text/babel">
    // eslint-disable-next-line
    /* eslint-disable */

    import TodoList from '@/components/TodoList.vue';

    export default {
        name: 'home',
        components: {
            TodoList
        },
        created: function () {
            if (!localStorage.getItem('todolist')) {
                this.$store.dispatch('SET_TODO_LIST').catch(() => this.error = true);
            }
        }
    }
</script>
