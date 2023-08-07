import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAnimals } from '@/repository/animals'
import { PROMISE_STATE } from '@/utils/enums'
import type { AnimalsGameStore } from '@/stores/interfaces'
import { duplicateAnimals } from '@/stores/utils'
import { shuffleArray } from '@/utils'

export const useAnimalGameStore = defineStore('animals', () => {
	const animalsState = ref<AnimalsGameStore[] | null>(null)
	const promiseState = ref<PROMISE_STATE>(PROMISE_STATE.IDLE)
	const errorState = ref<any | null>(null)
	const successPoints = ref<number>(0)
	const errorPoints = ref<number>(0)
	const maxAnimals = ref<number>(4)

	const obtainAnimals = async (): Promise<void> => {
		promiseState.value = PROMISE_STATE.PENDING
		try {
			const response = await getAnimals({ perPage: maxAnimals.value })

			const animalsFlip = response?.animals?.map((animal) => ({
				...animal,
				flip: false,
				completed: false,
			}))

			if (animalsFlip) {
				const animalsDuplicate = duplicateAnimals(animalsFlip)
				const animalsShuffle = shuffleArray(animalsDuplicate)

				animalsState.value = animalsShuffle
				promiseState.value = PROMISE_STATE.RESOLVED
			} else {
				animalsState.value = null
				promiseState.value = PROMISE_STATE.REJECTED
			}
		} catch (error) {
			promiseState.value = PROMISE_STATE.REJECTED
			animalsState.value = null
			errorState.value = error
		}
	}

	const flipAnimalCard = (flag: boolean, id: string): void => {
		if (animalsState.value && Array.isArray(animalsState.value)) {
			const index = animalsState.value.findIndex((animal) => animal.uuid === id)
			if (index >= 0) animalsState.value[index].flip = flag
		}
	}

	const resetGame = (): void => {
		animalsState.value = null
		promiseState.value = PROMISE_STATE.IDLE
		errorState.value = null
		successPoints.value = 0
		errorPoints.value = 0
	}

	const addSuccessPoint = (): void => {
		successPoints.value += 1
	}

	const addErrorPoint = (): void => {
		errorPoints.value += 1
	}

	const completedAnimal = (id: string): void => {
		if (animalsState.value && Array.isArray(animalsState.value)) {
			const index = animalsState.value.findIndex((animal) => animal.uuid === id)
			if (index >= 0) animalsState.value[index].completed = true
		}
	}

	const setMaxAnimals = (max: number): void => {
		maxAnimals.value = max
		resetGame()
	}

	return {
		animalsState,
		maxAnimals,
		errorState,
		promiseState,
		successPoints,
		errorPoints,
		obtainAnimals,
		flipAnimalCard,
		resetGame,
		addSuccessPoint,
		addErrorPoint,
		completedAnimal,
		setMaxAnimals,
	}
})
