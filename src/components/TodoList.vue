<template lang="pug">
    v-container(fluid grid-list-lg).todo
        v-layout(column).todo-list
            v-flex
                v-container(px-0)
                    v-layout(align-center justify-space-between row fill-height)
                        v-flex(xl3 lg3 md4)
                            v-autocomplete(
                                v-model="stateFilter"
                                label="Статус-фильтр"
                                :items="stateList",
                                item-text="name"
                                item-value="id"
                                multiple
                                filled
                                autocomplete="off"
                                auto-select-first
                            )

                        v-flex(xl3 lg3 md4)
                            v-autocomplete(
                                v-model="dateFilter"
                                label="Дата-фильтр"
                                :items="dateFilterList",
                                item-text="name"
                                item-value="id"
                                filled
                                autocomplete="off"
                                auto-select-first
                            )

                        v-flex(shrink)
                            v-checkbox(
                                v-model="showExpired"
                                label="Просроченные"
                                color="red"
                            ).mt-0

                        v-flex(shrink)
                            v-checkbox(
                                v-model="showClosed"
                                label="Закрытые"
                                color="black"
                            ).mt-0

            v-flex
                v-container(pa-0)
                    v-layout(row)
                        v-flex(
                            xl12 lg12 md12
                            v-for="(item,index) in todoList"
                            :key="item.id"
                        )
                            TodoListEl(:data="item")
</template>

<script lang='babel' type="text/babel">
    // eslint-disable-next-line
    /* eslint-disable */

    import TodoListEl from '@/components/TodoListEl.vue';

    export default {
        name: 'TodoList',
        data: () => ({
            stateFilter: [0],
            dateFilter: 0,
            showExpired: false,
            showClosed: false
        }),
        components: {
            TodoListEl
        },
        methods: {},
        watch: {
            stateFilter(val, oldVal) {
                if (oldVal.includes(0) && val.includes(0) && val.length > 1) {
                    val.splice(val.indexOf(0), 1)
                } else if (!oldVal.includes(0) && val.includes(0)) {
                    this.stateFilter = [0]
                }
            }
        },
        computed: {
            stateList: function () {
                let sl = this.$store.state.stateList || [];

                sl = this.showClosed ? sl : sl.filter(el => el.id !== 4);
                sl = this.showExpired ? sl : sl.filter(el => el.id !== 5);

                return sl;
            },
            todoList: function () {
                let vm = this;
                let tl = vm.$store.state.todoList || [];

                switch (vm.dateFilter) {
                    case 0:
                        tl.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
                        break;
                    case 1:
                        tl.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                        break;
                    case 2:
                        tl.sort((a, b) => new Date(a.expiredDate) - new Date(b.expiredDate));
                        break;
                    case 3:
                        tl.sort((a, b) => new Date(b.expiredDate) - new Date(a.expiredDate));
                        break;
                    default:
                        tl.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
                }

                tl = vm.showClosed ?
                    tl : tl.filter(el => el.state !== 4);
                tl = vm.showExpired ?
                    tl : tl.filter(el => el.state !== 5);
                tl = vm.stateFilter.includes(0) ?
                    tl : tl.filter(el => vm.stateFilter.includes(el.state));

                return tl;
            },
            dateFilterList: function () {
                return this.$store.state.dateFilterList
            }
        }
    }
</script>

<style lang="stylus">
    .v-autocomplete__content
        &.v-menu__content
            text-align: left !important
</style>
