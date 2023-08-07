export namespace AnimalsGameClient {
	export interface Request {
		perPage: number
	}

	export interface Response {
		animals?: Animals[]
		error?: any
	}

	export interface Animals {
		slug: string
		image: Image
		uuid: string
		locale: string
	}

	export interface Image {
		url: string
		alt: string
		contentType: string
	}
}
