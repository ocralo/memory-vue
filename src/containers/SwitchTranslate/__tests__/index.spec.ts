import {
	vi,
	describe,
	beforeEach,
	afterEach,
	it,
	expect,
	type Mock,
} from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import SwitchTranslate from '@/containers/SwitchTranslate/index.vue'

vi.mock('vue-i18n')

describe('SwitchTranslate', () => {
	let wrapper: any

	const locale = ref('co')

	beforeEach(() => {
		;(useI18n as Mock).mockReturnValue({
			t: (value: string) => value,
			locale,
		})
		wrapper = shallowMount(SwitchTranslate, {
			global: {
				provide: {
					locale,
				},
			},
		})
	})
	afterEach(() => {
		wrapper.unmount()
	})

	describe('mounted', () => {
		it('should render correctly', () => {
			expect(wrapper.html()).toMatchSnapshot()
		})
	})

	describe('methods', () => {
		describe('handleChangeLocale', () => {
			it('should change locale', () => {
				wrapper.vm.handleChangeLocale(true)
				expect(locale.value).toBe('us')
			})
			it('should change locale', () => {
				wrapper.vm.handleChangeLocale(false)
				expect(locale.value).toBe('co')
			})
		})
	})
})
