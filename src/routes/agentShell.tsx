import { SEO } from '../components/SEO';

export function AgentShell({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen" style={{ background: '#26241F' }}>
      <SEO title={title} description={description} noindex />
    </div>
  );
}
