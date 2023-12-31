import {
	vi,
	describe,
	it,
	expect,
	afterEach,
	beforeEach,
	type Mock,
} from 'vitest'
import { useI18n } from 'vue-i18n'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CardGame from '@/pages/CardGame/index.vue'
import { useUserStore } from '@/stores/user'
import sinon from 'sinon'
import { RoutePath } from '@/router/enum'

const push = vi.fn()

vi.mock('vue-router', () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(() => ({
		push,
	})),
}))

vi.mock('vue-i18n')

describe('CardGame', () => {
	let wrapper: any
	let store: any

	beforeEach(() => {
		;(useI18n as Mock).mockReturnValue({
			t: (value: string) => value,
		})
		wrapper = shallowMount(CardGame, {
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
		describe('handleLogout', () => {
			it('should call logout', () => {
				wrapper.vm.handleLogout()
				expect(store.clearUser.calledOnce).toBeTruthy()
				expect(push).toHaveBeenCalled()
				expect(push).toHaveBeenCalledWith(RoutePath.Home)
			})
		})
	})
})
