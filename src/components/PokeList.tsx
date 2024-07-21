import { getPokemon } from '../api/getPokemon';
import { useQuery } from '../hooks/useQuery';

type Pokemon = {
	name: string;
	url: string;
};

const PokeList = () => {
	const { data: pokemon, isLoading } = useQuery<Pokemon[]>({
		queryFn: getPokemon,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<button>Refetch</button>
			<ul>
				{pokemon && pokemon.map((item) => <li key={item.name}>{item.name}</li>)}
			</ul>
		</>
	);
};

export default PokeList;
