<template>
	<header>
		<h1 class="text-3xl text-slate-900 font-medium text-center mb-4">
			{{ t('home.title') }}
		</h1>
	</header>
	<main>
		<form @submit.prevent="handleSubmit" class="max-w-xs w-full mx-auto p-4">
			<div class="mb-4">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="username">
					{{ t('home.user.label') }}
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="username"
					v-model="user"
					type="text"
					required
					:placeholder="t('home.user.placeholder')" />
			</div>
			<div class="mb-4">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="numberOfPairs">
					{{ t('home.pairs.label') }}
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="numberOfPairs"
					v-model="numberOfPairs"
					:min="minNumberOfPairs"
					:max="maxNumberOfPairs"
					type="number"
					required
					:placeholder="t('home.pairs.placeholder')" />
			</div>
			<button
				class="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				:title="t('home.start')"
				type="submit">
				{{ t('home.start') }}
			</button>
		</form>
	</main>
</template>

<script lang="ts">
	import { RoutePath } from '@/router/enum'
	import { useAnimalGameStore } from '@/stores/animalsGame'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { defineComponent, ref } from 'vue'
	import { useI18n } from 'vue-i18n'
	import { useRouter } from 'vue-router'

	export default defineComponent({
		name: 'HomePage',
	})
</script>

<script setup lang="ts">
	const { t } = useI18n()
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
			router.push(RoutePath.CardGame)
		}
	}
</script>
