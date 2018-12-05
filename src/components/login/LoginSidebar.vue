<template>
    <aside class="login-sidebar-wrapper" @click.self="closeLoginSidebar">
        <div class="login-sidebar">
            <div class="close-icon">
                <a @click.prevent="closeLoginSidebar">
                    <close-svg></close-svg>
                </a>
            </div>
            <div>
                <h3 class="title margin-20">ورود/عضویت</h3>
                <div class="divider"></div>
                <div class="login-wrapper">
                    <transition name="slide-login-form">
                        <form class="login-content" @submit.prevent="submitPhoneNumber" v-show="state.getPhoneNumber">
                            <phone-number :hasError="checkErr.phoneNumber" :error="errors.phoneNumber"></phone-number>
                            <icon-button-primary icon="fas fa-chevron-left">مرحله بعدی</icon-button-primary>
                            <Loading v-if="loading"></Loading>
                        </form>
                    </transition>
                    <transition name="slide-login-form">
                        <form class="login-content" @submit.prevent="submitActiveCode" v-show="state.getActiveCode">
                            <active-code :hasError="checkErr.activeCode" :error="errors.activeCode" v-show="!codeExpired"></active-code>
                            <icon-button-primary icon="fas fa-chevron-left" v-if="!codeExpired">مرحله بعدی</icon-button-primary>
                            <icon-button-primary type="button" icon="fas fa-redo-alt" v-else @buttonClick="renewCode">
                                ارسال مجدد کد تایید
                            </icon-button-primary>
                            <div class="login-timer">
                                <h4 class="title margin-bottom-10">زمان اعتبار کد تایید</h4>
                                <p class="timer-large">{{ activeTime }}</p>
                            </div>
                            <Loading v-if="loading"></Loading>
                        </form>
                    </transition>
                    <transition name="slide-login-form">
                        <form class="login-content" @submit.prevent="submitNewUser" v-show="state.register">
                            <div class="upload-avatar">
                                <input id="add-avatar-file" type="file" @change="avatarPath" name="image" hidden accept="image/jpg, image/jpeg, image/png"/>
                                <div class="add-avatar" v-show="!avatar">
                                    <img src="../../assets/images/default_avatar.png" alt="add image" @click.prevent="choiceImage">
                                    <i class="fas fa-plus-circle"  @click.prevent="choiceImage"></i>
                                </div>
                                <div class="add-avatar" v-show="avatar">
                                    <img :src="avatar" alt="add image" @click.prevent="choiceImage">
                                    <i class="fas fa-plus-circle"  @click.prevent="choiceImage"></i>
                                </div>
                                <p class="input-error" v-if="checkErr.register.image">{{ errors.register.image }}</p>
                            </div>
                            <username :valid="validInput.username" :hasError="checkErr.register.username" :error="errors.register.username" @changeUsername="checkUsername"></username>
                            <name :hasError="checkErr.register.name" :error="errors.register.name"></name>
                            <family :hasError="checkErr.register.family" :error="errors.register.family"></family>
                            <button-primary>ثبت نام</button-primary>
                            <Loading v-if="loading"></Loading>
                        </form>
                    </transition>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    import CloseSvg from '../CloseSvg';
    import { mapActions, mapGetters } from 'vuex';
    import PhoneNumber from './PhoneNumber';
    import IconButtonPrimary from '../bottons/IconButtonPrimary';
    import Loading from '../Loading';
    import ActiveCode from './ActiveCode';
    import { phoneNumberValidator, activeCodeValidator, usernameValidator, nameValidator, familyValidator, imageValidator } from '../../validation/loginValidator';
    import Username from './Username';
    import Name from './Name';
    import Family from './Family';
    import ButtonPrimary from '../bottons/ButtonPrimary';

    export default {
        name: "LoginSidebar",
        components: { ButtonPrimary, Family, Name, Username, ActiveCode, Loading, IconButtonPrimary, PhoneNumber, CloseSvg },
        data() {
            return {
                loading: false,
                state: {
                    getPhoneNumber: true,
                    getActiveCode: false,
                    register: false
                },
                validInput: {
                    username: {
                        isValid: false,
                        message: ''
                    }
                },
                checkErr: {
                    phoneNumber: false,
                    activeCode: false,
                    register: {
                        username: false,
                        name: false,
                        family: false,
                        image: false
                    }
                },
                errors: {
                    phoneNumber: null,
                    activeCode: null,
                    register: {
                        username: null,
                        name: null,
                        family: null,
                        image: null
                    }
                },
                timer: 3 * 60,
                codeExpired: false,
                avatar : null
            }
        },
        computed: {
            ...mapGetters(['phoneKey']),
            activeTime() {
                let minutes = Math.floor(this.timer / 60);
                let seconds = this.timer - minutes * 60;
                if(seconds < 10) {
                    seconds = `0${seconds}`
                }
                return `0${minutes}:${seconds}`
            }
        },
        methods: {
            ...mapActions(['closeLoginSidebar', 'fetchPhoneKey', 'sendActiveCode', 'insertNewUser']),
            submitPhoneNumber(e) {
                this.loading = true;
                const phoneNumber = e.target.phone.value.trim();
                phoneNumberValidator(phoneNumber, (isValid, errMsg) => {
                    if(!isValid) {
                        this.loading = false;
                        this.checkErr.phoneNumber = true;
                        this.errors.phoneNumber = errMsg;
                    }else {
                        this.checkErr.phoneNumber = false;
                        this.fetchPhoneKey(phoneNumber).then(() => {
                            this.loading = false;
                            setInterval(() => {
                                if(this.timer >= 1) {
                                    this.timer = this.timer - 1
                                }else {
                                    this.codeExpired = true
                                }
                            }, 1000);
                            this.state.getPhoneNumber = false;
                            this.state.getActiveCode = true;
                        }).catch(err => {
                            this.loading = false;
                            this.checkErr.phoneNumber = true;
                            this.errors.phoneNumber = err.data.data.error
                        })
                    }
                });
            },
            submitActiveCode(e) {
                this.loading = true;
                const activeCode = e.target.active_code.value.trim();
                activeCodeValidator(activeCode, (isValid, errMsg) => {
                    if(!isValid) {
                        this.loading = false;
                        this.checkErr.activeCode = true;
                        this.errors.activeCode = errMsg;
                    }else {
                        this.checkErr.activeCode = false;
                        this.sendActiveCode(activeCode).then(isNewUser => {
                            this.loading = false;
                            this.state.getActiveCode = false;
                            if(!isNewUser) {
                                this.closeLoginSidebar();
                            }else {
                                this.state.register = true
                            }
                        }).catch(err => {
                            this.loading = false;
                            this.checkErr.activeCode = true;
                            this.errors.activeCode = err.data.data.error
                        })
                    }
                });
            },
            renewCode() {
                this.loading = true;
                let formData = new FormData();
                formData.append('phone_key', this.phoneKey);
                this.$http.post('/v1/code', formData).then(() => {
                    this.loading = false;
                    this.codeExpired = false;
                    this.timer = 3 * 60
                }).catch(err => console.log(err))
            },
            checkUsername(username) {
                let user = username.trim();
                if(user.length >= 4) {
                    const formData = new FormData();
                    formData.append('username', user);
                    this.$http.post('/v1/users/username', formData).then(() => {
                        this.checkErr.register.username = false;
                        this.validInput.username.isValid = true;
                        this.validInput.username.message = `نام کاربری ${user} قابل ثبت است`;
                    }).catch(() => {
                        this.validInput.username.isValid = false;
                        this.checkErr.register.username = true;
                        this.errors.register.username = `نام کاربری ${user} قبلا ثبت شده است`;
                    })
                } else {
                    this.validInput.username.isValid = false;
                    this.checkErr.register.username = false;
                }
            },
            choiceImage() {
                document.getElementById('add-avatar-file').click();
            },
            avatarPath(e) {
                if (e.target.files && e.target.files[0]) {
                    imageValidator(e.target.files[0], (isValid, errMsg) => {
                        if(!isValid) {
                            this.loading = false;
                            this.checkErr.register.image = true;
                            this.errors.register.image = errMsg;
                        } else {
                            this.checkErr.register.image = false;
                            let reader = new FileReader();
                            reader.onload = (e) => {
                                this.avatar = e.target.result
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    })

                }
            },
            async submitNewUser(e) {
                this.loading = true;
                let username = e.target.username.value.trim();
                let name = e.target.name.value.trim();
                let family = e.target.family.value.trim();
                let image = e.target.image.files[0];
                let err = false;
                await usernameValidator(username, (isValid, errMsg) => {
                    if(!isValid) {
                        this.loading = false;
                        this.checkErr.register.username = true;
                        this.errors.register.username = errMsg;
                        err = true
                    } else {
                        this.checkErr.register.username = false;
                    }
                });
                await nameValidator(name, (isValid, errMsg) => {
                    if(!isValid) {
                        this.loading = false;
                        this.checkErr.register.name = true;
                        this.errors.register.name = errMsg;
                        err = true
                    } else {
                        this.checkErr.register.name = false;
                    }
                });
                await familyValidator(family, (isValid, errMsg) => {
                    if(!isValid) {
                        this.loading = false;
                        this.checkErr.register.family = true;
                        this.errors.register.family = errMsg;
                        err = true
                    } else {
                        this.checkErr.register.family = false;
                    }
                });

                await imageValidator(image, (isValid, errMsg) => {
                    if(!isValid) {
                        this.loading = false;
                        this.checkErr.register.image = true;
                        this.errors.register.image = errMsg;
                        err = true
                    } else {
                        this.checkErr.register.image = false
                    }
                });

                if(!err) {
                    this.insertNewUser({username, name, family, image}).then(() => {
                        this.loading = false;
                        this.closeLoginSidebar();
                    }).catch(err => {
                        this.loading = false;
                    })
                }
            }
        }
    }
</script>
