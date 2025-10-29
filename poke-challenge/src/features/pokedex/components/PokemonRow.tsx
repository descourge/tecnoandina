import React, { useState } from 'react';
import { type Pokemon } from '../api/pokemonApi';
import { usePokemonStore } from '../store/pokedexStore';

interface PokemonRowProps {
  pokemon: Pokemon;
}

// Función helper para capitalizar (ej: "bulbasaur" -> "Bulbasaur")
const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
  // --- 1. Store ---
  const {
    setSelectedColor,
    deletePokemon,
    editPokemonName,
    dynamicFields,
    setDynamicField,
  } = usePokemonStore();

  // --- 2. Estado local ---
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(pokemon.name);

  // --- 3. Handlers ---
  const handleRowClick = () => {
    setSelectedColor(pokemon.color);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePokemon(pokemon.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditing) {
      editPokemonName(pokemon.id, editedName);
    }
    setIsEditing(!isEditing);
  };

  const handleDynamicFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDynamicField(pokemon.id, e.target.value);
  };

  // --- 4. Lógica de Renderizado ---

  // <-- ⭐ CAMBIO: Lógica de estilo corregida
  // 1. Obtener la última letra del nombre, en minúscula
  const lastLetter = pokemon.name.toLowerCase().slice(-1);

  // 2. Comparar alfabéticamente. Si es menor que 'm' (a-l), se aplica el estilo.
  const rowStyle =
    lastLetter < 'm'
      ? { backgroundColor: '#7faee3' }
      : {};
  // Fin del cambio -->

  const dynamicFieldValue = dynamicFields[pokemon.id] ?? '';

  return (
    <tr
      onClick={handleRowClick}
      style={rowStyle} // <-- Aplicamos el estilo corregido
      className="pokemon-row"
    >
      {/* Columna: Imagen */}
      <td>
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width="50"
          height="50"
        />
      </td>

      {/* Columna: Nombre (Editable) */}
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <span>{capitalize(pokemon.name)}</span>
        )}
      </td>

      {/* Columna: Tipos */}
      <td>{pokemon.types.map(capitalize).join(', ')}</td>

      {/* Columna: Experiencia */}
      <td>{pokemon.experience}</td>

      {/* Columna: Altura */}
      <td>{(pokemon.height / 10).toFixed(1)}m</td>

      {/* Columna: Peso */}
      <td>{(pokemon.weight / 10).toFixed(1)}kg</td>

      {/* Columna: Campo Dinámico (Persistido) */}
      <td>
        <input
          type="text"
          placeholder="Añadir apodo..."
          value={dynamicFieldValue}
          onChange={handleDynamicFieldChange}
          onClick={(e) => e.stopPropagation()}
        />
      </td>

      {/* Columna: Acciones */}
      <td>
        <button onClick={handleEditClick}>
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
        <button onClick={handleDeleteClick} style={{ marginLeft: '5px' }}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};