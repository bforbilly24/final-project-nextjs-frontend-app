import { create } from "zustand";

const useStore = create((set) => ({
	activeFilterFocus: "name",
	setActiveFilterFocus: (event) => set(() => ({ activeFilterFocus: event })),
}));

export { useStore };
