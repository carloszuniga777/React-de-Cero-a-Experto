<!-- 
      Test usando React con Javascript

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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
