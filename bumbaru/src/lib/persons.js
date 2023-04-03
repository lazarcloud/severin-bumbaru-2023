import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store'
export const persons = persisted('persons', []);
export const presents = persisted('present', []);
export const speakers = persisted('speakers', []);
export const menus = persisted('menus', {
    present: false,
    yield: false,
});