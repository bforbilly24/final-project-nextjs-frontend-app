function removeDuplicate(array, key) {
	return array.filter((item, index, self) => self.findIndex((obj) => obj[key] === item[key]) === index);
}

export { removeDuplicate };
