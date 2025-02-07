<template>
    <div>
        
         <div class="">
            <div class="d-flex w-100 justify-content-between align-items-center" v-if='items && items.length != []'>
                <!-- <div class="global-filter d-flex justify-content-between align-items-center">
                    <div class="filter-button" @click="filterData()">
                        <i class="bi bi-filter"></i> Filter
                    </div>
                </div> -->
                <div class="d-flex justify-content-between align-items-center ms-auto" v-if="!hideColums">
                    <div class="p-0 h-auto m-2"  v-if="selectedRows.item.length">
                        <button class="button-app ms-2 p-2 default-button text-center" @click="deSelectedRowTable()">
                            <i class="bi bi-x-circle"></i> 
                        </button>
                    </div>
                    <b-dropdown text="Columns" block class="m-2 cloumns-table" right>
                        
                        <template v-for="field in fields" v-if="field.key != 'selected' && field.key != 'action'" class="w-100">
                            <label :for="field.id" class="p-2 px-3" :class="{'active': field.visible}">
                                <input
                                :disabled="visibleFields.length == 3 && field.visible"
                                :key="field.id" 
                                class="form-check-input me-2"
                                :id="field.id"
                                v-model="field.visible" 
                                type="checkbox"
                                inline
                                />
                            {{ field.label }}
                            </label>
                        </template>
                    </b-dropdown>
                </div>
            </div>
            <b-table 
            table
            hover 
            responsive="true"
            stacked="lg"
            :items="items" 
            :fields="visibleFields" 
            :busy="isBusy" 
            :current-page="currentPage" 
            @sort-changed="sort" 
            :tbody-tr-class="activeRow"
            label-sort-asc=""
            label-sort-desc=""
            label-sort-clear=""
            sort-icon-left
            >
                <template #table-busy>
                    <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
                
                <template v-slot:head(selected)="data" >
                    <div class="d-flex">
                        <input class="form-check-input"
                            v-if="items"
                            @click="selectAllItems($event)" 
                            type="checkbox"
                            :checked="checkCheckedItem()"
                            :disabled="selectedRows.item.length >= 10 && !items.map((item) => item.id).every(value => {return selectedRows.item.includes(value)}) "
                        >
                    </div>
                </template>
                <template #cell(selected)="data" >
                    <input 
                    v-if="data.item.email != $auth.$state.user.email || data.item.id != $auth.$state.user.id "
                    class="form-check-input" 
                    type="checkbox" 
                    :value="data.item.id" 
                    v-model="selectedRows.item" 
                    @click="selectItems(data.item.id, $event)"
                    :title="data.item.id == $auth.$state.user.id"
                    :disabled="selectedRows.item.length >= 10 && ![data.item.id].every(value => {return selectedRows.item.includes(value)}) || data.item.id == $auth.$state.user.id && data.item.email == $auth.$state.user.email"
                    >
                </template>
                <template #cell(show_details)="row">
                    <i class="bi" :class="row.detailsShowing ? 'bi-chevron-up' : 'bi-chevron-down'" @click="row.toggleDetails"></i>
                </template>
                
                <template #cell(work_order_id)="row">
                    <div v-if="row.item.work_order_id != null">
                        <nuxt-link :to="'/dashboard/order-management/om-workorder/wo-work-order/wo-order-details/' + row.item.work_order_id" class="badge text-bg-primary py-2 ms-1 me-1 no-underline">
                           {{row.item.work_order_id}}
                        </nuxt-link>
                    </div>
                    
                </template>
            
                <template #row-details="row">
                    <div class="row" v-if="row.item.sub_categories.length">
                        <div class="col-12 col-md-6" v-for="(sub, index, key) of row.item.sub_categories">
                            <UiCard >
                                <UiCardName cardName="Sub Category"/>
                                <ul class="list-group list-group-flush" >
                                    <template v-for="(subItem , key) of sub">
                                        <li class="list-group-item" v-if="key == 'category_name'">
                                            <div class="row">
                                                <div class="col=6 col-md-3">Category Name :</div>
                                                <div class="col-6 col-md-9"><strong>{{ subItem }}</strong></div>
                                            </div>
                                        </li>
                                        <li class="list-group-item" v-if="key == 'parent_category_id'">
                                            <div class="row">
                                                <div class="col=6 col-md-3">Parent Category Id :</div>
                                                <div class="col-6 col-md-9"><strong>{{ subItem }}</strong></div>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </UiCard>
                        </div>
                    </div>
                    <div v-else class="text-center">
                        Not Found Sub Category
                    </div>
                    
                </template>
                
                <template #cell(skills)="data">
                    <div class="table-email">
                        <template v-for="el of data.item.skills">
                            <span class="badge text-bg-primary py-1 ms-1 me-1">{{ el.skill_name }}</span>
                        </template>
                        <!-- <div class="copy-icons mx-1 px-2 rounded copy-options" v-b-tooltip.hover title="Copy" @click="copyValue(data.item.email)">
                            <i class="bi bi-stickies"></i>
                        </div> -->
                    </div>
                </template>

                <template #cell(wo_type_attr)="data">
                    <div class="table-email">
                        {{ data.item.wo_type_attr.name }} <span class="badge text-bg-primary py-1 ms-1 me-1" v-if="data.item.wo_type_attr.wo_type">{{ data.item.wo_type_attr.wo_type.name }}</span>
                        <!-- <div class="copy-icons mx-1 px-2 rounded copy-options" v-b-tooltip.hover title="Copy" @click="copyValue(data.item.email)">
                            <i class="bi bi-stickies"></i>
                        </div> -->
                    </div>
                </template>
                
                <template #cell(path)="data">
                    <div class="table-path">
                        <!--   -->
                         <a :href="data.item.path" target="_blank" class="button-app default-button px-2 py-1 " style=" width: fit-content; ">Open/Download Document</a>
                    </div>
                </template>
                <template #cell(email)="data">
                    <div class="table-email">
                        {{data.item.email}} 
                        <div class="copy-icons mx-1 px-2 rounded copy-options" v-b-tooltip.hover title="Copy" @click="copyValue(data.item.email)">
                            <i class="bi bi-stickies"></i>
                        </div>
                    </div>
                </template>
                
                <template #cell(action)="data">
                    <b-dropdown variant="link" no-caret right v-if="Object.values(actionTable).some(item => item.visible == true)">
                        <template #button-content class="table-actions">
                            <i class="bi bi-three-dots px-1"></i>
                            <p class="pe-2 ps-2 d-block d-lg-none mb-0">Actions</p>
                        </template>
                        <b-dropdown-item v-for="itemAction , indexAction in actionTable" :key="indexAction" @click="$emit(itemAction.action, data.item.id, data.item)" v-if="itemAction.action !== 'deactiveAccount' && itemAction.action !== 'activeAccount' && itemAction.action !== 'deleteItem' && itemAction.action !== 'editItemSerials' && itemAction.visible ">
                            <i class="px-2" :class="itemAction.icon"></i>{{itemAction.name}}
                        </b-dropdown-item>
                        <b-dropdown-item v-for="itemAction , indexAction in actionTable" :key="indexAction" @click="$emit(itemAction.action, data.item.id, data.item)" v-if="itemAction.action == 'deleteItem' &&  itemAction.visible">
                            <i class="px-2" :class="itemAction.icon"></i>{{itemAction.name}}
                        </b-dropdown-item>
                        <b-dropdown-item v-for="itemAction , indexAction in actionTable" :key="indexAction" @click="$emit(itemAction.action, data.item, data.item)" v-if="itemAction.action == 'editItemSerials' && data.item.item_type.name.toLowerCase() == 'ٍserialized'" >
                            <i class="px-2" :class="itemAction.icon"></i>{{itemAction.name}}
                        </b-dropdown-item>


                        <template v-if="data.item.status && data.item.status.toLowerCase() == 'active'">
                            <b-dropdown-item v-for="itemAction , indexAction in actionTable" :key="indexAction" @click="$emit(itemAction.action, data.item.id, data.item)" v-if="itemAction.action === 'deactiveAccount' && itemAction.visible">
                                <i class="px-2" :class="itemAction.icon"></i>{{itemAction.name}}
                            </b-dropdown-item>
                        </template>
                        <template v-if="data.item.status && data.item.status.toLowerCase() == 'inactive'">
                            <b-dropdown-item v-for="itemAction , indexAction in actionTable" :key="indexAction" @click="$emit(itemAction.action, data.item.id, data.item)" v-if="itemAction.action === 'activeAccount' && itemAction.visible">
                                <i class="px-2" :class="itemAction.icon"></i>{{itemAction.name}}
                            </b-dropdown-item>
                        </template>
                    </b-dropdown>
                </template>
                
            </b-table>
            <div class="no-data-available p-2 text-center" v-if='!items.length && !isBusy'>
                No Data Avilable
            </div>
        </div>
        
        <div class="row d-flex justify-content-between align-items-center mt-4 mb-4" v-if='items && items.length != []'>
            
            
            <div class="col-xxl-6">
                <div class="d-flex justify-content-start  align-items-center">
                    <button :class="removeAllItemBtn.class" class="w-auto" v-if="selectedRows.item.length" @click="deleteSelectedRows()" >
                        <i :class="removeAllItemBtn.icon"></i><span>Remove</span>
                        <b-spinner v-if="removeAllItemBtn.loadingBtn" small></b-spinner>
                    </button>
                    <div>
                    <div class="select-row ms-2 d-blick w-100" v-if="selectedRows.item.length">You Select {{selectedRows.item.length}} items</div>
                    <div class="select-row ms-2 d-blick w-100" v-if="selectedRows.item.length >= 10">You can't select more 10 items</div>
                    </div>
                </div>
            </div>

            <div class="col-xxl-6">
                <div class="d-flex align-items-center justify-content-end">
                    
                    <b-dropdown :text="handelPerPage.toString()"  class="perPages d-none d-xl-block" right ref="handelPerPages" v-if="!hidePerPage">
                        <template v-for="(field, indexField) in [10, 20, 30, 50, 100]" v-if="field.key != 'selected' && field.key != 'action'" class="w-100">
                            <label @click="handelPerPageFun(field)" class="d-block" :class="{'active': handelPerPage == field}">
                                {{ field }}
                            </label>
                        </template>
                    </b-dropdown>
                
                    <div class="reload-data-table  ms-2" @click="reloadDataTable">
                        <i class="bi bi-arrow-clockwise"></i>
                    </div>
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalItems"
                        :per-page="perPage"
                        aria-controls="my-table"
                        @change="goToPage($event)"
                        first-number
                        last-number
                    >
                        <template #first-text><i class="bi bi-chevron-double-left"></i></template>
                        <template #prev-text><i class="bi bi-chevron-left"></i></template>
                        <template #next-text><i class="bi bi-chevron-right"></i></template>
                        <template #last-text><i class="bi bi-chevron-double-right"></i></template>
                    </b-pagination>
                
                <span class="table-total-item ms-2 d-none d-xxl-block" v-if="!hidePerPage">Total Record: {{ totalItems }}</span>
            </div>
            </div>


            
        </div>
    </div>
   
