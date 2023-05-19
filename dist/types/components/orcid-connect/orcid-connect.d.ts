import { EventEmitter } from "../../stencil-public-runtime";
export declare class OrcidConnect {
    orcidClientId: string;
    authenticated: boolean;
    orcidName: string;
    isamplesServerBase: string;
    orcidLogout: EventEmitter<void>;
    handleClick(ev: any): void;
    openORCID(): void;
    render(): any;
}
