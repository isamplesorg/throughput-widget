import { EventEmitter } from "../../stencil-public-runtime";
export declare class AnnotationsDisplay {
    authenticated: boolean;
    orcidName: string;
    identifier: string;
    additionalType: string;
    link: any;
    throughputToken: string;
    readOnlyMode: boolean;
    orcidClientId: string;
    annotations: any;
    DEFAULT_ANNOTATION_TEXT: string;
    handleSampleIdentifier: Function;
    addAnnotation: boolean;
    showInfo: boolean;
    annotationText: string;
    sampleIdentifier: string;
    annotationAdded: EventEmitter<void>;
    checkAuth: EventEmitter<void>;
    handleClick(ev: any): Promise<void>;
    componentWillRender(): void;
    updateAnnotationText(event: any): void;
    clearDefaultAnnotationText(event: any): void;
    updateSampleIdentifier(event: any): void;
    submitAnnotation(): Promise<boolean>;
    getFormattedDate(date: any): string;
    render(): any;
}
