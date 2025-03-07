import { FetchInstance } from 'ofetch'
declare module '#app' {
	interface NuxtApp {
		$api: FetchInstance
	}
}

declare global {
	const $api: FetchInstance
}

export {}
