declare module 'plotly.js-dist-min' {
    export * from 'plotly.js';
    export { default } from 'plotly.js';
}

declare module 'react-plotly.js/factory' {
    import Plotly from 'plotly.js';
    import { Component } from 'react';

    interface PlotParams {
        data: Plotly.Data[];
        layout?: Partial<Plotly.Layout>;
        config?: Partial<Plotly.Config>;
        frames?: Plotly.Frame[];
        style?: React.CSSProperties;
        className?: string;
        useResizeHandler?: boolean;
        onInitialized?: (figure: Readonly<{ data: Plotly.Data[]; layout: Partial<Plotly.Layout> }>, graphDiv: HTMLDivElement) => void;
        onUpdate?: (figure: Readonly<{ data: Plotly.Data[]; layout: Partial<Plotly.Layout> }>, graphDiv: HTMLDivElement) => void;
        onPurge?: (figure: Readonly<{ data: Plotly.Data[]; layout: Partial<Plotly.Layout> }>, graphDiv: HTMLDivElement) => void;
        onError?: (err: Error) => void;
        divId?: string;
        revision?: number;
    }

    function createPlotlyComponent(plotly: typeof Plotly): React.ComponentType<PlotParams>;
    export default createPlotlyComponent;
}
