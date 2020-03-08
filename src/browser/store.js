
import { writable, derived } from 'svelte/store';
import { pomodoro, longBreak, shortBreak } from './modes'
export const activeMode = writable(pomodoro);
export let status = writable("stopped");
export const page = writable("main");

export const timer = derived(activeMode, $activeMode => {
	if (status == "stopped") {
		return $activeMode.minutes
	}
});

export function changeMode(mode) {
	setStatus("stopped")
	$activeMode = mode;
}


function restartTimer() {

}

function setStatus(status) {
	status = status;
}


