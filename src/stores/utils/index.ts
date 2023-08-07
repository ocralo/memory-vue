import type { AnimalsGameStore } from '@/stores/interfaces'

export const duplicateAnimals = (
	arr: AnimalsGameStore[],
): AnimalsGameStore[] => {
	const auxArray = []
	for (let i = 0; i < arr.length; i++) {
		auxArray.push({ ...arr[i], uuid: `${arr[i].uuid}-2` })
	}
	return [...arr, ...auxArray]
}
