export declare class ThroughputWidget {
    identifier: string;
    additionalType: string;
    link: any;
    readOnlyMode: boolean;
    orcidClientId: string;
    annotations: Array<object>;
    authenticated: boolean;
    orcidName: string;
    throughputToken: string;
    iSamplesDbId: string;
    sampleIdentifier: string;
    annotationAddedHandler(_: CustomEvent<void>): void;
    orcidLogoutHandler(_: CustomEvent<void>): void;
    checkAuthHandler(_: CustomEvent<void>): void;
    componentWillLoad(): void;
    checkAuth(): void;
    processOrcidAuthResponse(): void;
    getThroughputToken(orcidBearerToken: any): Promise<Response>;
    getAnnotations(): void;
    getISamplesAnnotations(): void;
    getSampleAnnotations(): void;
    logout(): void;
    hasRequiredProps(): boolean;
    getFragmentParameterByName(name: any): string;
    checkSig(idToken: any): any;
    handleSampleIdentifier(sampleIdentifier: any): void;
    render(): any;
}
