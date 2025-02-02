import { Component, Event, EventEmitter, Prop, State, h, Listen } from "@stencil/core";

@Component({
  tag: "annotations-display",
  styleUrl: "annotations-display.css",
  assetsDirs: ["assets"],
  shadow: true,
})
export class AnnotationsDisplay {
  @Prop() authenticated: boolean = false;
  @Prop() orcidName: string;
  @Prop() identifier: string;
  @Prop() additionalType: string;
  @Prop() link: any;
  @Prop() throughputToken: string = null;
  @Prop() readOnlyMode: boolean = true;
  @Prop() orcidClientId: string;
  @Prop() annotations: any = [];  
  DEFAULT_ANNOTATION_TEXT: string = "Enter your annotation here.";
  @Prop() handleSampleIdentifier: Function;

  @State() addAnnotation: boolean; // show add annotation text area, Submit/Cancel buttons
  @State() showInfo: boolean = false; // show AboutThroughput component
  @State() annotationText: string; // current annotation text
  @State() searchSampleIdentifier: string; 
  @State() postSampleIdentifier: string; 
  @State() annotationKeyword: string; 
  @State() annotationKeywords: Array<string> = []; // array of string keywords

  @Event({
    eventName: 'annotationAdded',
    bubbles: true,
    cancelable: false,
    composed: true
  }) annotationAdded: EventEmitter<void>;

  @Event({
    eventName: 'checkAuth',
    bubbles: true,
    cancelable: false,
    composed: true
  }) checkAuth: EventEmitter<void>;

  @Listen("click")
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
      case "add_keyword_button":
        this.annotationKeywords.push(this.annotationKeyword); 
        this.annotationKeyword = ""; // clear 
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

  updateSearchSampleIdentifier(event){
    this.searchSampleIdentifier = event.target.value;
  }

  updatePostSampleIdentifier(event){
    this.postSampleIdentifier = event.target.value;
  }

  updateKeyword(event){
    this.annotationKeyword = event.target.value; 
  }

  // POST new annotation to Throughput
  async submitAnnotation() {
    const annotation = {
      dbid: this.identifier,
      additionalType: this.additionalType,
      id: this.postSampleIdentifier,
      body: JSON.stringify({
        "text": this.annotationText,
        "keyword" : this.annotationKeywords
      })
    };
    const url = "https://throughputdb.com/api/widget/";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': this.throughputToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annotation)
    })
    const json = await response.json();
    const success = json.status && json.status === "success";
    if (!success) {
      const errmsg = "Submit annotation failed: " + (json.message ? json.message : "[no message provided]");
      console.error(errmsg);
      alert(errmsg);
    } else {
      // alert root of new annotation so it can refresh and re-render component tree
      this.annotationAdded.emit();
    }
    return success;
  }

  getFormattedDate(date) {
    const properDate = new Date(date);
    return (
      properDate.getMonth() +
      1 +
      "/" +
      properDate.getDate() +
      "/" +
      properDate.getFullYear()
    );
  }

  parseAnnotation(annotation){
    try {
        let annotObj = JSON.parse(annotation);
        if (typeof annotObj === 'object'){
          let keywords = annotObj.keyword; 
          let text = annotObj.text;
          return <div>{text} {keywords.map((keyword) => <span class="keyword">{keyword}</span>) }</div>
        } 
    } catch(error) {
      // not a JSON content, just return string 
      return <div>{annotation}</div>
    }
  }

  render() {
    // Show "Add Annotation" button or add annotation UI (text area, Submit/Cancel buttons)
    // depending on state of this.addAnnotation. Doing this here to avoid hard-to-read
    // nested conditions in rendering code.
    let annotationElement;
    if (this.addAnnotation) {
      annotationElement =
      <div class="postInput">
        Identifier <input type="text" value={this.postSampleIdentifier} onInput={(event) =>this.updatePostSampleIdentifier(event)}/> <br/>
        Keyword 
          <input type="text" value={this.annotationKeyword} onInput={(event) =>this.updateKeyword(event)}/> 
          <button id="add_keyword_button" class="add_keyword_button">Add</button>
          {this.annotationKeywords.map((keyword) => <span class="keyword">{keyword}</span>)}
        <textarea
          onInput={(event) => this.updateAnnotationText(event)}
          onFocus={(event) => this.clearDefaultAnnotationText(event)}
        >
          {this.DEFAULT_ANNOTATION_TEXT}
        </textarea>
        <button id="submit_button" class="add_button">
          Submit
        </button>
        <button id="cancel_button" class="cancel_button">
          Cancel
        </button>
      </div>;
    } else {
      annotationElement = <button id="add_button" class="add_button">+ Add Annotation</button>;
    }

    return (
      <div class="overlay">
        {this.showInfo ? <about-throughput/> : 
        (<div class="annotation_list">
          <div class="closeContainer">
            {/* <div id="close_x" class="close" /> */}
            {/* brg 2/18/2021 Removing the href='#' to avoid appending '#' to window.location.href
              when annotations-display is opened. Otherwise we have to chop it off when we pass
              window.location.href as our redirect_uri when opening the ORCID auth page. Unsure if
              this is the "right way" to do this or not. The above <div> tag also seems to work right.
            <a href="#" id="close_x" class="close" /> */}
            <a id="close_x" class="close" />
          </div>
          <div class="header">
            {/* <img
              src="https://raw.githubusercontent.com/throughput-ec/throughput-ec.github.io/master/resources/throughput.png"
              height="100"
              width="222"
            /> */}
            Throughput Annotations <a id="info_i">&#9432;</a><br/>
            <div class="annotation_search">
              Identifier <input type="text" value={this.searchSampleIdentifier} onInput={(event) =>this.updateSearchSampleIdentifier(event)}/> 
              <button id="search_button" class="search_button">
                Search
              </button>
              <button id="reset_button" class="search_button">
                Reset
              </button>
            </div>
          </div>
          <div class="body">

            {!this.readOnlyMode ? (
                <orcid-connect
                  orcidClientId={this.orcidClientId}
                  authenticated={this.authenticated}
                  orcidName={this.orcidName}
                />
            ) : null}

            {/* Show annotationElement if this.authenticated = true (https://reactjs.org/docs/conditional-rendering.html) */}
            {this.authenticated && annotationElement}

            {/* Show annotations */} <br/>

            {this.annotations.map((annotation) => (
              <div class="annotation_item">
               {this.parseAnnotation(annotation.annotation)}
                <div class="annotation_metadata">
                  <div class="annotation_author">{annotation.annotationauthor ? annotation.annotationauthor : "[null author]"}</div>
                  <div class="orcidLink">
                    <a
                      href={"https://orcid.org/" + annotation.orcid}
                      target="_blank"
                    >
                      <img
                        id="orcid-id-icon"
                        src="https://orcid.org/sites/default/files/images/orcid_24x24.png"
                        width="14"
                        height="14"
                        alt="ORCID iD icon"
                      />
                    </a>
                  </div>
                  <div class="annotation_author">
                    ({this.getFormattedDate(annotation.date)}){" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>)}
      </div>
    );
  }
}
