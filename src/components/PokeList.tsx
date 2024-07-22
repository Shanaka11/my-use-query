import { getPokemon } from '../api/getPokemon';
import { useCache } from '../cache/cache';
import { useQuery } from '../hooks/useQuery';

type Pokemon = {
	name: string;
	url: string;
};

const PokeList = () => {
	const { invalidate } = useCache();
	const {
		data: pokemon,
		isLoading,
		runQuery,
	} = useQuery<Pokemon[]>({
		queryKey: 'pokemon',
		queryFn: getPokemon,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<button onClick={() => runQuery()}>Refetch</button>
			<button onClick={() => invalidate('pokemon')}>Revalidate</button>
			<ul>
				{pokemon && pokemon.map((item) => <li key={item.name}>{item.name}</li>)}
			</ul>
		</>
	);
};

export default PokeList;
