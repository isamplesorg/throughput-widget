'use strict';

const index = require('./index-00e3a38f.js');
const patch = require('./patch-6138e9a2.js');

patch.patchBrowser().then(options => {
  return index.bootstrapLazy([["about-throughput_5.cjs",[[1,"throughput-widget",{"identifier":[1],"additionalType":[1,"additional-type"],"link":[8],"readOnlyMode":[4,"read-only-mode"],"orcidClientId":[1,"orcid-client-id"],"annotations":[32],"authenticated":[32],"orcidName":[32],"throughputToken":[32],"iSamplesDbId":[32],"sampleIdentifier":[32]},[[0,"annotationAdded","annotationAddedHandler"],[0,"orcidLogout","orcidLogoutHandler"],[0,"checkAuth","checkAuthHandler"]]],[1,"data-display",{"annotations":[8],"authenticated":[4],"orcidName":[1,"orcid-name"],"throughputToken":[1,"throughput-token"],"identifier":[1],"additionalType":[1,"additional-type"],"link":[8],"readOnlyMode":[4,"read-only-mode"],"orcidClientId":[1,"orcid-client-id"],"handleSampleIdentifier":[16],"open":[32]},[[0,"click","handleClick"]]],[1,"annotations-display",{"authenticated":[4],"orcidName":[1,"orcid-name"],"identifier":[1],"additionalType":[1,"additional-type"],"link":[8],"throughputToken":[1,"throughput-token"],"readOnlyMode":[4,"read-only-mode"],"orcidClientId":[1,"orcid-client-id"],"annotations":[8],"handleSampleIdentifier":[16],"addAnnotation":[32],"showInfo":[32],"annotationText":[32],"searchSampleIdentifier":[32],"postSampleIdentifier":[32],"annotationKeyword":[32],"annotationKeywords":[32]},[[0,"click","handleClick"]]],[1,"about-throughput"],[1,"orcid-connect",{"orcidClientId":[1,"orcid-client-id"],"authenticated":[4],"orcidName":[1,"orcid-name"],"isamplesServerBase":[1,"isamples-server-base"]},[[0,"click","handleClick"]]]]]], options);
});
