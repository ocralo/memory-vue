import { createI18n } from 'vue-i18n'
import co from '@/locales/co'
import us from '@/locales/us'

const i18n = createI18n({
	locale: 'co',
	fallbackLocale: 'co',
	messages: {
		co,
		us,
	},
	legacy: false,
})

export default i18n
