import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getDisplayStylesSpec } from 'code/sampleSpec';
import { DeveloperHarness } from '@bentley/itwinjs-sandbox-harness';
import App from 'App';

// note: you can use App instead of DeveloperHarness here to run itwinjs viewer directly.
//       It makes the project a regular react app, with debugging in vscode etc.

ReactDOM.render(
  <React.StrictMode>
    <DeveloperHarness spec={getDisplayStylesSpec()}></DeveloperHarness>
    {/* <App></App> */}
  </React.StrictMode>,
  document.getElementById('root')
);
