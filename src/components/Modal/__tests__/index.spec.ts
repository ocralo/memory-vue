import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ModalComponent from '@/components/Modal/index.vue'

describe('Modal', () => {
	let wrapper: any
	beforeEach(() => {
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
