import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'
import React, {PureComponent} from 'react'

class Base64ImageUploadAdapter {
  loader: any
  reader: any
  /**
   * Creates a new adapter instance.
   *
   * @param {module:upload/filerepository~FileLoader} loader
   */
  constructor(loader) {
    /**
     * `FileLoader` instance to use during the upload.
     *
     * @member {module:upload/filerepository~FileLoader} #loader
     */
    this.loader = loader
  }

  /**
   * Starts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#upload
   * @returns {Promise}
   */
  upload() {
    return new Promise((resolve, reject) => {
      const reader = (this.reader = new FileReader())

      reader.addEventListener('load', () => {
        resolve({default: reader.result})
      })

      reader.addEventListener('error', err => {
        reject(err)
      })

      reader.addEventListener('abort', () => {
        reject()
      })

      this.loader.file.then(file => {
        reader.readAsDataURL(file)
      })
    })
  }

  /**
   * Aborts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#abort
   * @returns {Promise}
   */
  abort() {
    this.reader.abort()
  }
}

export default class Editor extends PureComponent {
  render() {
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={editor => {
            ClassicEditor.builtinPlugins.map(plugin => {
              // tslint:disable-next-line:no-console
              console.log(plugin.pluginName)
              if (plugin.pluginName === 'MediaEmbed') {
                // tslint:disable-next-line:no-console
                plugin.extraProviders = [
                  {
                    name: 'test',
                    url: /.+/,
                    html: match => `...${match}...`,
                  },
                ]
              }
            })

            // You can store the "editor" and use when it is needed.
            // tslint:disable-next-line:no-console
            editor.plugins.get('FileRepository').createUploadAdapter = loader =>
              new Base64ImageUploadAdapter(loader)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            // tslint:disable-next-line:no-console
            console.log({event, editor, data})
          }}
          onBlur={editor => {
            // tslint:disable-next-line:no-console
            console.log('Blur.', editor)
          }}
          onFocus={editor => {
            // tslint:disable-next-line:no-console
            console.log('Focus.', editor)
          }}
          config={{
            plugins: ClassicEditor.builtinPlugins.map(
              plugin => plugin.pluginName
            ),
            mediaEmbed: {
              extraProviders: [
                {
                  name: 'all',
                  // A URL regexp or an array of URL regexps:
                  url: /.+/,

                  // To be defined only if the media are previewable:
                  html: match => `...${match}`,
                },
              ],
            },
          }}
        />
      </div>
    )
  }
}
