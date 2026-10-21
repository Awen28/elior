import { Suspense, lazy, useEffect, useState, type ComponentType, type LazyExoticComponent } from 'react';
import { AgentShell } from './agentShell';

import Suremate from '../pages/Suremate';
import SurematePro from '../pages/SurematePro';
import ThreeSixNine from '../pages/ThreeSixNine';
import NumiStellar from '../pages/NumiStellar';
import KiBook from '../pages/KiBook';
import Elow from '../pages/Elow';
import Orbit from '../pages/Orbit';
import OrbitPrivacy from '../pages/OrbitPrivacy';
import StradaHub from '../pages/StradaHub';
import StradaHubPrivacy from '../pages/StradaHubPrivacy';
import Abwun from '../pages/Abwun';
import WebdesignTirol from '../pages/WebdesignTirol';
import AppEntwicklungTirol from '../pages/AppEntwicklungTirol';
import AgentRegister from '../pages/AgentRegister';
import DownloadSurematePro from '../pages/DownloadSurematePro';
import Callback from '../pages/Callback';
import NotFound from '../pages/NotFound';
import Impressum from '../pages/Impressum';
import Datenschutz from '../pages/Datenschutz';
import PrivacyApps from '../pages/PrivacyApps';
import Cookies from '../pages/Cookies';

export {
  Suremate,
  SurematePro,
  ThreeSixNine,
  NumiStellar,
  KiBook,
  Elow,
  Orbit,
  OrbitPrivacy,
  StradaHub,
  StradaHubPrivacy,
  Abwun,
  WebdesignTirol,
  AppEntwicklungTirol,
  AgentRegister,
  DownloadSurematePro,
  Callback,
  NotFound,
  Impressum,
  Datenschutz,
  PrivacyApps,
  Cookies,
};

function clientOnly(
  Component: LazyExoticComponent<ComponentType>,
  title: string,
  description: string
) {
  return function ClientOnlyPage() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
      setReady(true);
    }, []);

    if (!ready) return <AgentShell title={title} description={description} />;

    return (
      <Suspense fallback={<AgentShell title={title} description={description} />}>
        <Component />
      </Suspense>
    );
  };
}

const CreateAgentLazy = lazy(() => import('../pages/CreateAgent'));
const ForgotCodeLazy = lazy(() => import('../pages/ForgotCode'));
const AgentPortalLazy = lazy(() => import('../pages/AgentPortal'));

export const CreateAgent = clientOnly(
  CreateAgentLazy,
  'Agent anlegen | Elior',
  'Interner Bereich zur Anlage neuer Agenten.'
);
export const ForgotCode = clientOnly(
  ForgotCodeLazy,
  'Zugangscode anfordern | Elior',
  'Interner Bereich zur Wiederherstellung des Zugangscodes.'
);
export const AgentPortal = clientOnly(
  AgentPortalLazy,
  'Agent Portal | Elior',
  'Interner Bereich für Elior Agenten.'
);
