import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

import { useAnimalGameStore } from '@/stores/animalsGame'
import TableCardsFlip from '@/containers/TableCardsFlip/index.vue'

describe('TableCardsFlip', () => {
	let wrapper: any
	let store: any

	beforeEach(() => {
		wrapper = shallowMount(TableCardsFlip, {
			global: {
				plugins: [createTestingPinia({ createSpy: sinon.spy })],
			},
		})

		store = useAnimalGameStore()
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
		describe('handleFlip', () => {
			it('should call flipAnimalCard', () => {
				wrapper.vm.handleFlip(1)
				expect(store.flipAnimalCard.calledOnce).toBeTruthy()
			})
		})

		describe('completedPairs', () => {
			it('should call completedPairs', () => {
				wrapper.vm.completedPairs(['1', '2'])
				expect(store.completedAnimal.called).toBeTruthy()
			})
		})

		describe('handleCloseModal', () => {
			it('should call handleCloseModal', () => {
				wrapper.vm.handleCloseModal()
				expect(wrapper.vm.isOpenModal).toBeFalsy()
			})
		})
	})
})
