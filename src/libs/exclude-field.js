function excludeField(entries, keys) {
	return Object.fromEntries(Object.entries(entries).filter(([key]) => !keys.includes(key)));
}

export { excludeField };
