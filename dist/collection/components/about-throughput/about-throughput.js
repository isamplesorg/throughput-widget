import { Component, h } from "@stencil/core";
export class AboutThroughput {
    render() {
        return (h("div", { class: "about_area" },
            h("div", { class: "closeContainer" },
                h("a", { id: "close_about_x", class: "close" })),
            h("div", { class: "header" }, "About Throughput"),
            h("div", { class: "body" },
                h("p", null,
                    "The ",
                    h("a", { href: "https://throughputdb.com", target: "_blank" }, "Throughput Annotation Database"),
                    " links research objects across the web, including data resources -- research databases and datasets -- to code repositories, such as those on ",
                    h("a", { href: "https://github.com", target: "_blank" }, "github.com"),
                    "."),
                h("p", null, "Throughput serves to make tacit knowledge explicit, and supports equity in data sharing."))));
    }
    static get is() { return "about-throughput"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["about-throughput.css"]
    }; }
    static get styleUrls() { return {
        "$": ["about-throughput.css"]
    }; }
}
