import { useEffect, useState } from 'react';
import { getPokemon } from '../api/getPokemon';

type Pokemon = {
	name: string;
	url: string;
};

const PokeList = () => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);

	useEffect(() => {
		const fetchdata = async () => {
			const response = await getPokemon();
			setPokemon(response);
		};

		if (pokemon.length === 0) {
			fetchdata();
		}
	}, [pokemon]);

	return (
		<>
			<button>Refetch</button>
			<ul>
				{pokemon.map((item) => (
					<li key={item.name}>{item.name}</li>
				))}
			</ul>
		</>
	);
};

export default PokeList;
