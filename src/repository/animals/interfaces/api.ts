export namespace AnimalsGameApi {
	export interface Request {
		per_page: number
	}

	export interface Response {
		entries: Entry[]
		meta: MetaResponse
	}

	export interface Entry {
		meta: MetaEntry
		fields: Fields
	}

	export interface MetaEntry {
		name: string
		slug: string
		tags: any[]
		type: string
		uuid: string
		space: string
		author: Author
		locale: string
		excerpt: string
		private: boolean
		targets: any[]
		category: any
		created_at: string
		updated_at: string
		published_at: string
		unpublish_at: any
		version_type: string
		category_name: any
		category_slug: any
		available_locales: string[]
	}

	export interface Author {}

	export interface Fields {
		image: Image
	}

	export interface Image {
		url: string
		tags: any[]
		uuid: string
		title: string
		alt_text: any
		description: any
		content_type: string
	}

	export interface MetaResponse {
		total_entries: number
		per_page: number
		current_page: number
		total_pages: number
	}
}
