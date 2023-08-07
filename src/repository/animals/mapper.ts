import type { AnimalsGameClient } from '@/repository/animals/interfaces/client'
import type { AnimalsGameApi } from '@/repository/animals/interfaces/api'
import type { RequireAtLeastOne } from '@/interfaces'

export default (
	data: AnimalsGameApi.Response,
): RequireAtLeastOne<AnimalsGameClient.Response> => {
	try {
		const animals: AnimalsGameClient.Animals[] = data.entries.map((entry) => {
			return {
				slug: entry.meta.slug,
				image: {
					url: entry.fields.image.url,
					alt: entry.fields.image.alt_text,
					contentType: entry.fields.image.content_type,
				},
				uuid: entry.meta.uuid,
				locale: entry.meta.locale,
			}
		})
		return { animals }
	} catch (error) {
		return { error }
	}
}
