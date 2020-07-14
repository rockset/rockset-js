import React from 'react';
import RockDataTable from 'RockComponents/RockDataTable';
import _ from 'lodash';
import { pebbleTheme } from 'styles/pebbleTheme';
export const Results = ({ data, err }: { data: unknown[]; err: unknown }) => {
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
    <ResultsJson resultsJson={JSON.stringify(err, null, 2)} isErr={true} />
  ) : null;
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
