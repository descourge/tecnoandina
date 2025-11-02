import React, { useState, useEffect, useRef } from 'react';
import { usePokemonStore } from '../store/pokedexStore';
import { CSSTransition } from 'react-transition-group';
import { FocusTrap } from 'focus-trap-react';

// Función helper
const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const EditModal: React.FC = () => {
  const {
    editingPokemon,
    closeEditModal,
    editPokemonName,
    dynamicFields,
  } = usePokemonStore();
  
  const [newName, setNewName] = useState('');
  const [error, setError] = useState<string | null>(null); // <-- NUEVO ESTADO
  const nodeRef = useRef(null);

  useEffect(() => {
    if (editingPokemon) {
      setNewName(editingPokemon.name);
      setError(null); // Reseteamos el error al abrir
    }
  }, [editingPokemon]);

  // (useEffect de 'Escape' sin cambios)
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeEditModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeEditModal]);

  // --- LÓGICA DE VALIDACIÓN ---
  const isInvalid = newName.trim() === '';

  const handleConfirm = () => {
    // Si es inválido, muestra error
    if (isInvalid) {
      setError('El nombre no puede estar vacío.');
      return;
    }
    
    // Si es válido, procede
    if (editingPokemon) {
      editPokemonName(editingPokemon.id, newName.trim());
      closeEditModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  const nickname = editingPokemon ? dynamicFields[editingPokemon.id] : null;

  return (
    <CSSTransition
      in={!!editingPokemon}
      timeout={300}
      classNames="modal-fade"
      unmountOnExit
      nodeRef={nodeRef}
      appear
    >
      <FocusTrap active={!!editingPokemon}>
        <div className="modal-overlay" ref={nodeRef} onClick={closeEditModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            
            {editingPokemon && (
              <>
                <img
                  src={editingPokemon.imageUrl}
                  alt={editingPokemon.name}
                  className="modal-image"
                />
                
                <h2 id="modal-title">{capitalize(editingPokemon.name)}</h2>

                {nickname && (
                  <p className="modal-nickname">
                    Tiene un mote, se le conoce como <strong>{nickname}</strong>
                  </p>
                )}
                
                <input
                  type="text"
                  className="modal-input"
                  value={newName}
                  // --- CAMBIO: Limpiamos el error al escribir ---
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (error) setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  aria-invalid={!!error} // Accesibilidad: anuncia que el campo es inválido
                  aria-describedby="modal-error-msg" // Vincula al mensaje de error
                />

                {/* --- NUEVO: Mensaje de error --- */}
                {error && (
                  <p id="modal-error-msg" className="modal-error">
                    {error}
                  </p>
                )}
                
                <div className="modal-actions">
                  <button 
                    className="modal-button confirm" 
                    onClick={handleConfirm}
                    disabled={isInvalid} // <-- Deshabilitado si es inválido
                  >
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
      </FocusTrap>
    </CSSTransition>
  );
};