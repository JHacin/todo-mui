// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import MutationObserver from '@sheerun/mutationobserver-shim';
import { createMatchMedia } from './test-utils';

window.MutationObserver = MutationObserver;
window.matchMedia = createMatchMedia(window.innerWidth);
