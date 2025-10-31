import React from 'react'; // <-- Quitamos useState
import { type Pokemon } from '../api/pokemonApi';
import { usePokemonStore } from '../store/pokedexStore';
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSave, // <-- Ya no necesitamos AiOutlineSave
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
  // --- Quitamos isEditing y editPokemonName de aquí ---
  const {
    setSelectedColor,
    deletePokemon,
    dynamicFields,
    setDynamicField,
    openEditModal, // <-- AÑADIMOS ESTO
  } = usePokemonStore();

  // --- Quitamos el estado local [isEditing, setIsEditing] ---

  // 1. Handlers
  const handleRowClick = () => setSelectedColor(pokemon.color);
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePokemon(pokemon.id);
  };

  // --- CAMBIAMOS EL HANDLER DE EDITAR ---
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openEditModal(pokemon); // <-- Solo abre el modal
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
      <td>
        <div className="cell-wrapper">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            width="50"
            height="50"
          />
        </div>
      </td>

      {/* --- CAMBIO: Celda "Nombre" (Simplificada) --- */}
      <td>
        <div className="cell-wrapper">
          {/* Ya no hay condicional, solo el span */}
          <span>{capitalize(pokemon.name)}</span>
        </div>
      </td>
      {/* --- FIN CAMBIO --- */}

      <td>
        <div className="cell-wrapper">
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {pokemon.types.map((type) => (
              <span
                key={type}
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
            className="dynamic-field-input"
            placeholder="Añadir apodo..."
            value={dynamicFieldValue}
            onChange={handleDynamicFieldChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </td>
      <td>
        <div
          className="cell-wrapper"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          {/* --- CAMBIO: Botón de Editar (Simplificado) --- */}
          <button
            className="icon-button edit"
            onClick={handleEditClick}
            aria-label="Editar"
          >
            <AiOutlineEdit /> {/* Ya no cambia a "Guardar" */}
          </button>
          {/* --- FIN CAMBIO --- */}
          <button
            className="icon-button delete"
            onClick={handleDeleteClick}
            aria-label="Eliminar"
          >
            <AiOutlineDelete />
          </button>
        </div>
      </td>
    </tr>
  );
});