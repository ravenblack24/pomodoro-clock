export default function secondsToMinutes(seconds, includeSeconds) {
	return (includeSeconds)? ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2) : Math.floor(seconds / 60);
} 