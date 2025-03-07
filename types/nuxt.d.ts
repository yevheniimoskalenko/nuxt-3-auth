import { FetchInstance } from 'ofetch'
import { toast } from 'vue3-toastify'
declare module '#app' {
	interface NuxtApp {
		$api: FetchInstance
		$toast: typeof toast
	}
}

declare global {
	const $api: FetchInstance
	const $toast: typeof toast
}

export {}
