import { Component, Event, h, Listen, Prop } from "@stencil/core";
export class OrcidConnect {
    constructor() {
        this.isamplesServerBase = "http://localhost:8000/manage/login";
    }
    handleClick(ev) {
        const clicked_id = ev.composedPath()[0].id;
        if (clicked_id == "connect-orcid-button") {
            this.openORCID();
        }
        else if (clicked_id == "logout-button") {
            this.orcidLogout.emit(); // orcidLogout event for root to handle
        }
    }
    openORCID() {
        // end point to do login for annotation purposes
        const isamples_auth_uri = this.isamplesServerBase + "?annotation=true";
        window.open(isamples_auth_uri, "_self");
    }
    render() {
        const orcidIcon = h("img", { id: "orcid-id-icon", src: "https://orcid.org/sites/default/files/images/orcid_24x24.png", width: "24", height: "24", alt: "ORCID iD icon" });
        return (h("div", { class: "connect-orcid-button-wrapper" }, this.authenticated ? (h("div", { class: 'author-name' },
            h("div", { class: 'item' }, orcidIcon),
            h("div", { class: 'item' },
                "Authenticated as ",
                this.orcidName),
            h("div", { class: 'item' },
                h("button", { id: "logout-button", class: "logout_button" }, "Sign Out")))) : (h("button", { id: "connect-orcid-button" },
            "To Submit Annotations - Connect your ORCID iD",
            orcidIcon))));
    }
    static get is() { return "orcid-connect"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["orcid-connect.css"]
    }; }
    static get styleUrls() { return {
        "$": ["orcid-connect.css"]
    }; }
    static get properties() { return {
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
            "reflect": false
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
        "isamplesServerBase": {
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
            "attribute": "isamples-server-base",
            "reflect": false,
            "defaultValue": "\"http://localhost:8000/manage/login\""
        }
    }; }
    static get events() { return [{
            "method": "orcidLogout",
            "name": "orcidLogout",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
