import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store'
export const forms = persisted('forms', {
    departureTime: '08:00',
});
export const cities = persisted('cities', []);