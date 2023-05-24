import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import kr from './kr'

const i18n = createI18n({
    legacy: false, //处理报错Uncaught (in promise) SyntaxError: Not available in legacy mode (at message-compiler.esm-bundler.js:54:19)
    locale: localStorage.getItem('lang') || "en", // 注意locale属性~~~~~~~~！
    messages:{
        zh,
        en,
        kr
    }
})
export default i18n