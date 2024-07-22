import { create } from 'zustand';

type Cache = {
	data: Record<string, unknown>;
	setData: (key: string, value: unknown) => void;
	invalidate: (key: string) => void;
};

export const useCache = create<Cache>((set) => ({
	data: {},
	setData: (key, value) =>
		set((state) => {
			state.data[key] = value;
			return { data: state.data };
		}),
	invalidate: (key) =>
		set((state) => {
			delete state.data[key];
			return { data: state.data };
		}),
}));
