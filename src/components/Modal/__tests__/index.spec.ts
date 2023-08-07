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
	})

	describe('mount', () => {
		it('should render correctly', () => {
			expect(wrapper.html()).toMatchSnapshot()
		})
	})

	describe('methods', () => {
		it('should emit close event', () => {
			wrapper.vm.handleClose()
			expect(wrapper.emitted('close')).toBeTruthy()
		})
	})
})
