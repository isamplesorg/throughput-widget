import { Component, Prop, h, Watch, State, Listen } from "@stencil/core";

@Component({
  tag: "data-display",
  styleUrl: "data-display.css",
  assetsDirs: ['assets'],
  shadow: true,
})
export class DataDisplay {
  @Prop() annotations: any = [];
  @Prop() authenticated: boolean = false;

  @State() open: boolean = false;

  componentWillLoad() {
    console.log("data-display componentWillLoad(): authenticated = ", this.authenticated);
    this.open = this.authenticated;
  }

  @Listen("click")
  handleClick(ev) {
    if (!this.open || (this.open && (ev.composedPath().length) > 0 && ev.composedPath()[0].id == "close_x")) {
      this.open = !this.open;
    }
  }

  @Watch("annotations")
  watchHandler(newValue, oldValue) {
    console.log(newValue, oldValue);
  }

  render() {
    return (
      <div>
        <div class="summary">{this.annotations.length > 0 ? (this.annotations.length) : "No"} Annotation(s) Found</div>
        <div class="helptext">Click to display</div>
        {this.open ? (<annotations-display annotations={this.annotations} authenticated={this.authenticated}></annotations-display>) : null}
      </div>
    );
  }
}
