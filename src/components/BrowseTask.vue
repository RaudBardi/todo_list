<template lang="pug">
    v-form(
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    ).edit-task-form
        v-container(fluid grid-list-lg).pa-0
            v-card(outlined max-width).pa-4
                v-layout(align-center justify-start row)
                    v-flex(shrink)
                        v-card-title.pa-0 {{ '#' + id }}
                    v-flex(text-left)
                        v-chip-group(
                            v-model="state"
                            mandatory
                        )
                            v-chip(
                                v-for="(chip, index) in stateList"
                                v-if="chip.id !== 0 && chip.id !== 5"
                                :key="index"
                                class="ma-2"
                                :color="chip.color"
                                text-color="white"
                                :value="chip.id"
                                label
                                :outlined="chip.id !== state"
                            ) {{ chip.name }}


                v-layout(align-start justify-space-between fill-height)
                    v-flex(xl10 lg10 md9)
                        v-text-field(
                            v-model="title"
                            :rules="titleRules"
                            :counter="100"
                            label="Название задачи"
                            required
                        )

                        v-textarea(
                            v-model="text"
                            :rules="textRules"
                            :counter="2048"
                            label="Описание задачи"
                            required
                            auto-grow
                        )

                        v-combobox(
                            multiple
                            v-model="tagsList"
                            label="Tags"
                            append-icon
                            chips
                            deletable-chips
                            clearable
                            class="tags-input"
                            :search-input.sync="search"
                            @keyup.tab="updateTags"
                            @paste="updateTags"
                        )

                    v-flex(justify-start)
                        v-text-field(
                            v-model="currentDateFormatted"
                            label="Дата начала"
                            prepend-icon="far fa-calendar-check"
                            readonly
                        )

                        v-dialog(
                            ref="dialog2"
                            v-model="modal2"
                            :return-value.sync="deadLineDate"
                            persistent
                            full-width
                            width="290px"
                        )
                            template(v-slot:activator="{ on }")
                                v-text-field(
                                    v-model="deadLineFormatted"
                                    label="Дата дэдлайна"
                                    prepend-icon="far fa-calendar-check"
                                    readonly
                                    v-on="on"
                                )
                            v-date-picker(
                                v-model="deadLineDate"
                                scrollable
                                :min="minDate"
                            )
                                v-spacer
                                v-btn(text color="primary" @click="modal2 = false") Отмена
                                v-btn(text color="primary" @click="$refs.dialog2.save(deadLineDate)") Ок

            v-layout(align-start justify-space-between row fill-height).my-8
                v-flex(jusify-end text-right)
                    v-btn(
                        :disabled="!valid"
                        :loading="loading"
                        @click="updateTask"
                        color="success"
                    )
                        v-icon(left) far fa-check-circle
                        | Обновить
</template>

<script lang='babel' type="text/babel">
    // eslint-disable-next-line
    /* eslint-disable */

    export default {
        name: 'EditTask',
        props: {
            id: Number | String
        },
        data: () => ({
            valid: false,
            lazy: false,
            loading: false,

            state: 1,

            title: '',
            titleRules: [
                v => !!v || 'Название обязательно',
                v => v.length >= 5 || 'Минимально 5 символов',
                v => (v || '').length <= 100 || `Максимально 100 символов`
            ],
            text: '',
            textRules: [
                v => !!v || 'Описание обязательно',
                v => v.length >= 10 || 'Минимально 10 символов',
                v => (v || '').length <= 2048 || `Максимально 2048 символов`
            ],

            currentDate: new Date().toISOString().substr(0, 10),
            deadLineDate: new Date().toISOString().substr(0, 10),

            modal1: false,
            modal2: false,

            tagsList: [],
            search: ""
        }),
        created: function () {
            let todo = this.$store.getters.getTodoById(+this.id);
            this.state = todo.state;
            this.title = todo.title;
            this.text = todo.text;
            this.currentDate = todo.creationDate;
            this.deadLineDate = todo.expiredDate;
            this.tagsList = todo.tags;
        },
        methods: {
            updateTask() {
                this.loading = !this.loading;
                this.$store.dispatch('UPDATE_TODO_LIST_EL', {
                    id:             this.id,
                    title:          this.title,
                    state:          this.state,
                    text:           this.text,
                    creationDate:   this.currentDate,
                    expiredDate:    this.deadLineDate,
                    tags:           this.tagsList
                }).catch(() => this.error = true);
                this.$nextTick(() => this.loading = !this.loading);
            },
            resetForm() {
                // this.$refs.form.reset();
                this.title = '';
                this.text = '';
                this.tagsList = [];
                this.currentDate = new Date().toISOString().substr(0, 10);
                this.deadLineDate = new Date().toISOString().substr(0, 10);
                this.$refs.form.resetValidation();
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            formatDate(date) {
                if (!date) return null;
                const [year, month, day] = date.split('-');
                return `${day}/${month}/${year}`
            },
            formatMinDate(date) {
                let month = `${date.getMonth() + 1}`;
                let day = `${date.getDate()}`;
                const year = date.getFullYear();

                if (month.length < 2) month = `0${month}`;
                if (day.length < 2) day = `0${day}`;

                return [year, month, day].join('-');
            },
            updateTags() {
                this.$nextTick(() => {
                    this.select.push(...this.search.split(","));
                    this.$nextTick(() => {
                        this.search = "";
                    });
                });
            }
        },
        computed: {
            stateList: function () {
                return this.$store.state.stateList;
            },
            stateName: function () {
                return this.stateList.find(el => el.id === (this.state)).name;
            },
            stateColor: function () {
                return this.stateList.find(el => el.id === (this.state)).color;
            },

            minDate() {
                const today = new Date();
                return this.formatMinDate(today);
            },
            currentDateFormatted() {
                return this.formatDate(this.currentDate)
            },
            deadLineFormatted() {
                return this.formatDate(this.deadLineDate)
            },
        },
        watch: {
            currentDate(val, oldVal) {
                if (new Date(this.currentDate) - new Date(this.deadLineDate) > 0) {
                    this.deadLineDate = this.currentDate;
                }
            }
        },
    }
</script>

<style lang="stylus">
    .tags-input span.v-chip
        border-radius 5px
</style>
