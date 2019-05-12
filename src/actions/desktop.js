import b64ToBlob from 'b64-to-blob';
const {ipcRenderer}
  = (window.require && window.require('electron'))
  || function electron () {
    return {};
  };

/**
 * Dispatch the given event
 * @param  {HTMLElement} node
 * @param  {String} type
 * @param  {Object} data
 * @return {[type]}
 */
const dispatchEvent = (node, type, data) => {
  const event = new Event(type, {'bubbles': true});

  if (data) {
    Object.assign(event, data);
  }
  node.dispatchEvent(event);
};

/**
 * Listen the watch message and emulate a drop
 * @param  {HTMLElement} dropzone
 */
export async function watch (dropzone) {
  ipcRenderer.on('watch-desktop-files', (event, args) => {
    const {base64, name} = args;
    const [header, content] = base64.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const blob = b64ToBlob(content, mime);
    const file = new File([blob], name);
    const data = {
      'dataTransfer': {'files': [file], 'types': ['Files']},
      'preventDefault': function preventDefault () {}
    };

    dispatchEvent(dropzone, 'drop', data);
  });
}
