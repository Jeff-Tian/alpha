import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'
import React, {PureComponent} from 'react'

export default class Editor extends PureComponent {
  render() {
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            // tslint:disable-next-line:no-console
            console.log('Editor is ready to use!', editor)
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
        />
      </div>
    )
  }
}
