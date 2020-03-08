export const pomodoro = {
	name: "Pomodoro",
	minutes: 25,
	next: getBreak()
}
export const shortBreak = {
	name: "Short Break",
	minutes: 5,
	next: pomodoro,
};

export const longBreak = {
	name: "Long Break",
	minutes: 10,
	next: pomodoro,
};

function getBreak() {

}


