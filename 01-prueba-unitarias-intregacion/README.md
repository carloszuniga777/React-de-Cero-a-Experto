<!-- 
      ---------------------------------------
      Test usando React + Vite con Typescript
      ---------------------------------------
      Configuracion de Vitest Y Testing Library para realizar pruebas unitarias:
 
  1. Instalar Vitest: 
    
      npm install -D vitest
  

  2. En el package.json agregar:
   {
    "scripts": {
      "test": "vitest"
    }
   }


   3. crear un archivo prueba Random.Test.ts (Puede ser cualquier nombre) y colocar:

      import { describe, it, expect } from 'vitest';

      describe('basic arithmetic checks', () => {
        it('1 + 1 equals 2', () => {
          expect(1 + 1).toBe(2);
        });

        it('2 * 2 equals 4', () => {
          expect(2 * 2).toBe(4);
        });
      });

    
    3.1 Ejecutar: npm run test

     Si todo es correcto, su prueba debería pasar. No debería ver ningún error en su terminal, y todo debería estar en verde 😀.


   
   4. instalar Testing Library y jsdom:

      npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom 
                @testing-library/jest-dom @testing-library/user-event jsdom    




    5. En mi caso no realice la configuracion en vite.config.ts debido a un error en Typescript y algunas dependencias,
       mi solucion fue crear un archivo en la raiz vitest.confing.ts copiar el siguiente codigo:

       /vitest.confing.ts:

       import { defineConfig, mergeConfig } from 'vitest/config'
       import viteConfig from './vite.config.ts'

      export default mergeConfig(viteConfig, defineConfig({
        test: {
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/vitest.setup.ts',
        },
      }))
    



     6. Crear un archivo en el directorio src/vite.setup.ts y agregar el siguiente codigo:

        src/vitest.setup.ts:

        import { expect, afterEach } from 'vitest';
        import { cleanup } from '@testing-library/react';
        import * as matchers from '@testing-library/jest-dom/matchers';

        expect.extend(matchers);

        afterEach(() => {
          cleanup();
        });



    7. También necesitamos agregar el siguiente código a nuestro archivo tsconfig.app.json, lo que nos permite usar las funciones globales de Vitest como describe, it y expect sin necesidad de importarlas explícitamente. 

       tsconfig.app.json:

       {
          "compilerOptions": {
            "types": ["vitest/globals", "@testing-library/jest-dom"]
          }
        }




      8. Probando nuestros componente en react.

      8.1 Creando un componente random para realizar las pruebas:

      src/Components/RandomTest/RandomTest.tsx:

        const Random = () => {
          return <div>Random Component</div>;
        };
        export default Random; 




       8.2 Creando el archivo para realizar las pruebas unitaria del componente:

       src/Components/RandomTest/Random.test.tsx:  

        import { describe, it, expect } from 'vitest'
        import { render, screen } from '@testing-library/react'
        import RandomTest from './RandomTest'

        describe('Random Component', () => {
          it('renders correctly', () => {
            render(<RandomTest/>)
            screen.debug() // Logs the DclearOM structure
            const element = screen.getByText('Random Component')
            expect(element).toBeInTheDocument()
          })
        })


       8.3 Ejecutar npm run test 


       9. (Opcional) Instalar la version vites ui para visualizar todos los test

        npm i -D @vitest/ui

       9.1. Modificar el package.json y agregar el flag --ui: 
              
               vitest --ui

      Asi:

        package.json:

        "scripts": {
          "test": "vitest --ui"
        }


        9.2. Ejecutar: 
            
              npm test 
        
        Se abrira una pagina web con todos los tests



 Fuentes: https://johnsmilga.com/articles/2024/10/15
          https://github.com/john-smilga/vite-ts-vitest-react-testing-library-template
 
      
      --------------------------------
      Test usando React + Vite con Javascript
      --------------------------------


    1. Instalar Vitest:
        pnpm add -D vitest

    2. En el package.json agregar:
    {
        "scripts": {
        "test": "vitest"
        }
    }

    3. crear un archivo prueba Random.Test.ts (Puede ser cualquier nombre) y colocar:

      import { describe, it, expect } from 'vitest';

      describe('basic arithmetic checks', () => {
        it('1 + 1 equals 2', () => {
          expect(1 + 1).toBe(2);
        });

        it('2 * 2 equals 4', () => {
          expect(2 * 2).toBe(4);
        });
      });

    
    3.1 Ejecutar: pnpm run test   
    
     Si todo es correcto, su prueba debería pasar. No debería ver ningún error en su terminal, y todo debería estar en verde 😀. 


    4. instalar Testing Library y jsdom:

    pnpm add --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom @testing-library/jest-dom @testing-library/user-event jsdom 


    5. Crear archivo setupTest.js en la carpeta src que importe los ficheros:
         
     src/setupTests.js:

        import '@testing-library/jest-dom'
       

    6. Agregar el test en el archivo vite.config.js

        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'

        export default defineConfig({
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTests.js',
            css: true,
        },
        })

     
     7. (Opcional) Habilitar para que Vite reconozca variables globales {describe, it, expect, etc.}   

     Nota: En el paso anterior (paso 6) se configuro en el archivo vite.config.js la opcion "globals: true" dentro del bloque de configuración de pruebas, por lo que ya no se necesita importar explicitamente las funciones de vites {describe, it, expect, etc.}. 
     
     Sin embargo, el Eslint marcara error al quitar sus importaciones (aunque siempre funcione el test). Por lo que se tiene que instalar el plugin de vites en Eslint

      
      7.1 Seguir los pasos de la libreria eslint-plugin-vitest https://github.com/vitest-dev/eslint-plugin-vitest:

          instalar:
                  pnpm install @vitest/eslint-plugin --save-dev

      7.2 Actualizar eslint.config.js: Modifica tu archivo eslint.config.js para incluir el entorno de Vitest (vitest/globals) y el plugin correspondiente. Aquí está la versión ajustada de tu configuración: 


          Configuraciones que se agregaron al archivo eslint.config.js:

          7.2.1 se agrego esta configuracion tomada del la libreria @vitest/eslint-plugin

          import vitest from "@vitest/eslint-plugin";

            export default [
              {
                files: ["tests/**"], // or any other pattern
                plugins: {
                  vitest
                },

                settings: {
                  vitest: {
                    typecheck: true
                  }
                },
                languageOptions: {
                  globals: {
                    ...vitest.environments.env.globals,
                  },
                },
              },
            ];  




        Quedando de esta manera:

        eslint.config.js:
        
        import js from '@eslint/js'
        import globals from 'globals'
        import react from 'eslint-plugin-react'
        import reactHooks from 'eslint-plugin-react-hooks'
        import reactRefresh from 'eslint-plugin-react-refresh'
        import vitest from "@vitest/eslint-plugin";


        export default [
          { ignores: ['dist'] },
          {
            files: ['**/*.{js,jsx}'],
            ...vitest.configs.recommended,                //------------- >Vitest 1
            languageOptions: {
              ecmaVersion: 2020,
              globals: {
                ...globals.browser,
                ...vitest.environments.env.globals,      //------------- >Vitest 2   
              },
              parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
              },
            },
            settings: { 
            react: { version: '18.3' },
            vitest: {
              typecheck: true                           //------------- >Vitest 3
            }
          },
            plugins: {
              react,
              'react-hooks': reactHooks,
              'react-refresh': reactRefresh,
              vitest                                 //------------- >Vitest 4    
            },
            rules: {
              ...js.configs.recommended.rules,
              ...react.configs.recommended.rules,
              ...react.configs['jsx-runtime'].rules,
              ...reactHooks.configs.recommended.rules,
              'react/jsx-no-target-blank': 'off',
              'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
              ],
            },
          },
        
        ]

        8. Para que el intellisense de Vcode facilite el uso de metodos al momento de escribir el codigo, configurar el archivo jsconfig.json (javascript) o tsconfig.json (typescript) en el proyecto. 

        Si no tienes un archivo jsconfig.json o tsconfig.json en tu proyecto, no te preocupes, puedes crearlo fácilmente. 

        8.1 Crear el archivo jsconfig.json
            En la raíz de tu proyecto, crea un archivo llamado jsconfig.json.
            
            Agrega la siguiente configuración básica:

             /jsconfig.json:

            {
              "compilerOptions": {
                "types": ["vitest/globals"]
              }
            }
            Esto le dice a Visual Studio Code que incluya los tipos de Vitest en el entorno de desarrollo.

        8.2 agregar en el archivo jsconfig.json los modele y tarjet para que el intellisense de vcode reconozca la configuracion javascript ES6 en el proyecto    

          {
            "compilerOptions": {
              "module": "ESNext",
              "target": "ESNext"
            }
          }

          
          
          Quedando asi el archivo final:

          /jsconfig.json:

         {
          "compilerOptions": {
            "types": ["vitest/globals"], // Incluir los tipos globales de Vitest
            "module": "ESNext",          // Compatible con Vite
            "target": "ESNext",          // Compatible con Vite
            "moduleResolution": "Node",  // Resolución de módulos para Node
            "esModuleInterop": true,     // Facilita la interoperabilidad con módulos CommonJS
            "strict": true               // Habilita verificaciones estrictas (opcional)
          },
          "include": [
            "src/**/*.js",               // Incluir archivos fuente
            "test/**/*.js",              // Incluir archivos de prueba                 | carpeta agregada
            "vitest.config.js"           // Incluir configuración de Vitest
          ],
          "exclude": ["node_modules", "dist"]
        }

        Si tienen un archivo prueba y no esta definida en la ruta include, agregarlo, por ejemplo en mi caso tenia unas pruebas unitarias en el directorio test,
         lo que hice fue agregarlo en el include  "test/**/*.js"
 
