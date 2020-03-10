export const pomodoro = {
	name: "Pomodoro",
	minutes: 25,
	next: null
}
export const shortBreak = {
	name: "Short Break",
	minutes: 0.083333333,
	next: pomodoro,
};

export const longBreak = {
	name: "Long Break",
	minutes: 0.083333333,
	next: pomodoro,
};


