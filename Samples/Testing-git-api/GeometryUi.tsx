/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PolyfaceBuilder, Range3d, StrokeOptions } from "@bentley/geometry-core";
import { Cartographic, ColorByName, ColorDef } from "@bentley/imodeljs-common";
import { GeometryDecorator } from "./GeometryDecorator";
import { BlankConnectionProps, IModelApp } from "@bentley/imodeljs-frontend";
import { BlankConnectionViewState, BlankViewer } from "@bentley/itwin-viewer-react";
import { AuthorizationClient, default3DUiConfig } from "@sandbox";
import GeometryApp from "./index";

interface GeometryUiState {
    shape: string;
    color: ColorDef;
    sphereRadius: number;
    boxLength: number;
    boxWidth: number;
    boxHeight: number;
    coneUpperRadius: number;
    coneLowerRadius: number;
    coneHeight: number;
    tpInnerRadius: number;
    tpOuterRadius: number;
    tpSweep: number;
    decorator: GeometryDecorator;
}


export default class GeometryUi extends React.Component<{}, GeometryUiState> {

    private _blankConnection: BlankConnectionProps = {
        name: "GeometryConnection",
        location: Cartographic.fromDegrees(0, 0, 0),
        extents: new Range3d(-30, -30, -30, 30, 30, 30),
    }

    private _viewStateOptions: BlankConnectionViewState = {
        viewFlags: {
            grid: true
        }
    }

    constructor(props?: any) {
        super(props);

        this.state = {
            shape: "Box",
            color: ColorDef.fromTbgr(ColorDef.withTransparency(ColorDef.create(ColorByName.cyan).tbgr, 50)),
            sphereRadius: 4,
            boxLength: 4,
            boxWidth: 4,
            boxHeight: 4,
            coneUpperRadius: 3,
            coneLowerRadius: 5,
            coneHeight: 5,
            tpInnerRadius: 2,
            tpOuterRadius: 5,
            tpSweep: 360,
            decorator: new GeometryDecorator()
        };
    }

    public componentDidUpdate() {
        this.setGeometry();
    }

    public componentWillUnmount() {
        IModelApp.viewManager.dropDecorator(this.state.decorator);
    }

    public setGeometry() {
        this.state.decorator.clearGeometry();

        const options = StrokeOptions.createForCurves();
        options.needParams = false;
        options.needNormals = true;
        const builder = PolyfaceBuilder.create(options);
        if (this.state.shape === "Cone") {
            const cone = GeometryApp.createCone(this.state.coneHeight, this.state.coneLowerRadius, this.state.coneUpperRadius);
            if (cone)
                builder.addCone(cone);
        } else if (this.state.shape === "Sphere") {
            const sphere = GeometryApp.createSphere(this.state.sphereRadius);
            if (sphere)
                builder.addSphere(sphere);
        } else if (this.state.shape === "Box") {
            const box = GeometryApp.createBox(this.state.boxLength, this.state.boxWidth, this.state.boxHeight);
            if (box)
                builder.addBox(box);
        } else if (this.state.shape === "Torus Pipe") {
            const torusPipe = GeometryApp.createTorusPipe(this.state.tpOuterRadius, this.state.tpInnerRadius, this.state.tpSweep);
            if (torusPipe)
                builder.addTorusPipe(torusPipe);
        }
        const polyface = builder.claimPolyface(false);
        this.state.decorator.setColor(this.state.color);
        this.state.decorator.addGeometry(polyface);
        this.state.decorator.drawBase();
    }

    private _onIModelAppInit = () => {
        IModelApp.viewManager.addDecorator(this.state.decorator)
        this.setGeometry();
    }

    public render() {
        return <BlankViewer
            authConfig={{ oidcClient: AuthorizationClient.oidcClient }}
            theme={"dark"}
            onIModelAppInit={this._onIModelAppInit}
            defaultUiConfig={default3DUiConfig}
            viewStateOptions={this._viewStateOptions}
            blankConnection={this._blankConnection} />
    }
}
