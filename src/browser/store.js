
import { writable, derived, readable, get } from 'svelte/store';
import { pomodoro, longBreak, shortBreak } from './modes';
import { ipcRenderer } from 'electron';
import moment from 'moment'
import Timer from 'tiny-timer'
import { settings } from './settings';

export let activeMode = writable(pomodoro);
export let status = writable("stopped");
export const page = writable("main");
export const nextMode = writable(shortBreak);
export const version = writable(process.env.npm_package_version)
export let clock = writable(Math.round(pomodoro.minutes() * 60 * 1000))


let runs = 0;
let elapsed = writable(0);


// export let clock = derived(settings, $settings => {
// 	return (get(activeMode).minutes() * 60 * 1000) - get(elapsed);
// })

export let percentDone = writable(0)

export let stringClock = derived(clock, $clock => {
	let milisecs = $clock
	if (milisecs < 0) { milisecs = 0 }
	let format = "mm:ss";
	if (milisecs >= 60 * 60 * 1000) {
		format = "HH:mm:ss"
	}
	if (milisecs >= 24 * 60 * 60 * 1000) {
		milisecs = 24 * 60 * 60 * 1000 - 1000;
	}
	return moment.utc(milisecs).format(format);
})

console.log(pomodoro.minutes());

let timer = new Timer()
timer.on('tick', (ms) => {
	// console.log(get(clock))
	clock.set(get(clock) - 1000)
	let totalTime = Math.round(get(activeMode).minutes() * 60 * 1000)
	let percent = ((totalTime - get(clock)) * 100) / totalTime;
	percent = Math.round(percent);
	if (percent >= 100) {
		percent = 100;
	}
	percentDone.set(percent);
});

timer.on('done', () => onTimerDone())
timer.on('statusChanged', (status) => setStatus(status))

export function setModeManual(mode) {
	runs = 0;
	setMode(mode)
}

export function setMode(mode) {
	getNextMode(mode);
	timer.stop()
	activeMode.set(mode);
	clock.set(Math.round(mode.minutes() * 60 * 1000))
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
	clock.set(Math.round(get(activeMode).minutes() * 60 * 1000))
	setMode(pomodoro)
	runs = 0;
}

function setStatus(newStatus) {
	status.set(newStatus)
}

function onTimerDone() {
	// remote show window
	if (getSetting("SHOW_APP_ON_NOTIFICATION").value) {
		ipcRenderer.send("showMainWindow");
	}

	// Play sound
	if (getSetting("AUDIO_NOTIFICATIONS").value) {
		let bell = new Audio();
		bell.src = 'bell.ogg';
		bell.play()
	}

	// Show Desktop notification.
	if (getSetting("DESKTOP_NOTIFICATIONS")) {
		let notificationTitle = ""
		let notificationBody = ""

		switch (get(nextMode)) {
			case pomodoro:
				notificationTitle = 'Pomodoro Started';
				notificationBody = 'Time to work!';
				break;
			case shortBreak:
				notificationTitle = 'Short Break';
				notificationBody = 'Stretchyour body, walk a little. Drink water.';
				break;
			case longBreak:
				notificationTitle = 'Long Break';
				notificationBody = 'Good work! Time to get some coffee.';
				break;
			default:
				break;
		}

		let myNotification = new Notification(notificationTitle, {
			body: notificationBody

		})
	}

	if (get(activeMode) === pomodoro) {
		runs += 1;
	}
	console.log(runs)
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
	setPage(newPage)
})

export function setPage(newPage) {
	page.set(newPage);
}

function getSetting(id) {
	const obj = get(settings).find(x => x.id === id)
	return obj
}