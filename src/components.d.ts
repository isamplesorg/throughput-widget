/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DataDisplay {
        "annotations": any;
    }
    interface ThroughputWidget {
        "identifier": string;
        "level": string;
        "link": any;
    }
}
declare global {
    interface HTMLDataDisplayElement extends Components.DataDisplay, HTMLStencilElement {
    }
    var HTMLDataDisplayElement: {
        prototype: HTMLDataDisplayElement;
        new (): HTMLDataDisplayElement;
    };
    interface HTMLThroughputWidgetElement extends Components.ThroughputWidget, HTMLStencilElement {
    }
    var HTMLThroughputWidgetElement: {
        prototype: HTMLThroughputWidgetElement;
        new (): HTMLThroughputWidgetElement;
    };
    interface HTMLElementTagNameMap {
        "data-display": HTMLDataDisplayElement;
        "throughput-widget": HTMLThroughputWidgetElement;
    }
}
declare namespace LocalJSX {
    interface DataDisplay {
        "annotations"?: any;
    }
    interface ThroughputWidget {
        "identifier"?: string;
        "level"?: string;
        "link"?: any;
    }
    interface IntrinsicElements {
        "data-display": DataDisplay;
        "throughput-widget": ThroughputWidget;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "data-display": LocalJSX.DataDisplay & JSXBase.HTMLAttributes<HTMLDataDisplayElement>;
            "throughput-widget": LocalJSX.ThroughputWidget & JSXBase.HTMLAttributes<HTMLThroughputWidgetElement>;
        }
    }
}