-->
# Configuración de Pruebas con React, Vite y Vitest

Este documento describe cómo configurar y realizar pruebas unitarias en un proyecto React utilizando Vite y Vitest.

---

## Tecnologías Utilizadas

- Vitest
- Testing Library
- JavaScript / TypeScript
- React

---

## Test usando React + Vite con TypeScript

### 1. Instalar Vitest
```bash
npm install -D vitest
```

### 2. Agregar el script de pruebas en `package.json`
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 3. Crear una prueba básica
Crea un archivo `Random.Test.ts` y añade:
```typescript
import { describe, it, expect } from 'vitest';

describe('basic arithmetic checks', () => {
  it('1 + 1 equals 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('2 * 2 equals 4', () => {
    expect(2 * 2).toBe(4);
  });
});
```

Ejecuta las pruebas:
```bash
npm run test
```

Si todo es correcto, deberías ver los resultados en verde.

### 4. Instalar Testing Library y jsdom
```bash
npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom @testing-library/jest-dom @testing-library/user-event jsdom
```

### 5. Configurar Vitest
Si enfrentas problemas con `vite.config.ts`, crea un archivo `vitest.config.ts` con la siguiente configuración:
```typescript
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest.setup.ts',
  },
}));
```

### 6. Configurar `vitest.setup.ts`
Crea el archivo `src/vitest.setup.ts`:
```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### 7. Configuración de `tsconfig.app.json`
Agrega:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

### 8. Crear y probar un componente
#### 8.1 Crear el componente
`src/Components/RandomTest/RandomTest.tsx`:
```tsx
const Random = () => {
  return <div>Random Component</div>;
};

