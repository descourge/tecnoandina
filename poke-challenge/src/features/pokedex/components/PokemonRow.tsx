import React, { useState } from 'react';
import { type Pokemon } from '../api/pokemonApi';
import { usePokemonStore } from '../store/pokedexStore';
// --- CAMBIO: Importamos de 'ai' (Ant Design) en lugar de 'fa' ---
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSave,
} from 'react-icons/ai';

interface PokemonRowProps {
  pokemon: Pokemon;
}

const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const PokemonRow = React.forwardRef<
  HTMLTableRowElement,
  PokemonRowProps
>(({ pokemon }, ref) => {
  // 1. Hooks y Handlers (sin cambios)
  const {
    setSelectedColor,
    deletePokemon,
    editPokemonName,
    dynamicFields,
    setDynamicField,
  } = usePokemonStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(pokemon.name);
  const handleRowClick = () => setSelectedColor(pokemon.color);
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

  // 2. Lógica de Estilo (sin cambios)
  const lastLetter = pokemon.name.toLowerCase().slice(-1);
  const rowStyle =
    lastLetter < 'm'
      ? { backgroundColor: '#7faee3' }
      : {};
  const dynamicFieldValue = dynamicFields[pokemon.id] ?? '';

  // 3. Renderizado
  return (
    <tr
      ref={ref}
      onClick={handleRowClick}
      style={rowStyle}
      className="pokemon-row"
    >
      {/* --- Contenido de celdas (sin cambios) --- */}
      <td>
        <div className="cell-wrapper">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            width="64"
            height="64"
          />
        </div>
      </td>
      <td>
        <div className="cell-wrapper">
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
        </div>
      </td>
      <td>
        <div className="cell-wrapper">
          {/* Añadimos un contenedor flex para los chips */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {pokemon.types.map((type) => (
              <span
                key={type}
                // Añadimos una clase base y una clase específica del tipo
                className={`type-chip type-${type}`}
              >
                {capitalize(type)}
              </span>
            ))}
          </div>
        </div>
      </td>
      <td>
        <div className="cell-wrapper">{pokemon.experience}</div>
      </td>
      <td>
        <div className="cell-wrapper">
          {(pokemon.height / 10).toFixed(1)} m.
        </div>
      </td>
      <td>
        <div className="cell-wrapper">
{(pokemon.weight / 10).toFixed(1)} kg.
        </div>
      </td>
      <td>
        <div className="cell-wrapper">
          <input
            type="text"
            placeholder="Añadir apodo..."
            value={dynamicFieldValue}
            onChange={handleDynamicFieldChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </td>

      {/* --- Columna de Acciones (Iconos cambiados) --- */}
      <td>
        <div
          className="cell-wrapper"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          {/* Botón de Editar/Guardar */}
          <button
            className="icon-button edit"
            onClick={handleEditClick}
            aria-label={isEditing ? 'Guardar' : 'Editar'}
          >
            {/* --- CAMBIO --- */}
            {isEditing ? <AiOutlineSave /> : <AiOutlineEdit />}
          </button>

          {/* Botón de Eliminar */}
          <button
            className="icon-button delete"
            onClick={handleDeleteClick}
            aria-label="Eliminar"
          >
            {/* --- CAMBIO --- */}
            <AiOutlineDelete />
          </button>
        </div>
      </td>
    </tr>
  );
});