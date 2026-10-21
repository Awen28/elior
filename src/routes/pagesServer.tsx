import { AgentShell } from './agentShell';

export { default as Suremate } from '../pages/Suremate';
export { default as SurematePro } from '../pages/SurematePro';
export { default as ThreeSixNine } from '../pages/ThreeSixNine';
export { default as NumiStellar } from '../pages/NumiStellar';
export { default as KiBook } from '../pages/KiBook';
export { default as Elow } from '../pages/Elow';
export { default as Orbit } from '../pages/Orbit';
export { default as OrbitPrivacy } from '../pages/OrbitPrivacy';
export { default as StradaHub } from '../pages/StradaHub';
export { default as StradaHubPrivacy } from '../pages/StradaHubPrivacy';
export { default as Abwun } from '../pages/Abwun';
export { default as WebdesignTirol } from '../pages/WebdesignTirol';
export { default as AppEntwicklungTirol } from '../pages/AppEntwicklungTirol';
export { default as AgentRegister } from '../pages/AgentRegister';
export { default as DownloadSurematePro } from '../pages/DownloadSurematePro';
export { default as Callback } from '../pages/Callback';
export { default as NotFound } from '../pages/NotFound';
export { default as Impressum } from '../pages/Impressum';
export { default as Datenschutz } from '../pages/Datenschutz';
export { default as PrivacyApps } from '../pages/PrivacyApps';
export { default as Cookies } from '../pages/Cookies';

export function CreateAgent() {
  return <AgentShell title="Agent anlegen | Elior" description="Interner Bereich zur Anlage neuer Agenten." />;
}

export function ForgotCode() {
  return <AgentShell title="Zugangscode anfordern | Elior" description="Interner Bereich zur Wiederherstellung des Zugangscodes." />;
}

export function AgentPortal() {
  return <AgentShell title="Agent Portal | Elior" description="Interner Bereich für Elior Agenten." />;
}
