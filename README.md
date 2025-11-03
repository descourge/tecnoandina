
# Desafío Técnico PokéChallenge - Luis Faúndez

El presente proyecto es un trabajo realizado utilizando React + Vite escrito en Typescript para el desafío técnico de la empresa **Tecnoandina** entregado el día **27 de octubre de 2025**. El objetivo era crear un sitio que se alimenta de la PokéAPI para almacenar y mostrar la información requerida, teniendo en cuenta requerimientos técnicos que velan por el correcto funcionamiento y el uso eficiente de los recursos del usuario. Para el desarrollo de este proyecto se utilizó como apoyo **Gemini Pro** para la estructuración del proyecto, generación de códigos genéricos, consultas técnicas y documentación requerida para los requisitos técnicos de los que no se tenía dominio antes de comenzar, a continuación se adjuntan los enlaces de las conversaciones:

* https://gemini.google.com/share/c263939e823a

* https://gemini.google.com/share/444681c009f6

## 📝 Comentarios iniciales:
* No hay uso de Inteligencia Artificial en la redacción de este documento por decisión personal.
* Hubo un problema con las imágenes de la PokéAPI debido a restricciones de github; debido a un error 429 se utilizaron las imágenes oficiales de Pokémon para recrear el efecto deseado utilizando el respectivo ID del Pokémon ya que no era posible utilizar las imágenes de la API:
![Error 429](https://i.imgur.com/faHW6h3.png)
* La mitad de las librerías son nuevas para mí, por lo que gran parte del desafío fue estudiarlas e implementarlas correctamente.

## ✨ Funcionalidades implementadas:
* 🔠 Orden alfabético de Pokémon (se puede ordenar con el boton de A->Z).
* 🎨 Filas clickeables para cambiar el color del <thead> según el color del Pokémon (leído desde la API).
* ♿️ Accesibilidad: áreas importantes identificadas por ARIA roles + movimiento por teclado.
* 🔵 Fila coloreada de color azul si el nombre termina con una letra anterior a "m".
* ✏️ Botón para editar el nombre del Pokémon (se abre un modal con animación de entrada y salida, validación de formulario).
* 🗑️ Botón para eliminar el Pokémon (incluye animación suave).
* 🏷️ Campo dinámico para darle un apodo al Pokémon (incluye mensaje en el modal de 'Editar' si el Pokémon tiene un apodo).
* 🔍 Barra de búsqueda que permite filtrar por Nombre o Tipo(s).
* 🔢 Al final de la tabla hay un contador de la cantidad de filas que se están mostrando.
* ⏳ Lazy Skeleton al entrar al sitio antes de que se haga el fetch a la API.
* ☀️/🌙 **Adicional:** Se implementó un botón para cambiar entre la versión Light y Dark del sitio, representados con un Solrock y Lunatone respectivamente, para encajar en la temática. Existe una animación en el :hover sólo para versión Desktop.
![ThemeToggle](https://i.imgur.com/Ud3FShy.png)
* 📱/🖥️ **Responsividad:** Para mostrar la información de forma más cómoda en la versión móvil, se implementó una tabla híbrida donde las primeras 2 columnas (Imagen y Nombre) son estáticas, mientras que el resto de las columnas permiten un scroll horizontal para no perder de vista el Pokémon al que corresponde la información.

## 🛠️ Tecnologías utilizadas:
* **Framework:** React + Vite (Typescript)
* **Gestión de estados:** React Query
* **Client State:** Zustand
* **Librerías:** react-icons, react-transition-group, focus-trap-react

## 💾 Instalación:
1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/descourge/tecnoandina.git
    ```
2.  **Navegar al directorio:**
    ```bash
    cd poke-challenge
    ```
3.  **Instalar dependencias:**
    ```bash
    npm install
    ```
4.  **Ejecutar el proyecto:**
    ```bash
    npm run dev
    ```

## 📖 Storybook:
Adicionalmente, se configuró un Storybook que muestra los componentes reutilizables presentes en el proyecto:
* EditModal: Modal que incluye la información de la fila seleccionada, además de un campo que permite editar el 'Nombre' del Pokémon junto a los botones de Confirmar y Cancelar.
* PokemonTableSkeleton: Estructura de Lazy Loading utilizada para rellenar la tabla mientras se hace fetch de la data.
* SearchBar: Barra de búsqueda.
* ThemeToggle: Botón interactivo que realiza el cambio de tema entre Light y Dark.
El Storybook puede ser revisado con el siguiente comando:

```
npm run storybook
```