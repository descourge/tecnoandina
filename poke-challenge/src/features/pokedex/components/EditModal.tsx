import React, { useState, useEffect, useRef } from 'react';
import { usePokemonStore } from '../store/pokedexStore';
import { CSSTransition } from 'react-transition-group';

// Función helper
const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const EditModal: React.FC = () => {
  const { editingPokemon, closeEditModal, editPokemonName } = usePokemonStore();
  const [newName, setNewName] = useState('');
  const nodeRef = useRef(null);

  useEffect(() => {
    if (editingPokemon) {
      setNewName(editingPokemon.name);
    }
  }, [editingPokemon]);

  const handleConfirm = () => {
    if (newName.trim() && editingPokemon) {
      editPokemonName(editingPokemon.id, newName.trim());
      closeEditModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <CSSTransition
      in={!!editingPokemon}
      timeout={300}
      classNames="modal-fade"
      unmountOnExit
      nodeRef={nodeRef}
      appear // <-- AÑADE ESTA LÍNEA
    >
      <div className="modal-overlay" ref={nodeRef} onClick={closeEditModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          
          {editingPokemon && (
            <>
              <img
                src={editingPokemon.imageUrl}
                alt={editingPokemon.name}
                className="modal-image"
              />
              
              <h2>{capitalize(editingPokemon.name)}</h2>
              
              <input
                type="text"
                className="modal-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              
              <div className="modal-actions">
                <button className="modal-button confirm" onClick={handleConfirm}>
                  Confirmar
                </button>
                <button className="modal-button cancel" onClick={closeEditModal}>
                  Cancelar
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </CSSTransition>
  );
};