import { Component, h, Listen, Prop, State } from "@stencil/core";
import { KEYUTIL, KJUR } from "jsrsasign";
export class ThroughputWidget {
    constructor() {
        this.identifier = null; // specifies a resource eg Neotoma
        this.additionalType = null; // specifies a dataset type eg site, core, etc
        this.link = null; // specifies the resource-specific dataset
        this.readOnlyMode = false; // if true, hide add annotation UI elements
        this.orcidClientId = null; // ORCID API key; required if readOnlyMode = false
        this.authenticated = false;
        this.throughputToken = null;
        this.iSamplesDbId = "r3d100011761"; // TODO : determine this value after registration to Throughput
        this.sampleIdentifier = ""; // identifier of sample that we want to find annotations associated with it 
    }
    annotationAddedHandler(_) {
        this.getISamplesAnnotations();
    }
    orcidLogoutHandler(_) {
        this.logout();
    }
    checkAuthHandler(_) {
        this.checkAuth();
    }
    componentWillLoad() {
        if (!this.hasRequiredProps()) {
            return;
        }
        this.checkAuth();
        if (!this.throughputToken && this.getFragmentParameterByName("access_token") !== "") {
            // use the access token query param if throughput token not initialized yet 
            this.processOrcidAuthResponse();
        }
        else {
            console.log("non-ORCID auth hash found, ignoring");
        }
        if (this.sampleIdentifier !== "") {
            // fetch annotations associated with identifier if initialized
            this.getSampleAnnotations();
        }
        else {
            this.getISamplesAnnotations();
        }
    }
    // Check Throughput authentication state.
    checkAuth() {
        if (typeof (Storage) !== "undefined") {
            if ("ThroughputWidgetToken" in window.localStorage) {
                this.authenticated = true;
                this.throughputToken = window.localStorage.getItem("ThroughputWidgetToken");
                this.orcidName = window.localStorage.getItem("ThroughputWidgetName");
            }
            else {
                this.authenticated = false;
                this.throughputToken = null;
                this.orcidName = null;
            }
        }
        else {
            console.warn("Web Storage unavailable, authentication state will not be preserved on page change or refresh.");
        }
    }
    // Exchange ORCID bearer token for Throughput token.
    processOrcidAuthResponse() {
        const bearerToken = this.getFragmentParameterByName("access_token");
        // clear #... in address bar so we don't repeatedly process the ORCID response on page refresh
        // https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r/5298684#5298684
        // history.replaceState("", document.title, window.location.pathname + window.location.search);
        if (bearerToken !== "") {
            // console.log("ORCID bearer token (access_token key of window.location.hash):", bearerToken);
            this.getThroughputToken(bearerToken).then((response) => {
                console.log("Throughput response:", response);
                response.json().then((json) => {
                    if (json.status == "success") {
                        this.authenticated = true;
                        this.throughputToken = json.data.token;
                        this.orcidName = json.data.user.given_name + " " + json.data.user.family_name;
                        window.localStorage.setItem("ThroughputWidgetToken", this.throughputToken);
                        window.localStorage.setItem("ThroughputWidgetName", this.orcidName);
                        // navigate back to landing page if success on saving throughput tokens
                        window.open(window.location.origin, "_self");
                    }
                }).catch(error => {
                    console.log(error);
                });
            });
        }
        else {
            console.error("no bearer token found");
        }
    }
    // After ORCID authentication, exchange the short-lived ORCID bearer token for a
    // more persistent throughputdb.com token to be used when adding annotations.
    async getThroughputToken(orcidBearerToken) {
        // console.log("Passing bearer token to Throughput:", orcidBearerToken);
        let response = await fetch('https://throughputdb.com/auth/orcid', {
            method: 'POST',
            body: JSON.stringify({ token: orcidBearerToken }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    // Pull Throughput annotations
    // example: https://throughputdb.com/api/ccdrs/annotations?dbid=r3d100011761&id=1114&additionalType=site
    getAnnotations() {
        const ANNOTATION_SEARCH_ENDPOINT = "https://throughputdb.com/api/ccdrs/annotations?";
        const params = new URLSearchParams({
            dbid: this.identifier,
            additionalType: this.additionalType,
            id: this.link,
            limit: "9999"
        });
        fetch(ANNOTATION_SEARCH_ENDPOINT + params).then((response) => {
            response.json().then((json) => {
                console.log(json);
                this.annotations = json.data;
            });
        });
    }
    // Pull annotations associated with iSamples
    getISamplesAnnotations() {
        const ANNOTATION_SEARCH_ENDPOINT = "https://throughputdb.com/api/ccdrs/annotations?";
        const params = new URLSearchParams({
            dbid: this.iSamplesDbId
        });
        fetch(ANNOTATION_SEARCH_ENDPOINT + params).then((response) => {
            response.json().then((json) => {
                console.log(json);
                this.annotations = json.data;
            });
        });
    }
    // Pull iSamples annotations associated with given identifier id 
    getSampleAnnotations() {
        const ANNOTATION_SEARCH_ENDPOINT = "https://throughputdb.com/api/ccdrs/annotations?";
        const params = new URLSearchParams({
            dbid: this.iSamplesDbId,
            additionalType: this.additionalType,
            id: this.sampleIdentifier,
            limit: "9999"
        });
        fetch(ANNOTATION_SEARCH_ENDPOINT + params).then((response) => {
            response.json().then((json) => {
                console.log(json);
                this.annotations = json.data;
            });
        });
    }
    // Clear authentication data in localStorage, reset auth state variables.
    logout() {
        window.localStorage.removeItem("ThroughputWidgetToken");
        window.localStorage.removeItem("ThroughputWidgetName");
        this.authenticated = false;
        this.throughputToken = null;
        this.orcidName = null;
    }
    hasRequiredProps() {
        if (!this.identifier) {
            console.error("Throughput widget: missing required property 'identifier'.");
        }
        if (!this.link) {
            console.error("Throughput widget: missing required property 'link'.");
        }
        if (!this.additionalType) {
            console.error("Throughput widget: missing required property 'additional-type'.");
        }
        const missingProps = !this.readOnlyMode && !this.orcidClientId;
        if (missingProps) {
            console.error("Throughput widget: 'orcid-client-id' property required if 'read-only-mode' is false.");
        }
        return (this.identifier && this.link && this.additionalType && !missingProps);
    }
    // modified to parse the query parameters to get the access token value
    getFragmentParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var paramsString = window.location.hash.split("?")[1];
        const searchParams = new URLSearchParams(paramsString);
        return searchParams.get(name);
    }
    checkSig(idToken) {
        const orcidProdCert = {
            kty: "RSA",
            e: "AQAB",
            use: "sig",
            kid: "production-orcid-org-7hdmdswarosg3gjujo8agwtazgkp1ojs",
            n: "jxTIntA7YvdfnYkLSN4wk__E2zf_wbb0SV_HLHFvh6a9ENVRD1_rHK0EijlBzikb-1rgDQihJETcgBLsMoZVQqGj8fDUUuxnVHsuGav_bf41PA7E_58HXKPrB2C0cON41f7K3o9TStKpVJOSXBrRWURmNQ64qnSSryn1nCxMzXpaw7VUo409ohybbvN6ngxVy4QR2NCC7Fr0QVdtapxD7zdlwx6lEwGemuqs_oG5oDtrRuRgeOHmRps2R6gG5oc-JqVMrVRv6F9h4ja3UgxCDBQjOVT1BFPWmMHnHCsVYLqbbXkZUfvP2sO1dJiYd_zrQhi-FtNth9qrLLv3gkgtwQ",
        };
        const pubKey = KEYUTIL.getKey(orcidProdCert);
        return KJUR.jws.JWS.verifyJWT(idToken, pubKey, {
            alg: ["RS256"],
            iss: ["https://orcid.org"],
            aud: this.orcidClientId,
            gracePeriod: 15 * 60,
        });
    }
    handleSampleIdentifier(sampleIdentifier) {
        // update state value from the passed value of children
        this.sampleIdentifier = sampleIdentifier; // update the sample identifier value from received
        if (this.sampleIdentifier !== "") {
            this.getSampleAnnotations();
        }
        else {
            this.getISamplesAnnotations();
        }
    }
    render() {
        return this.hasRequiredProps() ?
            (h("div", null,
                h("data-display", { annotations: this.annotations, authenticated: this.authenticated, orcidName: this.orcidName, throughputToken: this.throughputToken, identifier: this.identifier, additionalType: this.additionalType, link: this.link, readOnlyMode: this.readOnlyMode, orcidClientId: this.orcidClientId, handleSampleIdentifier: this.handleSampleIdentifier.bind(this) }))) : "Error: see console for details.";
    }
    static get is() { return "throughput-widget"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["throughput-widget.css"]
    }; }
    static get styleUrls() { return {
        "$": ["throughput-widget.css"]
    }; }
    static get properties() { return {
        "identifier": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "identifier",
            "reflect": false,
            "defaultValue": "null"
        },
        "additionalType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "additional-type",
            "reflect": false,
            "defaultValue": "null"
        },
        "link": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "link",
            "reflect": false,
            "defaultValue": "null"
        },
        "readOnlyMode": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "read-only-mode",
            "reflect": false,
            "defaultValue": "false"
        },
        "orcidClientId": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "orcid-client-id",
            "reflect": false,
            "defaultValue": "null"
        }
    }; }
    static get states() { return {
        "annotations": {},
        "authenticated": {},
        "orcidName": {},
        "throughputToken": {},
        "iSamplesDbId": {},
        "sampleIdentifier": {}
    }; }
    static get listeners() { return [{
            "name": "annotationAdded",
            "method": "annotationAddedHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "orcidLogout",
            "method": "orcidLogoutHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "checkAuth",
            "method": "checkAuthHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
