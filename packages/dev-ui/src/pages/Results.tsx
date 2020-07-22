import React from 'react';
import RockDataTable from 'RockComponents/RockDataTable';
import _ from 'lodash';
import { pebbleTheme } from 'styles/pebbleTheme';
import { PebbleSkeleton, PebbleNotification } from 'components';

export const Results = ({
  data,
  err,
  loading,
}: {
  loading: boolean;
  data: unknown[];
  err: unknown;
}) => {
  if (loading) {
    return (
      <div style={{ margin: '20px 20px', height: '100px' }}>
        <PebbleSkeleton style={{ display: 'inline-block' }} />
      </div>
    );
  }

  return data && data.length > 0 ? (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          height: '50%',
          overflow: 'scroll',
          border: '1px solid #dadfe2',
          margin: '10px 10px 10px 0px',
        }}
      >
        <RockDataTable data={data} />
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'scroll',
        }}
      >
        <ResultsJson resultsJson={JSON.stringify(data, null, 2)} />
      </div>
    </div>
  ) : err ? (
    <>
      <PebbleNotification
        kind="danger"
        title={(err as any)?.type}
        subtitle={(err as any)?.message}
        style={{ width: 'fit-content', marginTop: 10 }}
      />
      <ResultsJson resultsJson={JSON.stringify(err, null, 2)} isErr={true} />
    </>
  ) : (
    <div
      style={{
        flex: 1,
        height: '50%',
        overflow: 'scroll',
        margin: '10px 10px 10px 0px',
      }}
    >
      Please hit run to execute this lambda from your local project.
    </div>
  );
};

const ResultsJson = ({ resultsJson, isErr = false }) => {
  return (
    <div
      className="bx--snippet"
      style={{
        padding: '0px',
        fontSize: '12px',
        overflowWrap: 'break-word',
        overflow: 'auto',
        margin: '10px 10px 10px 0px',
        border: `1px solid ${
          !isErr ? pebbleTheme.baseColors.gray12 : pebbleTheme.baseColors.red1
        }`,
      }}
    >
      <pre
        className="fs-secret"
        style={{ minHeight: '20vh', maxWidth: '100%' }}
      >
        {/* Set max width of rendered JSON as 1m chars */}
        <code className="hljs rockjson">
          {_.truncate(resultsJson, { length: 1000000 })}
        </code>
      </pre>
    </div>
  );
};
