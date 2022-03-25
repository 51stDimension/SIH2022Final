import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}
const FoliumMap = (props) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  return (
    <>
      <Button onClick={() => dispatch({ type: 'open', size: 'large' })}>
        Load Map
      </Button>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Hotspot Analysis</Modal.Header>
        <Modal.Content>
            <iframe width={'100%'} height={'480px'} src={"http://127.0.0.1:5000/gethotspot?lat=" + props.lat + "&long=" + props.long + "&crime=Murder"} title="Iframe Example"></iframe>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default FoliumMap