import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './AppProviders';

export function onRenderClient() {
  hydrateRoot(
    document.getElementById('root')!,
    <BrowserRouter>
      <AppProviders />
    </BrowserRouter>
  );
}
