import rocksetConfigure from '@rockset/client';

declare global {
  interface Window {
    rocksetConfigure: typeof rocksetConfigure;
  }
}

window.rocksetConfigure = rocksetConfigure;
export const client = rocksetConfigure('', '');
