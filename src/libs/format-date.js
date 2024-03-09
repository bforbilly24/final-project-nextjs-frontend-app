function formatDate(timestamp) {
	const formattedDate = new Date(timestamp).toISOString();

	return formattedDate;
}

export { formatDate };