export default Random;
```

#### 8.2 Crear las pruebas
`src/Components/RandomTest/Random.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RandomTest from './RandomTest';

describe('Random Component', () => {
  it('renders correctly', () => {
    render(<RandomTest />);
    const element = screen.getByText('Random Component');
    expect(element).toBeInTheDocument();
  });
});
```

Ejecuta las pruebas:
```bash
npm run test
```

### 9. Configurar la interfaz de usuario de Vitest (opcional)
#### 9.1 Instalar la interfaz de usuario
```bash
npm i -D @vitest/ui
```

#### 9.2 Modificar el script en `package.json`
```json
"scripts": {
  "test": "vitest --ui"
}
```

Ejecuta:
```bash
npm test
```

Se abrirá una página web con todos los tests.

### Fuentes
- [Artículo de John Smilga](https://johnsmilga.com/articles/2024/10/15)
- [Plantilla de GitHub](https://github.com/john-smilga/vite-ts-vitest-react-testing-library-template)

---

## Test usando React + Vite con JavaScript

### 1. Instalar Vitest
```bash
pnpm add -D vitest
```

### 2. Agregar el script de pruebas
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 3. Crear una prueba básica
Crea un archivo `Random.Test.js` con:
```javascript
import { describe, it, expect } from 'vitest';

describe('basic arithmetic checks', () => {
  it('1 + 1 equals 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('2 * 2 equals 4', () => {
    expect(2 * 2).toBe(4);
  });
});
```

Ejecuta:
```bash
pnpm run test
```

### 4. Instalar Testing Library y jsdom
```bash
pnpm add --save-dev @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event jsdom
```

### 5. Configurar `setupTests.js`
Crea el archivo `src/setupTests.js`:
```javascript
import '@testing-library/jest-dom';
```

### 6. Configurar Vite
Edita `vite.config.js`:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
});
```

### 7. Configurar ESLint (opcional)
#### 7.1 Instalar el plugin de Vitest para ESLint
```bash
pnpm install @vitest/eslint-plugin --save-dev
```

#### 7.2 Configurar ESLint
Edita `eslint.config.js`:
```javascript
import vitest from '@vitest/eslint-plugin';

export default [
  {
    files: ['tests/**'],
    plugins: { vitest },
    settings: {
      vitest: { typecheck: true },
    },
    languageOptions: {
      globals: { ...vitest.environments.env.globals },
    },
  },
];
```

### 8. Configurar IntelliSense en VSCode
#### 8.1 Crear `jsconfig.json`
Crea el archivo en la raíz del proyecto:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals"],
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "strict": true
  },
  "include": ["src/**/*.js", "test/**/*.js", "vitest.config.js"],
  "exclude": ["node_modules", "dist"]
}
```

---
