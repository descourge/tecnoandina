import {
  useQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_COUNT = 30;
const CHUNK_SIZE = 5;

interface ApiPokemonListResponse {
  results: {
    name: string;
  }[];
}

interface ApiPokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

interface ApiPokemonSpecies {
  color: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  experience: number;
  height: number;
  weight: number;
  types: string[];
  color: string;
}

const fetchPokemonData = async (
  name: string,
  signal?: AbortSignal
): Promise<Pokemon> => {
  try {
    const [detailsRes, speciesRes] = await Promise.all([
      fetch(`${BASE_URL}/pokemon/${name}`, { signal }),
      fetch(`${BASE_URL}/pokemon-species/${name}`, { signal }),
    ]);

    if (!detailsRes.ok) throw new Error(`Failed to fetch details for ${name}`);
    if (!speciesRes.ok) throw new Error(`Failed to fetch species for ${name}`);

    const details: ApiPokemonDetails = await detailsRes.json();
    const species: ApiPokemonSpecies = await speciesRes.json();

    // --- ⭐ SOLUCIÓN DE IMAGEN OFICIAL (assets.pokemon.com) ⭐ ---
    const paddedId = String(details.id).padStart(3, '0');
    
    // Esta es la URL de los assets oficiales de Pokemon.com
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

    return {
      id: details.id,
      name: details.name,
      imageUrl: imageUrl,
      experience: details.base_experience,
      height: details.height,
      weight: details.weight,
      types: details.types.map((t) => t.type.name),
      color: species.color.name,
    };
  } catch (error) {
    console.error(`Error fetching data for ${name}:`, error);
    throw error;
  }
};

// --- Lógica de Fetching (Principal) ---
const fetchFirst30Pokemon = async ({
  signal,
}: QueryFunctionContext): Promise<Pokemon[]> => {
  const listRes = await fetch(
    `${BASE_URL}/pokemon?limit=${POKEMON_COUNT}&offset=0`,
    { signal }
  );
  if (!listRes.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  const listData: ApiPokemonListResponse = await listRes.json();

  const allPokemonData: Pokemon[] = [];
  const pokemonList = listData.results;

  for (let i = 0; i < pokemonList.length; i += CHUNK_SIZE) {
    const chunk = pokemonList.slice(i, i + CHUNK_SIZE);
    const chunkPromises = chunk.map((p) => fetchPokemonData(p.name, signal));

    try {
      const chunkResults = await Promise.all(chunkPromises);
      allPokemonData.push(...chunkResults);
    } catch (error) {
      console.error('Error fetching chunk', error);
      throw new Error(`Failed to fetch chunk starting at index ${i}`);
    }
  }

  return allPokemonData;
};

/** Hook para obtener la lista de los 30 Pokémon requeridos */
export const usePokemonList = () => {
  return useQuery<Pokemon[], Error>({
    queryKey: ['pokemonList30'],
    queryFn: fetchFirst30Pokemon,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};