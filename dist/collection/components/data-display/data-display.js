import { Component, h, Prop, State, Listen } from "@stencil/core";
export class DataDisplay {
    constructor() {
        this.annotations = [];
        this.authenticated = false;
        this.throughputToken = null;
        this.open = false; // is overlay being displayed?
    }
    handleClick(ev) {
        if (this.annotations.length === 0 && this.readOnlyMode) {
            return;
        }
        if (!this.open ||
            (this.open &&
                ev.composedPath().length > 0 &&
                ev.composedPath()[0].id == "close_x")) {
            this.open = !this.open;
        }
    }
    getCountText() {
        let text = null;
        if (this.annotations.length == 0) {
            text = "No Annotations";
        }
        else if (this.annotations.length == 1) {
            text = "1 Annotation";
        }
        else {
            text = this.annotations.length + " Annotations";
        }
        return text;
    }
    getHelpText() {
        let text = null;
        if (this.readOnlyMode) {
            text = this.annotations.length > 0 ? "Click to view" : "";
        }
        else {
            text = this.annotations.length > 0 ? "Click to view or add" : "Click to add";
        }
        return text;
    }
    render() {
        return (h("div", { class: "badge", "title-": "Throughput Annotation Widget. Learn more at throughputdb.com" },
            h("div", { class: 'throughput-logo' },
                h("img", { src: "https://github.com/throughput-ec/widget/blob/master/figures/TPlogo_small.png?raw=true", title: "Throughput" })),
            h("div", { class: "summary-container" },
                h("div", { class: "summary" }, this.getCountText()),
                h("div", { class: "helptext" }, this.getHelpText())),
            this.open ? (h("annotations-display", { annotations: this.annotations, authenticated: this.authenticated, orcidName: this.orcidName, throughputToken: this.throughputToken, identifier: this.identifier, additionalType: this.additionalType, link: this.link, readOnlyMode: this.readOnlyMode, orcidClientId: this.orcidClientId })) : null));
    }
    static get is() { return "data-display"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["data-display.css"]
    }; }
    static get styleUrls() { return {
        "$": ["data-display.css"]
    }; }
    static get assetsDirs() { return ["assets"]; }
    static get properties() { return {
        "annotations": {
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
            "attribute": "annotations",
            "reflect": false,
            "defaultValue": "[]"
        },
        "authenticated": {
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
            "attribute": "authenticated",
            "reflect": false,
            "defaultValue": "false"
        },
        "orcidName": {
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
            "attribute": "orcid-name",
            "reflect": false
        },
        "throughputToken": {
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
            "attribute": "throughput-token",
            "reflect": false,
            "defaultValue": "null"
        },
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
            "reflect": false
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
            "reflect": false
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
            "reflect": false
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
            "reflect": false
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
            "reflect": false
        }
    }; }
    static get states() { return {
        "open": {}
    }; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
