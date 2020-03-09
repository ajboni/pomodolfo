
import { writable, derived, readable } from 'svelte/store';
import { pomodoro, longBreak, shortBreak } from './modes';
import { ipcRenderer } from 'electron';


export const activeMode = writable(pomodoro);
export let status = writable("stopped");
export const page = writable("main");
export const version = writable(process.env.npm_package_version)


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

ipcRenderer.on("changePage", (event, newPage) => {
	page.set(newPage);
})
