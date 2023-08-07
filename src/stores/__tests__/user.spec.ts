import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'

describe('useUserStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('should have the correct initial state', () => {
		const store = useUserStore()

		expect(store.user).toBeNull()
	})

	describe('setUser', () => {
		it('should set user', () => {
			const store = useUserStore()
			store.setUser('John')

			expect(store.user).toBe('John')
		})
	})

	describe('clearUser', () => {
		it('should clear user', () => {
			const store = useUserStore()
			store.setUser('John')
			store.clearUser()

			expect(store.user).toBeNull()
		})
	})
})
