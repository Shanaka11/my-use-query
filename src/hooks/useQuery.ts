import { useEffect, useState } from 'react';

type useQueryProps<TResponse> = {
	queryFn: () => Promise<TResponse>;
};

export const useQuery = <TResponse>({ queryFn }: useQueryProps<TResponse>) => {
	const [data, setData] = useState<TResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const runQuery = async () => {
		setIsLoading(true);
		const response = await queryFn();
		setData(response);
		setIsLoading(false);
	};

	useEffect(() => {
		runQuery();
		// This should only run once
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, isLoading, runQuery };
};
