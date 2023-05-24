import { Component, Event, Prop, State, h, Listen } from "@stencil/core";
export class AnnotationsDisplay {
    constructor() {
        this.authenticated = false;
        this.throughputToken = null;
        this.readOnlyMode = true;
        this.annotations = [];
        this.DEFAULT_ANNOTATION_TEXT = "Enter your annotation here.";
        this.showInfo = false; // show AboutThroughput component
    }
    async handleClick(ev) {
        const clicked_id = ev.composedPath()[0].id;
        switch (clicked_id) {
            case "info_i":
                this.showInfo = true;
                break;
            case "add_button":
                this.addAnnotation = true;
                break;
            case "submit_button":
                console.log("Submit clicked");
                var success = await this.submitAnnotation();
                this.addAnnotation = !success; // close add annotation UI if submit succeeds
                break;
            case "cancel_button":
                this.addAnnotation = false;
                break;
            case "info_i":
                alert("Here's a blurb about the Throughput Database! Learn more at throughputdb.com");
                break;
            case "close_x":
                // Ignore close_x here, it's handled in DataDisplay.handleClick(), which
                // is called after this.handleClick(). Otherwise we hit default below.
                break;
            case "close_about_x": // close_about_x lives in AboutThroughput
                this.showInfo = false;
                break;
            case "search_button":
                this.handleSampleIdentifier(this.searchSampleIdentifier); // pass value to parents
                break;
            case "reset_button":
                this.searchSampleIdentifier = "";
                this.handleSampleIdentifier(this.searchSampleIdentifier);
                break;
            default:
                console.error("Unhandled click, id = ", clicked_id);
        }
    }
    componentWillRender() {
        this.checkAuth.emit(); // update authentication state
    }
    updateAnnotationText(event) {
        this.annotationText = event.target.value;
    }
    // If text box contains default text, clear it on click.
    clearDefaultAnnotationText(event) {
        if (event.target.value === this.DEFAULT_ANNOTATION_TEXT) {
            event.target.value = '';
        }
    }
    updateSearchSampleIdentifier(event) {
        this.searchSampleIdentifier = event.target.value;
    }
    updatePostSampleIdentifier(event) {
        this.postSampleIdentifier = event.target.value;
    }
    updateKeyword(event) {
        this.annotationKeyword = event.target.value;
    }
    // POST new annotation to Throughput
    async submitAnnotation() {
        const annotation = {
            dbid: this.identifier,
            additionalType: this.additionalType,
            id: this.postSampleIdentifier,
            body: {
                "text": this.annotationText,
                "keyword": this.annotationKeyword
            }
        };
        const url = "https://throughputdb.com/api/widget/";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': this.throughputToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(annotation)
        });
        const json = await response.json();
        const success = json.status && json.status === "success";
        if (!success) {
            const errmsg = "Submit annotation failed: " + (json.message ? json.message : "[no message provided]");
            console.error(errmsg);
            alert(errmsg);
        }
        else {
            // alert root of new annotation so it can refresh and re-render component tree
            this.annotationAdded.emit();
        }
        return success;
    }
    getFormattedDate(date) {
        const properDate = new Date(date);
        return (properDate.getMonth() +
            1 +
            "/" +
            properDate.getDate() +
            "/" +
            properDate.getFullYear());
    }
    render() {
        // Show "Add Annotation" button or add annotation UI (text area, Submit/Cancel buttons)
        // depending on state of this.addAnnotation. Doing this here to avoid hard-to-read
        // nested conditions in rendering code.
        let annotationElement;
        if (this.addAnnotation) {
            annotationElement =
                h("div", { class: "postInput" },
                    "Sample Identifier ",
                    h("input", { type: "text", value: this.postSampleIdentifier, onInput: (event) => this.updatePostSampleIdentifier(event) }),
                    " ",
                    h("br", null),
                    "Keyword ",
                    h("input", { type: "text", value: this.annotationKeyword, onInput: (event) => this.updateKeyword(event) }),
                    h("textarea", { onInput: (event) => this.updateAnnotationText(event), onFocus: (event) => this.clearDefaultAnnotationText(event) }, this.DEFAULT_ANNOTATION_TEXT),
                    h("button", { id: "submit_button", class: "add_button" }, "Submit"),
                    h("button", { id: "cancel_button", class: "cancel_button" }, "Cancel"));
        }
        else {
            annotationElement = h("button", { id: "add_button", class: "add_button" }, "+ Add Annotation");
        }
        return (h("div", { class: "overlay" }, this.showInfo ? h("about-throughput", null) :
            (h("div", { class: "annotation_list" },
                h("div", { class: "closeContainer" },
                    h("a", { id: "close_x", class: "close" })),
                h("div", { class: "header" },
                    "Throughput Annotations ",
                    h("a", { id: "info_i" }, "\u24D8")),
                h("div", { class: "body" },
                    !this.readOnlyMode ? (h("orcid-connect", { orcidClientId: this.orcidClientId, authenticated: this.authenticated, orcidName: this.orcidName })) : null,
                    this.authenticated && annotationElement,
                    " ",
                    h("br", null),
                    h("div", { class: "annotation_search" },
                        "Sample Identifier ",
                        h("input", { type: "text", value: this.searchSampleIdentifier, onInput: (event) => this.updateSearchSampleIdentifier(event) }),
                        h("button", { id: "search_button", class: "search_button" }, "Search"),
                        h("button", { id: "reset_button", class: "search_button" }, "Reset")),
                    this.annotations.map((annotation) => (h("div", { class: "annotation_item" },
                        annotation.annotation,
                        h("div", { class: "annotation_metadata" },
                            h("div", { class: "annotation_author" }, annotation.annotationauthor ? annotation.annotationauthor : "[null author]"),
                            h("div", { class: "orcidLink" },
                                h("a", { href: "https://orcid.org/" + annotation.orcid, target: "_blank" },
                                    h("img", { id: "orcid-id-icon", src: "https://orcid.org/sites/default/files/images/orcid_24x24.png", width: "14", height: "14", alt: "ORCID iD icon" }))),
                            h("div", { class: "annotation_author" },
                                "(",
                                this.getFormattedDate(annotation.date),
                                ")",
                                " "))))))))));
    }
    static get is() { return "annotations-display"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["annotations-display.css"]
    }; }
    static get styleUrls() { return {
        "$": ["annotations-display.css"]
    }; }
    static get assetsDirs() { return ["assets"]; }
    static get properties() { return {
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
            "defaultValue": "true"
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
        },
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
        "handleSampleIdentifier": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "addAnnotation": {},
        "showInfo": {},
        "annotationText": {},
        "searchSampleIdentifier": {},
        "postSampleIdentifier": {},
        "annotationKeyword": {}
    }; }
    static get events() { return [{
            "method": "annotationAdded",
            "name": "annotationAdded",
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
        }, {
            "method": "checkAuth",
            "name": "checkAuth",
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
