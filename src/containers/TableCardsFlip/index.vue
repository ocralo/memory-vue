<template>
	<ModalComponent :isOpen="isOpenModal" @close="handleCloseModal">
		<template v-slot:title>
			<h4 class="text-lg font-medium uppercase mr-4">
				{{ t('modal.congratulations_win') }}
			</h4>
		</template>
		<template v-slot:content>
			<h5 class="text-lg font-medium mb-2 ml-2">
				{{ t('modal.your_score') }}:
			</h5>
			<section class="mb-6 ml-4">
				<h3 class="text-sm text-rose-600 font-medium uppercase mb-1">
					<span>{{ t('modal.error_points') }}:</span> {{ errorPoints }}
				</h3>

				<h3 class="text-sm text-green-600 font-medium uppercase">
					<span>{{ t('modal.success_points') }}:</span> {{ successPoints }}
				</h3>
			</section>
			<section>
				<button
					@click="handleSuccessModal"
					:title="t('modal.close')"
					type="button"
					class="bg-blue-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-900 transition duration-300 ease-in-out w-full">
					{{ t('modal.close') }}
				</button>
			</section>
		</template>
	</ModalComponent>
	<section
		class="w-full h-full grid place-content-center"
		v-if="promiseState === PromisePending">
		<SpinnerComponent />
	</section>
	<template v-else>
		<aside class="flex justify-center gap-4 mb-6">
			<h3 class="text-xl text-rose-600 font-medium uppercase">
				<span>{{ t('tableCardFlip.error_points') }}:</span> {{ errorPoints }}
			</h3>
			<h3 class="text-slate-900 text-xl font-medium">/</h3>
			<h3 class="text-xl text-green-600 font-medium uppercase">
				<span>{{ t('tableCardFlip.success_points') }}:</span>
				{{ successPoints }}
			</h3>
		</aside>
		<main v-if="animals" class="table-cards-game">
			<CardFlip
				v-for="animal in animals"
				@click="handleFlip(animal)"
				:flip="animal.flip"
				:title="animal.image.alt"
				:disabled="animal.completed"
				:back-card="{
					name: animal.image.alt,
					src: animal.image.url,
				}"
				type="button"
				:key="animal.uuid" />
		</main>
	</template>
</template>

<script lang="ts">
	import { defineComponent, ref, watch } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useAnimalGameStore } from '@/stores/animalsGame'
	import SpinnerComponent from '@/components/Spinner/index.vue'

	import CardFlip from '@/components/CardFlip/index.vue'
	import ModalComponent from '@/components/Modal/index.vue'
	import type { AnimalsGameStore } from '@/stores/interfaces'
	import { useRouter } from 'vue-router'
	import { RoutePath } from '@/router/enum'
	import { useUserStore } from '@/stores/user'

	export default defineComponent({
		name: 'TableCardsFlip',
	})
</script>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n'
	import { PROMISE_STATE } from '@/utils/enums'

	const { t } = useI18n()
	const router = useRouter()

	const PromisePending = PROMISE_STATE.PENDING

	const userStore = useUserStore()
	const { clearUser } = userStore

	const animalStore = useAnimalGameStore()
	const { animalsState, promiseState, errorPoints, successPoints, maxAnimals } =
		storeToRefs(animalStore)
	const {
		obtainAnimals,
		flipAnimalCard,
		addSuccessPoint,
		addErrorPoint,
		completedAnimal,
		resetGame,
	} = animalStore

	const animals = ref(animalsState || null)

	const flippedCards = ref<string[]>([])
	const isOpenModal = ref(false)

	const handleFlip = (animal: AnimalsGameStore) => {
		if (!animal.flip) {
			flippedCards.value.push(animal.uuid)
		} else {
			flippedCards.value = flippedCards.value.filter(
				(uuid) => uuid !== animal.uuid,
			)
		}
		flipAnimalCard(!animal.flip, animal.uuid)
	}

	const restartTwoCards = (
		firstCard: AnimalsGameStore,
		secondCard: AnimalsGameStore,
	) => {
		setTimeout(() => {
			flipAnimalCard(false, firstCard?.uuid)
			flipAnimalCard(false, secondCard?.uuid)
		}, 1000)
	}

	const completedPairs = (uuid: string[]) => {
		for (const id of uuid) {
			completedAnimal(id)
		}
	}

	const flippedTwoCards = (value: string[]) => {
		if (value.length === 2) {
			const [firstCard, secondCard] = value
			const firstAnimal = animals.value?.find(
				(animal) => animal.uuid === firstCard,
			)
			const secondAnimal = animals.value?.find(
				(animal) => animal.uuid === secondCard,
			)
			if (firstAnimal?.slug === secondAnimal?.slug) {
				completedPairs(value)
				addSuccessPoint()
			} else {
				if (firstAnimal?.uuid && secondAnimal?.uuid) {
					restartTwoCards(firstAnimal, secondAnimal)
				}
				addErrorPoint()
			}
			flippedCards.value = []
		}
	}

	const handleCloseModal = () => {
		isOpenModal.value = false
	}

	const handleSuccessModal = () => {
		handleCloseModal()
		clearUser()
		resetGame()
		router.push(RoutePath.Home)
	}

	watch(
		flippedCards,
		(newValue) => {
			flippedTwoCards(newValue)
		},
		{ deep: true },
	)

	watch(successPoints, (newValue) => {
		if (newValue >= maxAnimals.value) {
			isOpenModal.value = true
		}
	})

	obtainAnimals()
</script>

<style src="./_index.scss" scoped />
