/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { SampleIModels } from "@bentley/itwinjs-sandbox";
import { SampleSpec } from "@bentley/itwinjs-sandbox-harness";

export function getDisplayStylesSpec(): SampleSpec {
  return ({
    name: "display-styles-sample",
    label: "Display Styles",
    image: "display-styles-thumbnail.png",
    readme: async () => import("!!raw-loader!./README.md"),
    files: () => [
      { name: "DisplayStylesApp.tsx", import: import("!!raw-loader!./DisplayStylesApp") },
      { name: "DisplayStylesUI.tsx", import: import("!!raw-loader!./DisplayStylesUI"), entry: true },
      { name: "DisplayStylesWidget.tsx", import: import("!!raw-loader!./DisplayStylesWidget.tsx") },
      { name: "Styles.ts", import: import("!!raw-loader!./Styles") },
      { name: "samples-common.scss", import: import("!!raw-loader!./samples-common.scss") },
    ],
    iModelList: [SampleIModels.Villa, SampleIModels.House, SampleIModels.MetroStation, SampleIModels.BayTown, SampleIModels.Stadium],
    iTwinViewerReady: true,
    type: "DisplayStylesUI.tsx",
  });
}
