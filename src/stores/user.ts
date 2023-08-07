import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
	const user = ref<string | null>(null)

	const setUser = (name: string): void => {
		user.value = name
	}

	const clearUser = (): void => {
		user.value = null
	}

	return { user, setUser, clearUser }
})
