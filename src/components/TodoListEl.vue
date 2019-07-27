<template lang="pug">
    v-card(outlined max-width).mx-auto.todo-list__el
        v-layout(text-left)
            v-flex(style="minWidth:0")
                v-card-title(@click="browseTask")
                    .todo-list__el__title {{ '#' + data.id }}  {{ data.title }}

                v-card-text
                    .todo-list__el__text {{ data.text }}

                v-divider.mx-4(v-if="data.tags && data.tags.length > 0")

                v-chip-group.todo-list__el__tags.mx-2(
                    v-if="data.tags && data.tags.length > 0"
                    multiple
                    column)

                    v-chip(
                        v-for="(tag, index) in data.tags"
                        :key="index"
                        class="ma-2"
                        color="Secondary"
                        label
                        small
                    )
                        v-icon(left x-small) fa fa-tags
                        |{{ tag }}

                v-divider.mx-4

                v-card-actions
                    v-layout(align-center justify-end row)
                        v-flex(style="minWidth:170px")
                            v-chip(
                                class="ma-2"
                                :color="stateColor"
                                text-color="white"
                            ) {{ stateName }}

                        v-flex(shrink)
                            v-btn(
                                :to="{ name: 'browse', query: { id: data.id } }"
                                fab icon color="blue"
                            )
                                v-icon(color="blue") far fa-edit

                            v-btn(
                                icon color="red"
                                @click="removeEl"
                                )
                                v-icon(color="red") far fa-trash-alt

            v-flex(shrink text-center :style="{ minWidth:'180px', maxWidth:'180px' }")
                v-container(fill-height)
                    v-layout(column)
                        v-flex(lg3)
                            v-text-field(
                                v-model="creationDateFormatted"
                                label="Начало:"
                                prepend-icon="far fa-calendar-check"
                                readonly
                            )
                        v-flex(lg3)
                            v-text-field(
                                v-model="expiredDateFormatted"
                                label="Дэдлайн:"
                                prepend-icon="far fa-calendar-check"
                                error
                                readonly
                            )
</template>

<script lang='babel' type="text/babel">
    // eslint-disable-next-line
    /* eslint-disable */

    export default {
        name: 'TodoListEl',
        props: {
            data: Object | Array
        },
        computed: {
            stateList: function () {
                return this.$store.state.stateList;
            },
            stateName: function () {
                return this.stateList.find(el => el.id === (this.data.state)).name;
            },
            stateColor: function () {
                return this.stateList.find(el => el.id === (this.data.state)).color;
            },

            creationDateFormatted() {
                return this.formatDate(this.data.creationDate)
            },
            expiredDateFormatted() {
                return this.formatDate(this.data.expiredDate)
            },
        },
        methods: {
            removeEl() {
                this.$store.dispatch('REMOVE_TODO_LIST_EL', this.data.id).catch(() => this.error = true);
            },
            browseTask() {
                this.$router.push({name: 'browse', query: {id: this.data.id}})
            },
            formatDate(date) {
                if (!date) return null;
                const [year, month, day] = date.split('-');
                return `${day}/${month}/${year}`
            },
            parseDate(date) {
                if (!date) return null;
                const [month, day, year] = date.split('/');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
        },

    }
</script>

<style scoped lang="stylus">
    .todo-list
        &__el
            &__title
            &__text
                display block
                width: 100%
                white-space nowrap
                overflow hidden
                text-overflow ellipsis

                p
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis

            &__title
                width: auto

                &:hover
                    cursor: pointer
                    color: #2196F3 !important
                    transition 0.3ms color ease-in-out

            &__state
                min-width 240px

                span
                    display block
                    white-space nowrap
                    text-transform: uppercase

                & > span
                    &:first-of-type
                        opacity 0.75
                        font-size: 0.75em
</style>
