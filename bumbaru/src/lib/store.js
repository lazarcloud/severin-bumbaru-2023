import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store'
export const forms = persisted('forms', {});
export const cities = persisted('cities', []);