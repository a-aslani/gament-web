export const phoneNumberValidator = (phoneNumber, error) => {
    if(phoneNumber === '') {
        return error(false, 'شماره موبایل الزامی است')
    }else if(isNaN(phoneNumber)) {
        return error(false, 'شماره موبایل حتما باید عدد باشد');
    }else if(phoneNumber.length < 10) {
        return error(false, 'شماره موبایل حداقل باید 10 رقم باشد');
    }else if(phoneNumber.length > 10) {
        return error(false, 'شماره موبایل حداکثر باید 10 رقم باشد');
    }else if(phoneNumber[0] === '0') {
        return error(false, 'لطفا شماره ی خود را بدون 0 ابتدایی وارد نمایید');
    }else {
        return error(true, null)
    }
};

export const activeCodeValidator = (code, error) => {
    if(code === '') {
        return error(false, 'کد فعالسازی الزامی است')
    }else if(isNaN(code)) {
        return error(false, 'کد فعالسازی حتما باید عدد باشد');
    }else {
        return error(true, null)
    }
};

export const usernameValidator = (username, error) => {
    if(username === '') {
        return error(false, 'نام کاربری الزامی است')
    }else if(username.length < 4) {
        return error(false, 'نام کاربری حداقل باید 4 حرف باشد')
    }else {
        return error(true, null)
    }
};

export const nameValidator = (name, error) => {
    if(name === '') {
        return error(false, 'نام الزامی است')
    }else {
        return error(true, null)
    }
};

export const familyValidator = (family, error) => {
    if(family === '') {
        return error(false, 'نام خانوادگی الزامی است')
    }else {
        return error(true, null)
    }
};

export const imageValidator = (image, error) => {
   if(image && image.type !== 'image/jpeg' && image.type !== 'image/jpg' && image.type !== 'image/png') {
        return error(false, 'فرمت تصویر حتما باید jpeg, jpg یا png باشد')
    }else {
        return error(true, null)
    }
};