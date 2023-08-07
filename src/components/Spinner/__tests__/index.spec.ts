import { describe, it, expect } from 'vitest'
import Spinner from '@/components/Spinner/index.vue'
import { shallowMount } from '@vue/test-utils'

describe('Spinner', () => {
	describe('mount', () => {
		it('should render correctly', () => {
			const wrapper = shallowMount(Spinner)
			expect(wrapper.html()).toMatchSnapshot()
		})
	})
})
