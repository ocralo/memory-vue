import {
	vi,
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	type Mock,
} from 'vitest'
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import { useI18n } from 'vue-i18n'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'

import Home from '@/pages/Home/index.vue'

const push = vi.fn()

vi.mock('vue-router', () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(() => ({
		push,
	})),
}))

vi.mock('vue-i18n')

describe('Home', () => {
	let wrapper: any
	let store: any

	beforeEach(() => {
		;(useI18n as Mock).mockReturnValue({
			t: (value: string) => value,
		})
		wrapper = shallowMount(Home, {
			global: {
				plugins: [createTestingPinia({ createSpy: sinon.spy })],
			},
		})

		store = useUserStore()
	})

	afterEach(() => {
		wrapper.unmount()
	})

	describe('mounted', () => {
		it('should render', () => {
			expect(wrapper.exists()).toBeTruthy()
		})
	})

	describe('methods', () => {
		describe('handleSubmit', () => {
			it('should not call setUser', () => {
				wrapper.vm.handleSubmit()
				expect(store.setUser.calledOnce).toBeFalsy()
			})
			it('should call setUser', () => {
				wrapper.vm.user = 'test'
				wrapper.vm.numberOfPairs = 4
				wrapper.vm.handleSubmit()
				expect(store.setUser.calledOnce).toBeTruthy()
				expect(push).toHaveBeenCalled()
				expect(push).toHaveBeenCalledWith('/card-game')
			})
		})
	})
})
