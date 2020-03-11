import { writable } from './storage'
export const settings = writable('settings', [
	{
		caption: "Enable desktop notifications.",
		value: true,
		help: "Enables a popup on the screen whenever a new period starts.",
		type: "checkbox",
	},
	{
		caption: "Show app on notification.",
		value: true,
		help: "Brings the windows on top whenever a new period starts.",
		type: "checkbox"
	},
	{
		caption: "Enable audio notifications.",
		value: true,
		help: "Plays a sound whenever a new period starts.",
		type: "checkbox",
	},
	{
		caption: "Volume",
		value: 80,
		help: "Audio notification volume.",
		type: "slider",
		depends_on: "Enable audio notifications."
	},
	{
		caption: "Pomodoro",
		value: 25,
		help: "Length in minutes of the podomoro. (Default 25)",
		type: "input",
		icon: "fa fa-clock"
	},
	{
		caption: "Short Break",
		value: 5,
		help: "Time in minutes of the short break. After each pomodoro. (Default 5)",
		type: "input",
		icon: "fa fa-walking"

	},
	{
		caption: "Long Break",
		value: 15,
		help: "Time in minutes of the long break. Every 4 pomodoros. (Default 15)",
		type: "input",
		icon: "fa fa-coffee"
	}

]);

