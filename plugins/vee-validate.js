import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { required, min, email, confirmed, max, image, alpha_num, numeric, digits } from "vee-validate/dist/rules";

// // Add a rule.
extend('verify_password', {
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return strongRegex.test(value);
    },
    message: `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,

});
extend("min", {
    validate(value, args) {
        return value.length >= args.length;
    },
    params: ['length'],
    message: `{_field_} may not be less than {length} characters`
});

extend("customEmail", {
    validate(value, [otherValue]) {
        if (!value) {
            return 'This field is required';
        }
        // if the field is not a valid email
        const regex = new RegExp('^[A-Za-z0-9._%+-]+@' + otherValue + '$');
        if (!regex.test(value.toLowerCase())) {
            return 'Please provide a vaild education email address & should be end @' + otherValue;
        }
        // All is good
        return true;
    }
});

extend("email", {
    validate(value) {
        if (!value) {
            return `{_field_} field is required`;
        }
        // if the field is not a valid email
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (!regex.test(value.toLowerCase())) {
            return `{_field_} is not email address`;
        }
        // All is good
        return true;
    }
});

extend('numeric', {
    ...numeric,
    message: `{_field_} may only contain numeric characters`,
})
extend('alpha_num', {
    ...alpha_num,
    message: `{_field_} may only contain alpha-numeric characters`,
})

extend('url', {
    validate: value => {
        return /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(value);
    },
    message: 'This value must be a valid URL',
  })

extend("image", {
    ...image,
    message: 'This file is not image'
});
extend("max", {
    validate(value, args) {
        return value.length <= args.length;
    },
    params: ['length'],
    message: `{_field_} may not be greater than {length} characters`
});

extend('required', {
    ...required,
    message: `{_field_} is required`,
})

extend('confirmed', {
    ...confirmed,
    message: `{_field_} does not match`,
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);