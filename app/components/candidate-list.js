import Component from '@ember/component';

export default Component.extend({
    actions: {
      copyToClipboard(text) {
        var dummyElement = document.createElement("input");
        document.body.appendChild(dummyElement);
        dummyElement.setAttribute('value', text);
        dummyElement.select();
        document.execCommand("copy");
        document.body.removeChild(dummyElement);
    }
  }
});
