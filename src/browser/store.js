
import { writable, derived, readable, get } from 'svelte/store';
import { pomodoro, longBreak, shortBreak } from './modes';
import { ipcRenderer } from 'electron';
import moment from 'moment'
import Timer from 'tiny-timer'

export let activeMode = writable(pomodoro);
export let status = writable("stopped");
export const page = writable("main");
export const nextMode = writable(shortBreak);
export const version = writable(process.env.npm_package_version)
export let clock = writable(pomodoro.minutes * 60 * 1000)
let runs = 0;

export let stringClock = derived(clock, $clock => {
	console.log($clock)
	let milisecs = $clock
	if (milisecs < 0) { milisecs = 0 }
	console.log(milisecs)
	return moment.utc(milisecs).format('mm:ss');
})

let timer = new Timer()
timer.on('tick', (ms) => clock.set(get(clock) - 1000))
timer.on('done', () => onTimerDone())
timer.on('statusChanged', (status) => setStatus(status))

// export const timer = derived(activeMode, $activeMode => {
// 	if (status == "stopped") {
// 		return $activeMode.minutes
// 	}
// });

export function setModeManual(mode) {
	runs = 0;
	setMode(mode)
}

export function setMode(mode) {
	getNextMode(mode);
	timer.stop()
	activeMode.set(mode);
	clock.set(mode.minutes * 60 * 1000)
}

export function startTimer() {

	if (get(status) === "paused") {
		timer.resume()
	}
	else {
		timer.start(get(clock))
	}
}

export function pauseTimer() {
	timer.pause()
	console.log(get(status))
}
export function restartTimer() {
	timer.stop()
	clock.set(get(activeMode).minutes * 60 * 1000)
	setMode(pomodoro)
	runs = 0;

}

function setStatus(newStatus) {
	status.set(newStatus)
}

function onTimerDone() {

	if (get(activeMode) === pomodoro) {
		runs += 1;
	}
	setMode(get(nextMode));
	startTimer();
}

function getNextMode(mode) {
	if (mode !== pomodoro) {
		nextMode.set(pomodoro)
	}
	else {
		if (runs > 0 && runs % 4 === 0) {
			nextMode.set(longBreak)
		}
		else {
			nextMode.set(shortBreak)
		}
	}

}

ipcRenderer.on("changePage", (event, newPage) => {
	page.set(newPage);
})
