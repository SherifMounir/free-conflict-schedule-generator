import Vue from 'vue';
import Swal from 'sweetalert2';
const mixins = {
    warningAlert(message) {
        return Swal.fire({
            title: 'warning',
            icon: 'warning',
            text: message,
            type: "warning",
            confirmButtonColor: "#4c52bb",
        });
    },
    confirmAlert(areYou, message, icons) {
        return Swal.fire({
            title: areYou,
            text: message,
            icon: icons,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4c52bb",
            cancelButtonColor: "#c7072e",
            cancelButtonText: this.$t("messageAlert.canncelButton"),
            confirmButtonText: this.$t("messageAlert.confirmButton"),
            showLoaderOnConfirm: true,
        });
    },

    confirmDeleteAlert(areYou, message) {
        return Swal.fire({
            title: areYou,
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4c52bb",
            cancelButtonColor: "#c7072e",
            cancelButtonText: this.$t("messageAlert.canncelButton"),
            confirmButtonText: this.$t("messageAlert.deleteButton"),
        });
    },

    changeStatusAccount(areYou, message) {
        return Swal.fire({
            title: areYou,
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4c52bb",
            cancelButtonColor: "#c7072e",
            cancelButtonText: this.$t("messageAlert.canncelButton"),
            confirmButtonText: this.$t("messageAlert.confirmButton"),
        });
    },

    errorMessage(titleMessage, errorMessage) {
        return Swal.fire({ 
            type: 'error', 
            icon: 'error',
            title: titleMessage,
            text: errorMessage,
            confirmButtonColor: "#4c52bb",
            cancelButtonColor: "#c7072e",
            allowOutsideClick: false
         })
    },
    errorMultiMessage(err) {
        var ErrorMessage = err.map(function(item) { 
            return "<div class='alert alert-danger mb-3 text-start fs-6'><span>" + item + "</span></div>";
        }).join('');
        return Swal.fire({
            type: "error",
            icon: 'error',
            confirmButtonColor: "#dc3545",
            confirmButtonText: "Ok",
            html: ErrorMessage
        })
    },
    messageToast(title, position, customClass, iconHtml) {
        return Swal.fire({
            customClass: {
              'container': customClass
            },
            toast: true,
            iconHtml: iconHtml,
            title: title,
            position: position,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
    },
    formatDateAssigned(value) {
        let formattedDate
        if(value) {
            formattedDate = this.$moment(value).format('MMMM Do YYYY, h:mm:ss a');
        }else {
            formattedDate = '__'
        }
        return formattedDate;
      },
    
    copyValue(el){
      navigator.clipboard.writeText(el).then(
          () => {
            this.messageToast('Text copied to clipboard', 'center', 'success-toast', '<i class="bi bi-check-circle"></i>')
          },
          (err) => {
            console.error("Could not copy text: ", err);
          }
        );
    },
    successMessage(text) {
        return Swal.fire({
            type: 'success',
            title: text,
            icon: 'success',
            confirmButtonColor: "#4c52bb",
            confirmButtonText: 'Ok',
        })
    },
    NumbersOnly(e) {
        e = e ? e : window.event;
        let validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (!validChars.includes(e.key)) {
            e.preventDefault();
        } else {
            return true;
        }
    },
    async loaderInput(e, formList) {
        if(e) {
          formList.submitAction.disabled = true
          formList.submitAction.loader = true
        }else {
            setTimeout(() => {
                formList.submitAction.disabled = false
                formList.submitAction.loader = false
            }, "1000");
        }
        return formList
      },
    async handleDesignForm(formList) {
      let form = {}
      for (let i = 0; i < formList.form.length; i++) {
          if ([formList.form[i].key] != 'titleForm' && [formList.form[i].key] != 'hr' && [formList.form[i].key] != 'headerForm' && [formList.form[i].type] != 'checkbox' && [formList.form[i].type] != 'upload' && formList.form[i].show) {
              form = {
                  ...form,
                  [formList.form[i].key]: "",
              }; 
          }
          if ([formList.form[i].type] == 'checkbox' || [formList.form[i].type] == 'radio' || [formList.form[i].type] == 'toggle') {

                form = {
                  ...form,
                  [formList.form[i].key]: formList.form[i].falseValue,
              };
          }
          
          if ([formList.form[i].type] == 'upload' || [formList.form[i].type] == 'operation') {
              form = {
                  ...form,
                  [formList.form[i].key]: [],
              };
          }


          if ([formList.form[i].type] == 'phone') {
              form = {
                  ...form,
                  [formList.form[i].key]: {
                      countryCode: "",
                      number: "",
                      countryIsoCode: ""
                  },
              };
          }

          if ([formList.form[i].type] == 'option' && formList.form[i].multi == true || [formList.form[i].type] == 'tableExpand') {
              form = {
                  ...form,
                  [formList.form[i].key]: [],
              };
          }
          
            if (formList.form[i].type == 'accordion') {
                form = {
                    ...form,
                    [formList.form[i].key]: [],
                }
                for(let itemOfRole of this.formList.form) {
                    if(itemOfRole.key == "permissions") {
                        for(let [key, final] of Object.entries(itemOfRole.options)) {
                            console.log(key)
                            // Object.assign(form[itemOfRole.key][itemOfRole.key], {[final]: []});
                        }
                    }
                }
            }
      }
      return form
    },

    async logoutGlobal() {
        await this.confirmAlert('Are you sure you want to sign out?', ``, 'warning').then(({dismiss})=> {
          if (!dismiss) {
            this.$auth.logout()
            localStorage.clear()
          }
        })
      }
}
export default mixins
Vue.mixin({ methods: mixins })