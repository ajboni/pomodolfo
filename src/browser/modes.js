export const pomodoro = {
	name: "Pomodoro",
	minutes: 0.09,
	next: null
}
export const shortBreak = {
	name: "Short Break",
	minutes: 0.06,
	next: pomodoro,
};

export const longBreak = {
	name: "Long Break",
	minutes: 0.04,
	next: pomodoro,
};


