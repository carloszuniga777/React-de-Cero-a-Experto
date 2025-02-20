import '@testing-library/jest-dom/vitest'
import {cleanup} from '@testing-library/react'
import {afterEach} from 'vitest'
import { fetch } from 'whatwg-fetch'; // Necesario para Vitest

globalThis.fetch = fetch;


afterEach(() => {
    cleanup()
})