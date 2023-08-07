import type { AnimalsGameClient } from '@/repository/animals/interfaces/client'

export interface AnimalsGameStore extends AnimalsGameClient.Animals {
	flip: boolean
	completed: boolean
}
