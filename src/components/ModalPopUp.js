
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import {
  View,
  Button,
  Form,
  Item,
  Input,
  Icon,
} from 'native-base'
import _ from 'lodash'
import Modal from 'react-native-modals'

const ModalPopUp = (props) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errorInput, setErrorInput] = useState(false)

  const onCloseModal = () => {
    props.onClose()
    setTitle('')
    setDescription('')
  }

  const onSummitForm = () => {
    const dataFrom = {
      title,
      description,
    }
    if(!_.isEmpty(title) && !_.isEmpty(description)) {
      props.editData.id ? props.onEdit({ ...dataFrom, id: props.editData.id }) : props.onCreate(dataFrom)
      setErrorInput(false)
    }else{
      setErrorInput(true)
    }
  }

  const setValueTitle = props.editData.title ? props.editData.title : ''
  const setValueDescription = props.editData.description ? props.editData.description : ''

  return (
    <Modal
      visible={props.isShow}
      width={0.9}
      height={0.4}
      onTouchOutside={() => onCloseModal()}
    >
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Form>
          <Item
            error={errorInput}
            style={{ marginTop: 15, marginBottom: 20 }}
          >
            <Input
              defaultValue={setValueTitle}
              placeholder="Title"
              onChangeText={val => setTitle(val)}
            />
           { errorInput && <Icon name='close-circle' /> } 
          </Item>
          <Item
            error={errorInput}
            style={{ marginTop: 15, marginBottom: 20 }}
          >
            <Input
              defaultValue={setValueDescription}
              placeholder="Description"
              onChangeText={val => setDescription(val)}
            />
           { errorInput && <Icon name='close-circle' /> } 
          </Item>
        </Form>

        <Button
          style={{ marginTop: 20 }}
          full
          onPress={onSummitForm}
        >
          <Text style={{ color: '#fff' }}> Save </Text>
        </Button>
      </View>
    </Modal>
  )
}

Modal.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onCreate: PropTypes.func,
}

Modal.defalutProps = {
  onShow: false,
  onClose(){},
  onEdit(){},
  onCreate(){},
}

export default ModalPopUp
