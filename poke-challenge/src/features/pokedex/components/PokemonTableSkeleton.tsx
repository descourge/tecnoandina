import React from 'react';

/**
 * Una sola fila falsa (skeleton)
 */
const SkeletonRow: React.FC = () => (
  <tr className="skeleton-row">
    <td><div className="skeleton skeleton-img"></div></td>
    <td><div className="skeleton skeleton-text"></div></td>
    <td><div className="skeleton skeleton-text"></div></td>
    <td><div className="skeleton skeleton-text"></div></td>
    <td><div className="skeleton skeleton-text"></div></td>
    <td><div className="skeleton skeleton-text"></div></td>
    <td><div className="skeleton skeleton-text"></div></td>
    <td><div className="skeleton skeleton-text"></div></td>
  </tr>
);

/**
 * El componente de la tabla skeleton completa
 */
export const PokemonTableSkeleton: React.FC = () => {
  return (
    <table>
      {/* Reusamos el mismo header de la tabla real */}
      <thead
        className="pokedex-header"
        style={
          {
            '--header-color': '#DB3535',
          } as React.CSSProperties
        }
      >
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Tipo(s)</th>
          <th>Experiencia</th>
          <th>Altura</th>
          <th>Peso</th>
          <th>Campo Dinámico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Creamos 10 filas falsas para llenar la vista */}
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <SkeletonRow key={index} />
          ))}
      </tbody>
    </table>
  );
};