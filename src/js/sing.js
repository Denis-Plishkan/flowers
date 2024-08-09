import app from './app';
import {signInWithEmailAndPassword } from "firebase/auth";
import firebase from './modules/firebase';
import JustValidate from 'just-validate';
import basket from './modules/basket';

let basketEl = basket();


class Sing{
    constructor(){
        this.form = document.querySelector('form');
        this.login = document.querySelector('.sing__login');
        this.password = document.querySelector('.sing__password');
        this.btn = document.querySelector('.sing__btn');
        this.validate = new JustValidate(this.form);
        this.validation();
        this.getUser();
    }
    getUser(){
        firebase.getSinged().then(info =>{
            const confirmInfo = confirm("Чтобы зайти на другой аккаунт сначала нужно выйти из текущего! Выпонить выход ?");
            if(confirmInfo){
                firebase.exit();
                this.cleanForm();
            }else{
                window.location.href = './index.html'
            }
        }).catch(info => {
            console.log(info)
        })
    }
    singIn(email, password){
        const auth = firebase.getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = './index.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode === 'auth/invalid-login-credentials'){
                alert('Логин или пароль указан неверно');
                this.cleanForm();
            }
        });
    }
    cleanForm(){
        this.login.value = '';
        this.password.value = '';
    }
    validation(){
        //Логин         
        const ruleLogin = [
            {
                rule: 'required',
                errorMessage: 'Введите логин'
            },
            {
                rule: 'customRegexp',
                value: /(^[a-zA-Z0-9][a-zA-Z0-9.-]{1,20}[a-zA-Z0-9]@[a-zA-Zа-яА-Я0-9][a-zA-Zа-яА-Я0-9.-]{1,15}[a-zA-Zа-яА-Я0-9]\.[a-z]{1,10})/,
                errorMessage: 'Невалидный email',
            },
        ];
        const settingLogin = {
            errorsContainer: '.label__login',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.login, ruleLogin, settingLogin);
        //Пароль
        const rulePassword = [
            {
                rule: 'required',
                errorMessage: 'Введите пароль',
            },
            {
                rule: 'minLength',
                value: 8,
                errorMessage: 'Минимум 8 символов',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Максимум 20 символов',
            },
            {
                rule: 'customRegexp',
                value: /^(?:(.)(?!\1\1\1))+$/,
                errorMessage: 'Максиуму 3 одинаковых символа подряд',
            },
            {
                rule: 'customRegexp',
                value: /[0-9]/,
                errorMessage: 'Минимум одна цифра',
            },
            {
                rule: 'customRegexp',
                value: /^(?!.*\s)/,
                errorMessage: 'Пробелы недопустимы',
            },
            {
                rule: 'password',
                errorMessage: 'Можно только (a-z,A-Z,0-9,- и .)',
            },
        ];
        const settingPassword = {
            errorsContainer: '.label__password',
            errorLabelCssClass: ['invalid'],
            errorFieldCssClass: ['error-focus'],
        }
        this.validate.addField(this.password, rulePassword,settingPassword);

        this.validate.onSuccess( event => {
            this.singIn(this.login.value, this.password.value)
        });
    }
}

const sing = new Sing();



