import { useEffect, useState } from 'react';
import { useCache } from '../cache/cache';

type useQueryProps<TResponse> = {
	queryKey: string;
	queryFn: () => Promise<TResponse>;
};

export const useQuery = <TResponse>({
	queryKey,
	queryFn,
}: useQueryProps<TResponse>) => {
	const [data, setData] = useState<TResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { data: cachedData, setData: setCachedData } = useCache();

	const runQuery = async () => {
		console.log('runQuery');
		console.log(cachedData);
		if (queryKey in cachedData) {
			setData(cachedData[queryKey] as TResponse);
		} else {
			setIsLoading(true);
			const response = await queryFn();
			setData(response);
			setCachedData(queryKey, response);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		runQuery();
		// This should only run once
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, isLoading, runQuery };
};
