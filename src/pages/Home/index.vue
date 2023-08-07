<template>
	<header>
		<h1 class="text-3xl text-slate-900 font-medium text-center mb-4">
			Memory Game
		</h1>
	</header>
	<main>
		<form @submit.prevent="handleSubmit" class="max-w-xs w-full mx-auto">
			<div class="mb-4">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="username">
					Username
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="username"
					v-model="user"
					type="text"
					required
					placeholder="Username" />
			</div>
			<div class="mb-4">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="numberOfPairs">
					Number of Pairs
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="numberOfPairs"
					v-model="numberOfPairs"
					:min="minNumberOfPairs"
					:max="maxNumberOfPairs"
					type="number"
					required
					placeholder="Number of Pairs" />
			</div>
			<button
				class="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit">
				Start
			</button>
		</form>
	</main>
</template>

<script lang="ts">
	import { useAnimalGameStore } from '@/stores/animalsGame'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { defineComponent, ref } from 'vue'
	import { useRouter } from 'vue-router'

	export default defineComponent({
		name: 'HomePage',
	})
</script>

<script setup lang="ts">
	const router = useRouter()

	const user = ref('')
	const minNumberOfPairs = 4
	const maxNumberOfPairs = 20

	const userStore = useUserStore()
	const AnimalGameStore = useAnimalGameStore()

	const { maxAnimals } = storeToRefs(AnimalGameStore)
	const numberOfPairs = ref(maxAnimals)

	const { setUser } = userStore
	const { resetGame, setMaxAnimals } = AnimalGameStore

	const handleSubmit = () => {
		if (
			user.value &&
			user.value !== '' &&
			numberOfPairs.value &&
			numberOfPairs.value >= minNumberOfPairs &&
			numberOfPairs.value <= maxNumberOfPairs
		) {
			setUser(user.value)
			setMaxAnimals(numberOfPairs.value)
			resetGame()
			router.push('/card-game')
		}
	}
</script>
