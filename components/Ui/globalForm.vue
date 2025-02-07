<template>
    <div class="row m-2">
        <div :class="formList.headClass" class="p-0">
          <div class="col-12">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <div class="row g-4" :class="formList.rowClass">
                    <template v-for="formItem, formIndex in formList.form">
                        <div v-if="formItem.show" :key="formIndex" :class="formItem.class" class="d-flex justify-content-center align-items-top position-relative" >
                                <label :for="formItem.key" class="d-none d-lg-block col-12 col-lg-4 col-form-label text-releway" 
                                    v-if="formItem.showLabel && formItem.show && formItem.type != 'checkbox' && formItem.type != 'radio'">
                                    {{ formItem.name }}
                                    <span class="errorMessage" v-if="formItem.required != ''"><strong>*</strong></span>
                                </label>
                                <div class="w-100">

                                        <ValidationProvider
                                        :name="formItem.name"
                                        :rules="`${formItem.required}`"

                                        tag="div"
                                        v-slot="{ errors }"
                                        v-if="formItem.type == 'text' || formItem.type == 'password' || formItem.type == 'number'"
                                        >
                                            <div class="d-flex">
                                                <div class="w-100">
                                                    <input
                                                    class="form-control"
                                                    :name="formItem.key + '_' + formItem.key"
                                                    :class="{ 'has-danger': errors[0], 'has-success': form[`${formItem.key}`] }"
                                                    :id="formItem.key"
                                                    :disabled="formItem.disabled" 
                                                    :placeholder="formItem.placeHolder" 
                                                    step="any"
                                                    v-model.trim="form[`${formItem.key}`]"
                                                    :readOnly="formItem.readOnly"
                                                    :data-vv-as="formItem.placeHolder"
                                                    :type="formItem.type"
                                                    @keypress="globalFunction($event, formItem.itemKeyPress || '', form[`${formItem.key}`], formItem.disabled)"
                                                    >
                                                    <i class="bi bi-lock-fill position-absolute lock-input" v-if="formItem.disabled"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <span v-if="formItem.discription && formItem.discriptionType == 'link'" class="discription_input">{{ protocol + '//'}}{{form[`${formItem.key}`]}}<span v-if="form[`${formItem.key}`] != ''">.</span>{{host}} </span>
                                                <span v-if="formItem.discription && formItem.discriptionType == !'link'" class="discription_input">{{ formItem.discription }}</span>
                                            </div>
                                            <span v-if="errors[0]" class="errorMessage animate__animated animate__fadeInDown">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                        
                                        <ValidationProvider :rules="formItem.required" :name="formItem.name" v-slot="{ errors }"  v-if="formItem.type == 'Quilltextarea'">
                                            <quill-editor
                                            :options="formItem.options" 
                                            :type="formItem.type"
                                            v-model="form[`${formItem.key}`]" 
                                            :id="formItem.key" 
                                            :class="{ 'has-danger': errors[0], 'has-success': form[`${formItem.key}`]  }" class="form-control relative p-0"/>
                                            <div>
                                                <span v-if="formItem.discription && formItem.discriptionType == !'link'" class="discription_input">{{ formItem.discription }}</span>
                                            </div>
                                            <span v-if="errors[0] " class="errorMessage animate__animated animate__fadeInDown">{{ errors[0] }}</span>
                                        </ValidationProvider>

                                        <ValidationProvider :rules="formItem.required" tag="div" class="form-floating" :name="formItem.name" v-slot="{ errors }" v-if="formItem.type == 'textarea'">
                                            <textarea 
                                                v-model="form[`${formItem.key}`]"
                                                :id="formItem.key"
                                                :placeholder="formItem.placeHolder"
                                                :disabled="formItem.disabled"
                                                :class="{ 'has-danger': errors[0], 'has-success': form[`${formItem.key}`]  }"
                                                class="form-control"
                                                style="height: 100px"
                                            >
                                            </textarea>
                                            <label :for="formItem.key">{{ formItem.placeHolder }}</label>
                                            <div>
                                                <span v-if="formItem.discription && formItem.discriptionType == !'link'" class="discription_input">{{ formItem.discription }}</span>
                                            </div>
                                            <span v-if="errors[0] " class="errorMessage animate__animated animate__fadeInDown">{{ errors[0] }}</span>
                                        </ValidationProvider>

                                        <ValidationProvider 
                                            :rules="formItem.required" :name="formItem.name" v-slot="{ errors }" ref="dropdown"
                                            v-if="formItem.type == 'option' && formItem.show ">
                                           <div class="d-flex justify-content-between align-items-center">
                                                
                                                <multiselect 
                                                :options="formItem.options"  
                                                :class="{ 'has-danger': errors[0]  , 'has-success': form[`${formItem.key}`] && form[`${formItem.key}`].length != 0 }"
                                                v-model="form[`${formItem.key}`]"
                                                :disabled="formItem.disabled"
                                                :multiple="formItem.multi"
                                                :id="formItem.key" 
                                                :placeholder="formItem.placeHolder"
                                                :show-labels="false"
                                                :allow-empty="formItem.allowEmpty"
                                                :searchable="formItem.searchable"
                                                @input="changedSelectDropdown(formItem.key, form[`${formItem.key}`])"
                                                @search-change="searchDropdown($event, formItem.searchable, formItem.key, formItem.propsName)"
                                                :internal-search="formItem.internalSearch"
                                                :label="formItem.label"
                                                :hideSelected="formItem.hideSelected"
                                                :close-on-select="formItem.closeOnSelect"
                                                :preselect-first="formItem.preselectFirst"
                                                :deselectLabel="formItem.deselectLabel"
                                                :loading="formItem.loading"
                                                :track-by="formItem.label"
                                                >
                                                <template slot="selection" slot-scope="{ values, search, isOpen }" v-if="formItem.preselectFirst">
                                                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} options selected</span>
                                                </template>
                                                <template slot="afterList" v-if="formItem.paginated">
                                                    <div v-observe-visibility="(isVisible, entry) => reachedEndOfList(isVisible, entry, formItem.key, formItem.internalSearch, formItem.propsName, formItem.emitActionName)"/>
                                                </template>
                                                <template slot="singleLabel" slot-scope="{ option }">
                                                    <span v-if="formItem.label === 'user' || formItem.label === 'wo_type' || formItem.label == 'from_wo_status' || formItem.label == 'template_type'">
                                                        <span v-if="option[formItem.label] && option[formItem.label].name">
                                                            {{ option[formItem.label].name }}
                                                        </span>
                                                        <span v-else>
                                                            {{ option }}
                                                        </span>
                                                    </span>
                                                    <span v-if="formItem.label != '' && formItem.label != 'user'" >{{ option[formItem.label] }}</span>
                                                    <span v-if="formItem.label == ''">{{ option }}</span>
                                                    <span v-if="option.offset" class="option__small">{{ option.offset }}</span>
                                                </template>
                                                <template slot="option" slot-scope="{ option }">
                                                    <div class="option__desc">
                                                        <span class="option__title d-inline-block w-50 text-capitalize" v-if="formItem.label === 'user' || formItem.label === 'wo_type' || formItem.label == 'from_wo_status' || formItem.label == 'template_type'">
                                                            {{option[formItem.label].name}}
                                                        </span>
                                                        <span class="option__title d-inline-block w-50 text-capitalize" v-else>
                                                            {{option[formItem.label]}}
                                                        </span>
                                                        <span class="option__title d-inline-block w-50 text-capitalize" v-if="formItem.label == ''">
                                                            {{option}}
                                                        </span>
                                                        <span class="option__small" v-if="option.offset">{{ option }}</span>
                                                    </div>
                                                </template>
                                                </multiselect>
                                                <span v-if="formItem.typeAttr && formItem.typeAttr == 'lookup'" class="button-app default-button px-2 py-2 ms-1 me-1 pointer" v-b-tooltip.hover title="Get LookUp Details" @click="$emit('getLookUpDetails', formItem.key)">
                                                    <i class="bi bi-list-columns"></i>
                                                </span>
                                           </div>
                                            <div v-if="formItem.multi">
                                                <ul class="list-unstyled mb-0" :class="{'scroll-list': form[`${formItem.key}`] && form[`${formItem.key}`].length > 2 }">
                                                    <li v-for="(itemList, indexItemList) of form[`${formItem.key}`]" :key="indexItemList">
                                                        <div class="list-multiselect-dropdown d-flex justify-content-between align-items-center mb-3  mt-3" v-if="itemList">
                                                            <div class="list-multiselect-dropdown__name text-capitalize">
                                                                {{ itemList[formItem.label] }}
                                                            </div>
                                                            <div class="list-multiselect-dropdown__remove" v-if="formItem.allowEmpty == true">
                                                                <i class="bi bi-x-lg" @click="form[`${formItem.key}`].splice(indexItemList, 1)"></i>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="mt-0">
                                                <span v-if="formItem.discription && formItem.discriptionType == !'link'" class="discription_input">{{ formItem.discription }}</span>
                                                <span v-if="!formItem.options.length" class="discription_input has-danger">{{ formItem.emptyMessage }}</span>

                                            </div>
                                            <span v-if="errors[0]" class="errorMessage animate__animated animate__fadeInDown">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                        
                                        <ValidationProvider 
                                        :rules="formItem.required" :name="formItem.name" mode="eager" v-slot="{ errors }"
                                        v-if="formItem.type == 'date' || formItem.type == 'datetime' || formItem.type == 'time'">
                                            <datetime 
                                            v-model="form[`${formItem.key}`]"
                                            :type="formItem.type"
                                            :input-id="formItem.key.toString()" 
                                            :input-class="{ 'form-control': true, 'has-danger': errors[0], 'has-success': form[`${formItem.key}`] }"
                                            :title="formItem.placeHolder" 
                                            :placeholder="formItem.placeHolder"
                                            :use12-hour="formItem.use12Hour"
                                            :disabled="formItem.disabled"
                                            :min-datetime="formItem.minDate"
                                            :format="formItem.format"
                                            />
                                            <i class="bi bi-lock-fill position-absolute lock-input" v-if="formItem.disabled"></i>
                                            <div>
                                                <span v-if="formItem.discription && formItem.discriptionType == !'link'" class="discription_input">{{ formItem.discription }}</span>
                                            </div>
                                            <span v-if="errors[0]" class="errorMessage animate__animated animate__fadeInDown">{{ errors[0] }}</span>
                                        </ValidationProvider>

                                        <ValidationProvider :rules="formItem.required" :name="formItem.name" v-slot="{ errors }" mode="eager" v-if="formItem.type == 'phone'" >
                                            <VuePhoneNumberInput
                                            v-if="form[`${formItem.key}`]"
                                            v-model="form[`${formItem.key}`].number"
                                            :preferred-countries="['US', 'RU', 'ES', 'GB', 'FR', 'AE', 'SA', 'EG']"
                                            :default-country-code="form[`${formItem.key}`].countryIsoCode"
                                            :class="{'has-danger': errors[0], 'has-success': form[`${formItem.key}`].number != null }"
                                            @update="phoneNumberResultValid[formItem.key] = $event"
                                            @input="phoneUpdate(formItem.key, $event)"

                                             />
                                            <span v-if="errors[0]" class="errorMessage animate__animated animate__fadeInDown">{{ errors[0] }}</span>

                                            <!-- && !form[`${formItem.key}`].length -->
                                        </ValidationProvider>

                                        <ValidationProvider :rules="formItem.required" :name="formItem.name" v-slot="{ errors }"  v-if="formItem.type == 'upload'" >
                                            <template v-if="formItem.type == 'upload' && formItem.show">
                                                <div class="dragDropFile" 
                                                    @dragover.prevent="onDragOver"
                                                    @dragleave.prevent="onDragLeave"
                                                    @drop.prevent="onDrop($event, formItem.key, formItem.multiple)"
                                                    :class="{'active': isDragging, 'has-danger': errors[0]}"
                                                >
                                                    <span class="options" v-if="!isDragging">
                                                        <span>Drag & drop file here</span>
                                                        <span>or</span>
                                                        <div class="chooseFile" @click="selectFiles()">Choose File</div>
                                                    </span>
                                                    <span v-else class="options">
                                                        Drag File Here
                                                    </span>
                                                    <input type="text" v-model="files" class="file">
                                                    <input name="file" type="file" class="file" ref="file" :multiple="formItem.multiple" @input="onFileSelected($event, formItem.key, formItem.multiple)">
                                                </div>
                                                <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                                                <div class="upload-container row g-0 mt-3" v-if="form[`${formItem.key}`] && form[`${formItem.key}`].length != 0">
                                                    <template v-for="(item, index) of form[`${formItem.key}`]">
                                                        <div class="col-4 col-lg-3 p-1 pointer">
                                                            <div class="image-uploader rounded" v-if="item.mimeType == 'png' || item.mimeType == 'jpg' || item.mimeType == 'jpeg' || item.mimeType == 'gif'" >
                                                                <img v-if="item.url != null" :src="item.url" alt="" class="image-uploader rounded" @click="showFiles(item)">
                                                                <div class="icon-options-file d-inline-flex justify-content-between">
                                                                    <span class="bg-danger px-1 rounded" @click="deleteFile(index, formItem.key)"><i class="bi bi-x"></i></span>

                                                                </div>
                                                                <span class="bg-success px-1 rounded-circle success-file" v-b-tooltip.hover title="File Verfied"><i class="bi bi-check"></i></span>

                                                            </div>
                                                            <div v-else>
                                                                <div class="image-uploader img-fluid" @click="showFiles(item)">
                                                                    <div v-if="item.url == null" class="image-uploader position-absolute media-type-file" alt="">
                                                                        Media File
                                                                    </div>
                                                                    <img src="~/assets/images/file-pdf.png" width="60px" class="img-fluid" alt="" v-if="item.mimeType == 'pdf'">
                                                                    <img src="~/assets/images/file-docx.png"  width="80" v-if="item.mimeType == 'docx' || item.mimeType == 'doc'">
                                                                    <img src="~/assets/images/file-xlsx.png"  width="70" v-if="item.mimeType == 'xls' || item.mimeType == 'xlsx'">
                                                                    <img src="~/assets/images/file-php.png"  width="70" v-if="item.mimeType == 'php'">

                                                                    <video v-if="item.mimeType == 'mp4'" width="100%" height="100%"> 
                                                                        <source :src="item.url" type="video/mp4" > 
                                                                    </video>
                                                                    <div class="icon-options-file d-inline-flex justify-content-between">
                                                                        <span class="bg-danger px-1 rounded" @click="deleteFile(index, formItem.key)"><i class="bi bi-x"></i></span>
                                                                    </div>
                                                                    <span class="bg-success px-1 rounded-circle success-file" v-b-tooltip.hover title="File Verfied"><i class="bi bi-check"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </div>
                                                <div>
                                                    <span v-if="formItem.discription && formItem.discriptionType == !'link'" class="discription_input">{{ formItem.discription }}</span>
                                                </div>
                                            </template>
                                            <b-modal ref="showfile" id="showfile" centered hide-footer size="lg" v-if="form[`${formItem.key}`] && form[`${formItem.key}`].length">
                                                <div v-if="showFileData" :class="{ 'content-upload': showFileData.mimeType !== 'pdf' }" class="text-center">
                                                    <img :src="showFileData.url" v-if="showFileData.mimeType === 'jpeg' || showFileData.mimeType === 'png' || showFileData.mimeType === 'jpg' || showFileData.mimeType === 'gif'" class="img-fluid" alt="">
                                                    <iframe :src="showFileData.url" v-if="showFileData.mimeType == 'pdf'" height="600px" width="100%"></iframe>
                                                    <iframe :src="'https://view.officeapps.live.com/op/embed.aspx?src='+showFileData.url" 
                                                    v-if="showFileData.mimeType == 'docx' || showFileData.mimeType == 'doc' || showFileData.mimeType == 'xls' || showFileData.mimeType == 'xlsx'" 
                                                    height="600px" 
                                                    width="100%" 
                                                    frameborder='0'></iframe>

                                                    <video v-if="showFileData.mimeType == 'mp4' || showFileData.mimeType == 'MPG'" width="100%" height="100%" controls> 
                                                        <source :src="showFileData.url" type="video/mpg" > 
                                                    </video>
                                                </div>
                                            </b-modal>
                                        </ValidationProvider>

                                        <div v-if="formItem.type == 'accordion' && formItem.show" class="border p-3">
                                            <strong>
                                                Permissions {{ $i18n.locale }}
                                            </strong>
                                            <div no-body v-for="(item, index) in formItem.options" :key="index">
                                                    <div header-tag="header" role="tab">
                                                        <div block v-b-toggle="'accordion-' + index" variant="info" class="border-bottom px-2 py-3 text-capitalize d-flex justify-content-between">
                                                            <span v-if="$i18n.locale === 'ar'">{{ item.name_ar }}</span>
                                                            <span v-else>{{ item.name_en.replace('-', ' ') }}</span>
                                                            <i class="bi bi-arrows-collapse"></i>
                                                        </div>
                                                    </div>
                                                    <b-collapse  :id="'accordion-' + index"  class="p-2 row g-0" :accordion="'accordion-' + index" role="tabpanel">
                                                        <template v-for="itemCheck of item.permissions">
                                                            <div class="col-12 col-md-6 p-2">
                                                                <label class="checkbox-group d-flex justify-content-between">
                                                                    <input type="checkbox" v-model="form[`${formItem.key}`]" :value="itemCheck">
                                                                    <span v-if="$i18n.locale === 'ar'">{{ itemCheck.name_ar }}</span>
                                                                    <span v-else>{{itemCheck.name_en}}</span>

                                                                    
                                                                    <span class="checkmark" />
                                                                </label>
                                                            </div>
                                                        </template>
                                                        
                                                        
                                                        
                                                    </b-collapse>
                                                </div>
                                        </div>


                                        <hr v-if="formItem.type == 'hr' && formItem.show "/>
                                        <template v-if="formItem.type == 'headerForm' && formItem.show">
                                            <div class="head_form p-3">
                                                {{ formItem.name }}
                                            </div>
                                        </template>
                                        <template v-if="formItem.type == 'titleForm' && formItem.show">
                                            <h6>
                                                <span>{{ formItem.name }}</span>
                                            </h6>
                                        </template>
                                        <template v-if="formItem.type == 'optionColor'">
                                            <div 
                                            v-for="color, colorIndex in formItem.option" 
                                            :key="colorIndex" class="colorPicker" 
                                            :style="{ background: color}"
                                            :class="{ 'active': activeIndex === colorIndex }"
                                            @click="form[`${formItem.key}`] = color, activeIndex = colorIndex"></div>
                                        </template>
                                        <template v-if="formItem.type == 'checkbox' && formItem.show">
                                            <div class="py-1">
                                                <label class="checkbox-group d-flex justify-content-between">
                                                    <input type="checkbox" v-model="form[`${formItem.key}`]" :true-value="formItem.trueValue" :false-value="formItem.falseValue">
                                                    {{formItem.name}}
                                                    <span class="checkmark" />
                                                </label>
                                            </div>
                                        </template>

                                        
                                        <template v-if="formItem.type == 'radio' && formItem.show">
                                                <div class="py-1 ps-5 row">
                                                    <template v-for="radioButton, radioButtonIndex in formItem.options">
                                                        <label class="checkbox-group d-flex justify-content-between col-6" v-if="radioButton" :key="radioButtonIndex" >
                                                           <input type="radio" :value="radioButton.value" v-model="form[`${formItem.key}`]">
                                                            {{radioButton.name}}
                                                            <span class="checkmark rounded-circle" />
                                                        </label>
                                                    </template>
                                                </div>
                                        </template>



                                        <template v-if="formItem.type == 'tableExpand' && formItem.key == 'dataSerial' && formItem.show">
                                            <div class="header-table-col p-3 d-flex justify-content-between align-items-center">
                                                <p class="mb-0">Data Serial Number</p>
                                                <div @click="AddNewRow()" class="pointer">
                                                    <i class="bi bi-plus-circle"></i>
                                                </div>
                                            </div>
                                            <ValidationObserver ref="tableData">
                                                <b-table hover :fields="formItem.headerTable" :items="form[`${formItem.key}`]" 
                                                responsive="true"
                                                stacked="lg">
                                                    <template #cell(serial_number)="data">
                                                            <ValidationProvider
                                                                name="Serial Number"
                                                                rules="required||min:3" 
                                                                tag="div"
                                                                v-slot="{ errors }"
                                                                >
                                                                <input type="text" 
                                                                v-model="form[`${formItem.key}`][data.index]['serial_number']" class="form-control" 
                                                                :class="{ 'has-danger': errors[0] }" placeholder="Serial Number"
                                                                ref="inputserial"
                                                                @keyup.enter="AddNewRow()"
                                                                />
                                                                <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                                                            </ValidationProvider>
                                                    </template>
                                                    <template #cell(expiration_date)="data">
                                                        <datetime 
                                                            v-model="form[`${formItem.key}`][data.index]['expiration_date']"
                                                            type="date"
                                                            input-class="form-control"
                                                            title="Expiration Date" 
                                                            placeholder="Expiration Date"
                                                            />

                                                    </template>
                                                    <template #cell(receiving_date)="data">
                                                        <datetime 
                                                            v-model="form[`${formItem.key}`][data.index]['receiving_date']"
                                                            type="date"
                                                            input-class="form-control"
                                                            title="Receiving Date" 
                                                            placeholder="Receiving Date"
                                                            />

                                                    </template>
                                                    <template #cell(action)="data">
                                                        <i class="bi bi-x-circle pointer" @click="removeSerial(data.index, formItem.key)" v-if="form[`${formItem.key}`].length -1 > 0"></i>
                                                    </template>
                                                </b-table>
                                            </ValidationObserver>
                                        </template>

                                        <template v-if="formItem.type == 'tableExpand' && formItem.key == 'notification_receipients' && formItem.show">
                                            <div class="header-table-col p-3 d-flex justify-content-between align-items-center">
                                                <p class="mb-0">Notification Receipients</p>
                                                <div @click="AddNewRowReceipients()" class="pointer">
                                                    <i class="bi bi-plus-circle"></i>
                                                </div>
                                            </div>
                                            <ValidationObserver ref="tableDataReceipients">
                                                <b-table hover fixed :fields="formItem.headerTable" :items="form[`${formItem.key}`]" 
                                                responsive="true"
                                                stacked="lg">
                                                    <template #cell(recipient_type)="data">
                                                            <ValidationProvider
                                                                name="recipient type"
                                                                rules="" 
                                                                tag="div"
                                                                v-slot="{ errors }"
                                                                >
                                                               
                                                                <multiselect 
                                                                v-model="form[`${formItem.key}`][data.index]['recipient_type']"
                                                                :options="form['notification_templates_types']" 
                                                                :class="{ 'has-danger': errors[0] }"
                                                                :searchable="false" 
                                                                :close-on-select="true" 
                                                                :allow-empty="false"
                                                                :show-labels="false"
                                                                placeholder="Recipient Type"/>
                
                                                                <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                                                            </ValidationProvider>
                                                    </template>
                                                    <template #cell(recipient)="data">
                                                        <ValidationProvider
                                                                name="recipient"
                                                                rules="required" 
                                                                tag="div"
                                                                v-slot="{ errors }"
                                                                >
                                                                <input type="text" 
                                                                v-model="form[`${formItem.key}`][data.index]['recipient']" class="form-control" 
                                                                :class="{ 'has-danger': errors[0] }" placeholder="Recipient"
                                                                />
                                                                <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                                                            </ValidationProvider>
                                                    </template>
                                                    <template #cell(notification_template_id)="data">
                                                        <ValidationProvider
                                                                name="notification template"
                                                                rules="required" 
                                                                tag="div"
                                                                v-slot="{ errors }"
                                                                >
                                                                <multiselect 
                                                                v-model="form[`${formItem.key}`][data.index]['notification_template_id']"
                                                                :options="form['notification_templates']" 
                                                                :class="{ 'has-danger': errors[0] }"
                                                                :searchable="false" 
                                                                :close-on-select="true" 
                                                                track-by="id"
                                                                label="template_name"
                                                                :allow-empty="false"
                                                                :show-labels="false"
                                                                placeholder="Recipient Type"/>

                                                                <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                                                            </ValidationProvider>

                                                    </template>
                                                    <template #cell(threshold_hours)="data">
                                                        <ValidationProvider
                                                                name="threshold Hours"
                                                                rules="required" 
                                                                tag="div"
                                                                v-slot="{ errors }"
                                                                >
                                                                <input type="number" 
                                                                v-model="form[`${formItem.key}`][data.index]['threshold_hours']" class="form-control" 
                                                                :class="{ 'has-danger': errors[0] }" placeholder="Threshold Hours"
                                                                />
                                                                <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                                                            </ValidationProvider>

                                                    </template>
                                                    <template #cell(action)="data">
                                                        <i class="bi bi-x-circle pointer" @click="removeSerial(data.index, formItem.key)" v-if="form[`${formItem.key}`].length -1 > 0"></i>
                                                    </template>
                                                </b-table>
                                            </ValidationObserver>
                                        </template>

                                        
                                        <template v-if="formItem.type == 'cardCheck' && formItem.show">
                                            <div >
                                                <!-- <div class="header-table-col p-3 d-flex justify-content-between align-items-center">
                                                    <p class="mb-0">{{itemCheck.name}}</p>
                                                </div> -->
                                                <table class="table fixed align-middle">
                                                    <template v-for="(itemCheck, index1) of form[`${formItem.key}`]">
                                                        <tbody >
                                                            <th colspan="3">
                                                                <div class="header-table-col p-3 d-flex justify-content-between align-items-center">
                                                                    <p class="mb-0">{{ itemCheck.name }}</p>
                                                                </div>
                                                            </th>
                                                            <tr v-for="(itemCheckList, index) of itemCheck.pmr_check_list_details">
                                                                <td class="col-lg-6 col-12">{{ itemCheckList.name }}</td>
                                                                <td class="col-lg-1 col-12">
                                                                    <label class="checkbox-group d-flex justify-content-between">
                                                                        <input type="checkbox"  :disabled="itemCheck.disabled" v-model="itemCheckList.work_order_p_m_r_check_list.value" :true-value="1" :false-value="0" style="top: -13px;">
                                                                        <span class="checkmark" :class="itemCheck.disabled ? 'disabled' : ''"/>
                                                                    </label>
                                                                </td>
                                                                <td class="col-lg-5 col-12">
                                                                    <input type="text" class="form-control" :disabled="itemCheck.disabled" v-model="itemCheckList.work_order_p_m_r_check_list.notes" placeholder="notes">
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                    
                                                </table>
                                            </div>
                                        </template>

                                        <template v-if="formItem.type == 'operation' && formItem.show">
                                            <div class="header-table-col p-3 d-flex justify-content-between align-items-center">
                                                <p class="mb-0">Order Type Attribute</p>
                                                <div @click="AddNewOperation()" class="pointer">
                                                    <i class="bi bi-plus-circle"></i>
                                                </div>
                                            </div>
                                            <b-table hover :fields="formItem.headerTable" :items="form[`${formItem.key}`]" 
                                                responsive="true"
                                                :fixed="true"
                                                stacked="lg">
                                                    <template #cell(id)="data">
                                                            <ValidationProvider
                                                                name="Serial Number"
                                                                rules="" 
                                                                tag="div"
                                                                v-slot="{ errors }"
                                                                >
                                                                
                                                                <multiselect 
                                                                    v-model="form[`${formItem.key}`][data.index]['id']"
                                                                    track-by="id"
                                                                    label="name"
                                                                    group-label="name"
                                                                    group-values="wo_type_attributes"
                                                                    :options="formItem.headerTable[0].options" 
                                                                    :searchable="true" 
                                                                    :close-on-select="true" 
                                                                    :show-labels="false"
                                                                    :allow-empty="false"
                                                                    placeholder="Please Select"
                                                                    @input="form[`${formItem.key}`][data.index]['value'] = ''"
                                                                />
                                                                <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                                                            </ValidationProvider>
                                                            
                                                    </template>
                                                    <template #cell(operation)="data">
                                                        <ValidationProvider :name="'item_operation'" :rules="''" tag="div" v-slot="{ errors }" >
                                                            <multiselect 
                                                                v-model="form[`${formItem.key}`][data.index]['operation']"
                                                                :options="formItem.headerTable[1].options" 
                                                                :close-on-select="true" 
                                                                :show-labels="false"
                                                                :allow-empty="false"
                                                                placeholder="Please Select"
                                                            />
                                                        </ValidationProvider>

                                                    </template>
                                                    <template #cell(value)="data">
                                                                    <input :type="data.item.id && data.item.id.attribute_type.id == 1 ? 'text' : 'text' || data.item.id && data.item.id.attribute_type.id == 2 ? 'number' : 'number' " 
                                                                    v-model="form[`${formItem.key}`][data.index]['value']" class="form-control" 
                                                                    placeholder="value"
                                                                    v-if="data.item.id && data.item.id.attribute_type.id == 1 || data.item.id && data.item.id.attribute_type.id == 2"
                                                                    />
                                                                    <label class="checkbox-group d-flex justify-content-between" v-if="data.item.id && data.item.id.attribute_type.id == 4">
                                                                        <input type="checkbox" v-model="form[`${formItem.key}`][data.index]['value']" :true-value="1" :false-value="0">
                                                                        <span class="checkmark" />
                                                                    </label>
                                                                    
                                                                    <textarea v-model="form[`${formItem.key}`][data.index]['value']" class="form-control" 
                                                                    placeholder="value"
                                                                    v-if="data.item.id && data.item.id.attribute_type.id == 6"
                                                                    />

                                                                    <datetime 
                                                                        v-model="form[`${formItem.key}`][data.index]['value']"
                                                                        :type="data.item.id && data.item.id.attribute_type.id == 7 ? 'date' : 'date' || data.item.id && data.item.id.attribute_type.id == 8 ? 'datetime' : 'datetime' " 
                                                                        title="value" 
                                                                        input-class="form-control"
                                                                        placeholder="value"
                                                                        :use12-hour="true"
                                                                        v-if="data.item.id && data.item.id.attribute_type.id == 7 || data.item.id && data.item.id.attribute_type.id == 8"
                                                                    />
                                                                    <datetime 
                                                                        v-model="form[`${formItem.key}`][data.index]['value']"
                                                                        type="time" 
                                                                        input-class="form-control"
                                                                        title="value" 
                                                                        placeholder="value"
                                                                        :use12-hour="true"
                                                                        v-if="data.item.id && data.item.id.attribute_type.id == 9"
                                                                    />
                                                                    
                                                                    <multiselect 
                                                                        v-if="data.item.id && data.item.id.attribute_type.id == 5 || data.item.id && data.item.id.attribute_type.id == 3"
                                                                        v-model="form[`${formItem.key}`][data.index]['value']"
                                                                        :options="data.item.id.attrValues" 
                                                                        label="value"
                                                                        track-by="id"
                                                                        :close-on-select="true" 
                                                                        :show-labels="false"
                                                                        :allow-empty="false"
                                                                        placeholder="Please Select"
                                                                    />
                                                                
                                                    </template>
                                                    
                                                    <template #cell(action)="data">
                                                        <i class="bi bi-x-circle pointer" @click="removeOperation(data.index, formItem.key)" ></i>
                                                    </template>
                                                </b-table>
                                        </template>
                                    </div>
                        </div>
                    </template>
                    <div class="button__form" :class="formList.submitActionReset ? 'w-auto ' : ''"  v-if="formList.submitAction.show" >
                        <button class="button-app default-button m-0 w-auto px-5"  type="submit" :disabled="formList.submitAction.disabled" @click="handleSubmit(onSubmit)">
                        {{ formList.submitAction.name }}
                        <b-spinner v-if="formList.submitAction.loader" small></b-spinner>
                        </button>
                    </div>
                    <div class="button__form w-auto" :class="formList.submitActionReset.class" v-if="formList.submitActionReset && formList.submitActionReset.show">
                        <button class="button-app default-button m-0 text-center px-4" :class="formList.submitActionReset.class"
                        type="submit"
                        :disabled="formList.submitActionReset.disabled" @click="$emit('resetFilter') && $refs.form.reset()">
                        <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                </div>
                
            </ValidationObserver>
          </div>
          
        </div>
        <div class="col">
            <json-viewer
            :value="form"
            copyable
            boxed
            ></json-viewer>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        formList: Object,
        form: Object,
    },
    data() {
        return {
            activeIndex: null,
            phoneNumberResultValid: [],
            isDragging: false,
            active: false,
            files: [],
            protocol: window.location.protocol,
            host: window.location.host,
            showFileData: null
        };
    },
    mounted() {
        this.$refs.form.reset()
        // if(this.form.contact_number.countryCode != '') {
        //     this.phoneNumberResultValid.countryCode = 'EGY'
        // }
    },
    methods: {
        AddNewOperation() {
            this.$emit('AddNewOperation', this.form)
            // this.form.order_type_attrs.push({
            //     id: "",
            //     value: "",
            //     operation: "",
            // })
            // this.form = this.form
        },
        AddNewRow() {
            for(let validate of this.$refs.tableData) {
                validate.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    this.form.dataSerial.push({
                            serial_number: "",
                            expiration_date: "",
                            receiving_date: ""
                    })
                    this.$nextTick(() => {
                        let x = this.$refs.inputserial.at(-1)
                        x.focus();
                    });
                });
            }
        },
        AddNewRowReceipients() {
            for(let validate of this.$refs.tableDataReceipients) {
                validate.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    console.log(this.form)
                    this.form.notification_receipients.push({
                                    recipient_type: "",
                                    recipient: "",
                                    notification_template_id: "",
                                    threshold_hours: "",
                                })
                    
                });
            }
        },
        showFiles(item) {
            if(item.mimeType != 'php') {
                this.showFileData = item
                this.$refs['showfile'][0].show()
            }
        },
        removeSerial(index, formKey) {
            this.form[formKey].splice(index, 1)
        },
        removeOperation(index, formKey) {
            this.form[formKey].splice(index, 1)
        },
        addressInput(e) {
            let autocomplete = new google.maps.places.Autocomplete(
                document.getElementById(e.target.id),
                {
                    bounds: new google.maps.LatLngBounds(
                        new google.maps.LatLng(37.090240, -95.712891)
                    )
                }
            );
            autocomplete.addListener("place_changed", () => {
                let place = autocomplete.getPlace();
                this.form[e.srcElement.id] = place.formatted_address
            })
           
        },
        checkAllRole(e, a, event) {
            for(let active in this.form[e][a]) {
                if(active != 'fieldsPermisions') {
                    if(event.target.checked) {
                        this.form[e][a][active] = true
                    }else {
                        this.form[e][a][active] = false
                    }
                }
                
            }
            
        },
        checkAllPermission(el, event) {
            for(let active in this.form[el]) {
                for(let item in this.form[el][active]) {
                    if(event.target.checked) {
                        this.form[el][active][item] = true
                    }else {
                        this.form[el][active][item] = false
                    }
                    
                }
            }
        },
        
        async onSubmit() {
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                }
                this.$emit('submit_form', this.form)
                this.$nextTick(() => {
                    this.$refs.form.reset()
                    if(this.phoneNumberResultValid.length >= 0) {
                        for(let inputPhone in this.phoneNumberResultValid) {
                            this.phoneNumberResultValid[inputPhone].isValid = false
                        }
                    }
                });
            });
        },
        reachedEndOfList(reached, entry, dropdownKey, internalSearch, propsName, emitActionName) {
            if(!internalSearch) {
                if(reached) {
                    if(this[propsName].page != this[propsName].totalPages - 1 && this[propsName].last != true && this[propsName].empty != true) {
                        this[propsName].page++
                        this.$emit(emitActionName, reached)
                    } 
                }
            }
        },

        selectFiles() {
            this.$refs.file[0].click()
        },
        async finalSelectFile(fileData, formKey, multi) {
            this.files = fileData;
            let formData = new FormData();
            if(this.files.length === 0) return;
            let fileAccepte = []
            for(let typeInput of this.formList.form) {
                if(typeInput.type == 'upload') {
                    fileAccepte = typeInput.typeAccepte
                }
            }
            for(let i = 0; i < this.files.length; i++) {
                if(!fileAccepte.includes(this.files[i].name.split(".").at(-1))) {
                    this.errorMessage('This File Type Is Not Accepte')
                }else {
                    if(!this.form[formKey].some((e)=> e.name === this.files[i].name)) {
                        if(!multi) {
                            formData.append('file', this.files[i]);
                            this.form[formKey] = [
                                {
                                    id: Math.floor(100000 + Math.random() * 900000), 
                                    file: this.files[i],
                                    name: this.files[i].name,
                                    new: true,
                                    mimeType: this.files[i].name.split(".").at(-1),
                                    url: URL.createObjectURL(this.files[i])
                                }
                            ]
                        }else {
                            formData.append('file', this.files[i]);
                            this.form[formKey].push(
                                {
                                    id: Math.floor(100000 + Math.random() * 900000), 
                                    name: this.files[i].name, 
                                    file: this.files[i],
                                    new: true,
                                    mimeType: this.files[i].name.split(".").at(-1),
                                    url: URL.createObjectURL(this.files[i])
                                }
                            );
                        }
                        
                    }
                }
                
            }
            this.isDragging = false
            this.$refs.file[0].value=null
        },
        async onFileSelected(event, formKey, multiple) {
            this.finalSelectFile(event.target.files, formKey, multiple)
        },
        deleteFile(index, formKey) {
            this.form[formKey].splice(index, 1)
            if(!this.form[formKey].length) {
                this.$refs.file[0].value=null
                this.files = []
            }
        },
        onDragOver(event) {
            event.preventDefault()
            this.isDragging = true
            event.dataTransfer.dropEffect = 'copy'
        },
        onDragLeave(event) {
            event.preventDefault()
            this.isDragging = false
        },
        async onDrop(event, formKey, multiple) {
            event.preventDefault()
            this.isDragging = true
            this.finalSelectFile(event.dataTransfer.files, formKey, multiple)
        },
        changedSelectDropdown(e, data){
            // if(data == null) {
            //     this.$refs.form.reset()
            // }
            // this.$refs[e].reset();
            // if(e == 'work_order_type_id' && this.$route.path.split('/').at(-1) == 'wo-work-order') {
            //     this.$refs.form.reset()
            // }
            // console.log()
            if(data == null) {
                this.form[e] = ''
            }
            this.$emit('onChangeSelect', e, this.form[e])

        },
        searchDropdown(e, searchAble, key, propsName){
            if(searchAble) {
                this.$emit('searchOptions', e, searchAble, key, propsName) 
            } 
        },
        phoneUpdate(e){
            this.form[e].countryIsoCode = this.phoneNumberResultValid[e].countryCode || ""
            if(this.phoneNumberResultValid[e].isValid) {
                this.form[e].countryCode = this.phoneNumberResultValid[e].countryCallingCode || ""
                this.form[e].number = this.phoneNumberResultValid[e].nationalNumber || ""
            }
        },
        globalFunction(e, funName, value, disabledStatus){
            if(funName) {
                this[funName](e, value);
            }
            if(disabledStatus && funName) {
                this[funName](e, value);
            }
            if(funName == 'addressInput') {
                this[funName](e, value);
            }
            
        },
        // helloWorlDataTime(key , type, value) {
        //     if(type == 'time') {
        //         this.form[key] = value.split('T')[1]
        //     }
        // }
    },

}
</script>
<style lang="scss">
.lock-input {
    right: 25px;
    top: 0;
    margin-top: 10px;
    color: var(--data_text_color) !important;
}
    .text-releway {
        font-family: "Raleway", "Source Sans Pro", sans-serif;
        font-size: 14px;
    }
    .colorPicker {
        display: inline-flex;
        margin-right: 6px;
        width: 25px;
        height: 25px;
        border-radius: 100px;
        cursor: pointer;
        &.active {
            border: 3px solid #7177e1;
        }
    }
    .checkbox-group {
        color: var(--input-text-color) !important;
    }
    .option__small {
        background-color: var(--default_color);
        color: #ffffff;
        font-size: 12px;
        padding: 0.2rem 0.5rem;
        border-radius: 5px;
        display: inline-block;
    }
    .head_form {
        background-color: var(--base_color);
        print-color-adjust: exact; 
        position: relative;
        color: #fff;
        text-transform: capitalize;
    }
    .head_form:before {
        content : "";
        position: absolute;
        left    : 0;
        bottom  : 0;
        height  : 3px;
        width   : 50%;  /* or 100px */
        print-color-adjust: exact; 
        border-bottom: 3px solid var(--warning_color);
    }
    .col-form-label {
        text-transform: capitalize;
    }
    .form-control::placeholder {
        text-transform: capitalize;
    }
    .discription_input {
        font-size: 12px;
        color: #a5a5a5;
        &.has-danger {
            color: var(--danger_color);
        }
    }

    .ql-toolbar.ql-snow {
        border: 0px;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border: 0px;
    }
    
    .status-item-selected {
        height: 22px;
        display: flex;
        border-radius: 20px !important;
        text-transform: capitalize;
        font-size: 12px;
        text-align: center;
        align-items: center;
        width: fit-content;
        padding-left: 15px;
        padding-right: 15px;
        font-weight: bold;
    }
    .upload-container {
        background-color: var(--input-background-color);
        padding: 5px;
        align-items: center;
        display: flex;
        text-align: center;
        border-radius: 6px;
        border: 1px solid var(--input-border-color);
        .col-4 {
            position: relative;
        }
        .image-uploader {
            width: 100%;
            height: 72px;
            position: relative;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 6px;
            &:before{
                content: "";
                width: 100%;
                height: 72px;
                position: absolute;
                background-color: #fff;
                margin: auto;
                opacity: 0.3;
                left: 0;
                right: 0;
            }
            &:hover{
                opacity: 1;
                &:before{
                    background-color: transparent;
                }
            }
            .icon-options-file {
                position: absolute;
                z-index: 2;
                color: #fff;
                right: 0;
                cursor: pointer;
                width: 22px;
                z-index: 10;
                top: 0;
            }
            
        }
        
    }
    .dragDropFile {
        background-color: var(--input-background-color);
        width: 100%;
        min-height: 110px;
        border-radius: 6px;
        border: 2px dashed var(--input-border-color);
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
            border: 1px dashed var(--default_color);
        }
        .file {
            display: none;
        }
        .chooseFile {
            border: 0px;
            background-color: var(--gray_color);
            color: #959595;
            padding: 0.3rem 0.9rem;
            border-radius: 6px;
            cursor: pointer;
        }
        .options {
            font-size: 14px;
            text-transform: capitalize;
            text-align: center;
            color: #a5a5a5;
            span {
                width: 100%;
                display: block;
                padding-bottom: 0.3rem;
            }
            .icon-drag {
                font-size: 20px;
            }
        }
    }
    .list-multiselect-dropdown {
        border: 1px solid #ced4da;
    padding: 0.5rem;
    border-radius: 0.375rem;
    }
    .scroll-list {
        height: 110px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 5px;
    }
    .accordion {
        .not-collapsed {
            background-color: #ebeff2;
            color: #000;
        }
        .collapse.show {
            border-bottom: 1px solid #dee2e6;
        }
    }
    .copy-icons {
        background-color: #dee2e6;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .default-text {
        color: var(--data_menu_color);
    }
    .pac-icon {
        display: none;
    }
    .pac-container {
        margin-top: 5px;
        box-shadow: 0 0px 0px rgba(0,0,0,.3) !important;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
    }
    .pac-item {
        padding: 5px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
            background-color: #ececec;
        }
    }
    .header-table-col {
        background-color: var(--base_color) !important;
        color: #fff;
        p {
            color: #fff !important;
        }
    }
    .pointer {
            cursor: pointer;
        }
        .success-file {
    position: absolute;
    bottom: 0;
    left: 0;
}
#showfile {
    .modal-body {
        padding: 0px;
    }
}
.table > :not(caption) > * > * {
    text-transform: capitalize;
}
.head-center {
    position: relative;
    h6 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0px;
        padding-bottom: 0px;
        text-transform: capitalize;
        position: relative;
        span {
            background: #124b85;
            z-index: 2;
            position: relative;
            left: 0;
            right: 0;
            margin: auto;
            width: fit-content;
            display: block;
            padding: 10px;
            color: #fff;
        }
        &:after {
            position: absolute;
            content: '';
            width: 100%;
            height: 1px;
            background-color: #000;
            right: 0;
            margin-top: -18px;
        }
    }
}
</style>