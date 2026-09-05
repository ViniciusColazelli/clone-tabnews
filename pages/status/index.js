import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div className="page">
      <header className="header">
        <span className="dot" />
        <h1>Status</h1>
      </header>

      <UpdateAt />
      <ShowData />

      <style jsx>{`
        .page {
          max-width: 640px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          font-family: "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
          color: #1b1f1d;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2e8b57;
          box-shadow: 0 0 0 rgba(46, 139, 87, 0.5);
          animation: pulse 2s infinite;
        }
        h1 {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(46, 139, 87, 0.4);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(46, 139, 87, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(46, 139, 87, 0);
          }
        }
      `}</style>
    </div>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdateAtText = "Carregando...";

  if (!isLoading && data) {
    UpdateAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <div className="updated">Última atualização: {UpdateAtText}</div>
      <style jsx>{`
        .updated {
          font-size: 0.8rem;
          color: #5c625e;
          margin: 0 0 1.5rem;
        }
      `}</style>
    </>
  );
}

function ShowData() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>
          Conexões máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="data">
        <h2>Database</h2>
        <div>{databaseStatusInformation}</div>
      </div>
      <style jsx>{`
        .data {
          background: #ffffff;
          border: 1px solid #dfe3e0;
          border-radius: 6px;
          padding: 1rem 1.25rem;
        }
        h2 {
          font-size: 0.95rem;
          margin: 0 0 0.75rem;
        }
      `}</style>
    </>
  );
}