</template>
<script>

export default {
    props: {
        items: Array,
        fields: Array,
        actionTable: Array,
        perPage: Number,
        totalItems: Number,
        isBusy: Boolean,
        selectedRows: Object,
        currentPage: Number,
        removeAllItemBtn: Object,
        optionPage: Object,
        form: Object,
        permissions: Array,
        hidePerPage: Boolean,
        hideColums: Boolean
    },
    data() {
        return {
            sortData: {"sortBy": ""},
            handelPerPage: 10,
            filter: '',
            isAllSelected: false,
            selectFilter: null,
            readMore: {},
        }
    },
    computed: {
      visibleFields() {
        for(let classTable of this.fields) {
            if(classTable.class) {
                classTable.class = classTable.class + ' table-headers align-middle'
            }else {
                classTable.class = ' table-headers align-middle'
            }
        }
        return this.fields.filter(field => field.visible)
      },
      

      visableFilter() {
        let field = []
        for(const filterField of this.fields) {
            if(filterField.key != 'selected' && filterField.key != 'action') {
                field.push(filterField)
            }
        }
        return field
      }
      
    },
    
    methods: {
        // download (url) {
        //     // this.$axios.get(url, {crossdomain:true, responseType: 'blob'}).then(response => {
        //     //     saveAs(response.data, response.config.url.split('/').at(-1));
        //     // })
        //     this.$axios({
        //         method: 'get',
        //         mode: 'no-cors',
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'sec-fetch-mode': '*',
        //             'Content-Type': 'application/json',
        //         },
        //         url: url,
        //         withCredentials: false,
        //         responseType: 'blob'
        //     }).then(response => {
        //         console.log(response)
        //     })
        // },
        showMore(id) {
            this.$set(this.readMore, id, true);
        },
        showLess(id) {
            this.$set(this.readMore, id, false);
        },
        activeRow(item, type) {
            if (item && type == 'row') {
                // this.selectedRows.some(row => row.id == item.id)
                if (this.selectedRows.item.includes(item.id)) {
                    return 'table-active';
                }
                if(item.id == this.$auth.$state.user.id && item.email == this.$auth.$state.user.email) {
                    return 'table-my-account'
                }
            }
        },
        filterData() {
            this.$emit('filterData')
        },
        deleteSelectedRows(){
            this.$emit('deleteSelectedRow', this.selectedRows.item)
        },
        reloadDataTable() {
            this.$emit('pagination', [this.currentPage])
        },
        sort(event) {
            this.sortData = event
            this.$emit('pagination', [this.currentPage])
        },
        goToPage(e) {
            this.$emit('pagination', [e])
        },
        handelPerPageFun(e) {
            this.handelPerPage = e.toString()
            this.$refs.handelPerPages.hide(true)
            const number = parseInt(this.handelPerPage)
            this.$emit('perpage', number)
        },


        selectItems(el, event) {
            if(event.target.checked) {
                this.selectedRows.item.push(el)
            }else {
                this.selectedRows.item.splice(el, 1)
            }
        },

        selectAllItems (event) {
            if(event.target.checked) {
                for (var item of this.items) {
                    if(item.id != this.$auth.$state.user.id && item.email != this.$auth.$state.user.email) {
                        if(!this.selectedRows.item.includes(item.id)) {
                            this.selectedRows.item.push(item.id)
                        }
                    }
                    
                }
            }else {
                for (var item of this.items) {
                    this.selectedRows.item = this.selectedRows.item.filter(val => val !== item.id)
                }
            }
        },
        deleteKey(e) {
            if(this.optionPage[e]) {
                this.form[e] = ''
                delete this.optionPage[e]
            }
            this.$emit('pagination', [1], this.sortData)
        },
        deSelectedRowTable() {
            this.selectedRows.item = []
        },
        checkCheckedItem() {
            if(this.selectedRows.item.length >= 0) {
                // return this.items.map((item) => item.id && item.id != this.$auth.$state.user.id).every(value => {
                //     return this.selectedRows.item.includes(value)
                // })
                for (var item of this.items) {
                    if(item.id != this.$auth.$state.user.id && item.email != this.$auth.$state.user.email) {
                        return this.selectedRows.item.includes(item.id)
                    }
                    
                }
                
            }
            return false
        }
    },
}
</script>
<style lang="scss">
    .no-data-available {
        background-color: transparent;
    }
    .table-headers {
        text-transform: capitalize;
    }
    @media (min-width: 312px) and (max-width: 1024px) {
        .action-tables {
            padding: 0px !important;
            div {
                width: 100% !important;
                padding: 0px !important;
                .dropdown-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--base_color);
                    color: #fff !important;
                    text-decoration: none !important;
                    padding: 1.5rem !important;
                    border-radius: 10px !important;
                    &:hover {
                        background-color: var(--base_color) !important;
                        color: #fff !important;
                        text-decoration: none !important;
                    }
                }
            }
        }
    }
    
    .table-total-item {
        background-color: var(--gray_color);
        padding: 0.5rem 0.4rem;
        font-size: 12px;
        border-radius: 5px;
        // font-family: sans-serif;
        color: #858585;
    }
    .b-table-details {
        background-color: #ebeff2;  
    }
    .sort-table {
        background-color: var(--gray_color);
        padding: 0.4rem 0.4rem;
        font-size: 14px;
        border-radius: 5px;
        // font-family: sans-serif;
        color: #858585;
        width: 100px;
        border: 0px;
        margin-left: 0.5rem;
    }
    .reload-data-table {
        height: 33px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        background-color: #fce173;
        border-radius: 6px;
        color: #6a6607;
        text-align: center;
        align-items: center;
        display: grid;
        cursor: pointer;
    }
    .image-table {
        width: 35px;
        height: 35px;
        background-position: center;
        background-size: cover;
        border: 1px solid #f3f3f3;
        border-radius: 100px;
    }
    .cloumns-table label.active {
        background-color: var(--gray_color_2) !important;
        color: var(--data_menu_color);
    }
    .cloumns-table label {
        color: var(--data_menu_color);
        cursor: pointer;
        width: fit-content;
        display: flex;
        width: 100%;
    }
    .cloumns-table ul {
        width: max-content;
        padding: 0.5rem;
        margin-top: 5px;
        border: 1px solid #dee2e6 !important;
        box-shadow: unset !important;
    }
    .cloumns-table label:hover {
        background-color: var(--gray_color_2) !important;
    }
    .cloumns-table button {
        border-radius: 5px;
        background-color: var(--gray_color_2);
        border: 0px !important;
        color: var(--data_menu_color) !important;
    }
    .global-filter {
        .filter-button {
            cursor: pointer;
        }
    }
    .table-my-account {
        background-color: var(--default_color);
        td {
            color: #fff !important;
        }
    }
    .filter-button {
        background-color: var(--gray_color);
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-radius: 5px;
    }
    .filter-button-result {
        background-color: var(--default_color);
        color: #fff;
        .name-filted {
            font-weight: 400;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
        .filter-remove {
            background-color: rgba(251, 251, 251, 0.0784313725);
            border-radius: 5px;
            margin-left: 0.2rem;
            color: #fff;
            cursor: pointer;
        }
    }
    .cloumns-table button:hover {
        background-color: var(--gray_color);
        color: #858585;
    }

    .perPages button {
        background-color: var(--gray_color_2);
        padding: 0.5rem 0.4rem;
        border: 0px !important;
        font-size: 12px;
        border-radius: 5px;
        // font-family: sans-serif;
        color: #858585;
        width: 75px;
        
        &:hover {
        background-color: var(--gray_color_2);
        color: #858585;
         }
    }
    .perPages ul{
        width: max-content;
        padding: 0.5rem;
        min-width: 75px !important;
    }
    .perPages label {
        background-color: #fff;
        cursor: pointer;
        width: fit-content;
        display: flex;
        width: 100%;
        text-align: center;
        padding: 0.3rem 0.3rem;
    }
    .perPages label:hover {
        background-color: #f3f3f3;
    }
    .perPages label.active {
        background-color: #f3f3f3;
    }
    .b-table-busy-slot {
        .text-primary {
            color: var(--data_menu_color) !important;
        }
    }
    .select-row {
        color: var(--data_menu_color);
    }
    .line-clamp-4 {
        div {
            text-overflow: ellipsis;
        }
}
.copy-options {
    display: none;
}
.table-email {
    &:hover {
        .copy-options {
            display: inline-block;
        }
    }
}
.card-table-sub {
    .card-body {
        padding: 0px;
    }
}
.no-underline {
    text-decoration: none;
}
</style>