import requestBase from '@/repository'
import { animalsGame } from '@/repository/animals/endpoints'
import type { AnimalsGameClient } from '@/repository/animals/interfaces/client'
import type { AnimalsGameApi } from '@/repository/animals/interfaces/api'
import type { RequireAtLeastOne } from '@/interfaces'
import animalsGameMapper from '@/repository/animals/mapper'

export const getAnimals = async (
	payload: AnimalsGameClient.Request,
): Promise<RequireAtLeastOne<AnimalsGameClient.Response>> => {
	const params: AnimalsGameApi.Request = {
		per_page: payload.perPage,
	}

	const response = await requestBase.get<AnimalsGameApi.Response>(animalsGame, {
		params,
	})
	return animalsGameMapper(response.data)
}
