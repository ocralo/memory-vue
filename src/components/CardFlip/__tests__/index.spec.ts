import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import CardFlit from '@/components/CardFlip/index.vue'

describe('CardFlit', () => {
	let wrapper: any

	const props = {
		frontCard: {
			name: 'frontCard',
			src: 'frontCard',
		},
		backCard: {
			name: 'backCard',
			src: 'backCard',
		},
		flip: true,
	}

	beforeEach(() => {
		wrapper = shallowMount(CardFlit, { props })
	})

	afterEach(() => {
		wrapper.unmount()
	})

	describe('mounted', () => {
		it('should be mounted', () => {
			expect(wrapper.vm).toBeTruthy()
		})

		it('should be mounted with flip in false', () => {
			wrapper = shallowMount(CardFlit, { ...props, flip: false })
			expect(wrapper.vm).toBeTruthy()
		})
	})

	describe('methods', () => {
		it('should call handleClick', () => {
			const spy = vi.spyOn(wrapper.vm, 'handleClick')
			wrapper.vm.handleClick()
			expect(spy).toHaveBeenCalled()
		})
	})

	describe('props', () => {
		describe('props frontCard', () => {
			it('should have props frontCard name', () => {
				expect(wrapper.props().frontCard.name).toBeTruthy()
			})

			it('should have props frontCard src', () => {
				expect(wrapper.props().frontCard.src).toBeTruthy()
			})
		})

		describe('props backCard', () => {
			it('should have props backCard name', () => {
				expect(wrapper.props().backCard.name).toBeTruthy()
			})
			it('should have props backCard src', () => {
				expect(wrapper.props().backCard.src).toBeTruthy()
			})
		})

		describe('props flip', () => {
			it('should have props flip', () => {
				expect(wrapper.props().flip).toBeTruthy()
			})

			it('should have props flip equal true', () => {
				expect(wrapper.props().flip).toEqual(true)
			})

			it('should have props flip equal false', async () => {
				await wrapper.setProps({ flip: false })
				expect(wrapper.props().flip).toEqual(false)
			})
		})
	})
})
