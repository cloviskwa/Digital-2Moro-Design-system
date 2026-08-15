import { TechnicalDetailCard } from '@digital2moro/ui';

export const LiveMetrics = () => (
  <TechnicalDetailCard
    title="Track key metrics"
    description="Live counts for the numbers that matter, updated in real time."
    badge="Live"
    cta={{ label: 'View dashboard', href: '#' }}
    visual={
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p className="d2m-mono" style={{ fontSize: '1.5rem' }}>
            1,204
          </p>
          <p className="d2m-caption">Requests / min</p>
        </div>
        <div>
          <p className="d2m-mono" style={{ fontSize: '1.5rem' }}>
            99.98%
          </p>
          <p className="d2m-caption">Uptime</p>
        </div>
      </div>
    }
  />
);

export const LogStream = () => (
  <TechnicalDetailCard
    title="Stream your logs"
    description="Tail structured logs from every service in one place, filterable in real time."
    badge="Beta"
    cta={{ label: 'View logs', href: '#' }}
    visual={
      <p className="d2m-mono" style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.8 }}>
        12:04:01 info  request completed 200 OK
        <br />
        12:04:03 warn  retrying webhook delivery (2/3)
        <br />
        12:04:05 info  cache warmed — 1,204 keys
      </p>
    }
  />
);

export const TrafficChart = () => (
  <TechnicalDetailCard
    title="Traffic insights"
    description="A week-over-week view of visits, so trends are obvious before they're a problem."
    cta={{ label: 'View report', href: '#' }}
    visual={
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 88 }}>
        {[38, 52, 44, 70, 61, 84, 58].map((height, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${height}%`,
              borderRadius: 4,
              background: 'var(--d2m-color-blue-cta)',
              opacity: 0.3 + (height / 100) * 0.7,
            }}
          />
        ))}
      </div>
    }
  />
);
