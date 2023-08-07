import {
	vi,
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	type Mock,
} from 'vitest'
import { useI18n } from 'vue-i18n'
import { shallowMount } from '@vue/test-utils'
import ModalComponent from '@/components/Modal/index.vue'

vi.mock('vue-i18n')

const scrollToSpy = vi.fn()
global.scrollTo = scrollToSpy

describe('Modal', () => {
	let wrapper: any
	beforeEach(() => {
		;(useI18n as Mock).mockReturnValue({
			t: (value: string) => value,
		})
		wrapper = shallowMount(ModalComponent, {
			props: {
				isOpen: false,
			},
		})
	})

	afterEach(() => {
		wrapper.unmount()
		vi.clearAllMocks()
	})

	describe('mount', () => {
		it('should render correctly', () => {
			expect(wrapper.html()).toMatchSnapshot()
		})
	})

	describe('methods', () => {
		describe('handleClose', () => {
			it('should emit close event', () => {
				wrapper.vm.handleClose()
				expect(wrapper.emitted('close')).toBeTruthy()
			})
		})

		describe('handleScroll', () => {
			it('should emit scroll event', () => {
				wrapper.vm.handleScroll(true)
				expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
			})

			it('should not emit scroll event', () => {
				wrapper.vm.handleScroll(false)
				expect(scrollToSpy).not.toHaveBeenCalled()
			})
		})
	})
})
