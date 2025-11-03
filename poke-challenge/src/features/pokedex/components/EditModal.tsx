import React, { useState, useEffect, useRef } from 'react';
import { usePokemonStore } from '../store/pokedexStore';
import { CSSTransition } from 'react-transition-group';
import { FocusTrap } from 'focus-trap-react';

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
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef(null);
  
  const [isTrapActive, setIsTrapActive] = useState(false);

  useEffect(() => {
    if (editingPokemon) {
      setNewName(editingPokemon.name);
      setError(null);
    }
  }, [editingPokemon]);

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

  const isInvalid = newName.trim() === '';

  const handleConfirm = () => {
    if (isInvalid) {
      setError('El nombre no puede estar vacío.');
      return;
    }
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
      nodeRef={overlayRef}
      appear
      onEntered={() => setIsTrapActive(true)}
      onExiting={() => setIsTrapActive(false)}
    >
      <div 
        className="modal-overlay" 
        ref={overlayRef} 
        onClick={closeEditModal}
      >
        <FocusTrap active={isTrapActive}>
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
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (error) setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  aria-invalid={!!error}
                  aria-describedby="modal-error-msg"
                />

                {error && (
                  <p id="modal-error-msg" className="modal-error">
                    {error}
                  </p>
                )}
                
                <div className="modal-actions">
                  <button 
                    className="modal-button confirm" 
                    onClick={handleConfirm}
                    disabled={isInvalid}
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
        </FocusTrap>
      </div>
    </CSSTransition>
  );
};