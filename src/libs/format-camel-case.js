function formatCamelCase(text) {
	let words = text.split(/(?=[A-Z])/);
	let formattedString = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

	return formattedString;
}

export { formatCamelCase };
