import { settings } from "./settings.js";
import { writable, derived, readable, get } from 'svelte/store';

export const pomodoro = {
	name: "Pomodoro",
	minutes: function () {
		return get(settings).find(x => x.caption === "Pomodoro").value
	},
	next: null
}
export const shortBreak = {
	name: "Short Break",
	minutes: function () {
		return get(settings).find(x => x.caption === "Short Break").value
	},
	next: pomodoro,
};

export const longBreak = {
	name: "Long Break",
	minutes: function () {
		return get(settings).find(x => x.caption === "Long Break").value
	},
	next: pomodoro,
};


