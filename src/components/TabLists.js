import React, { useState, useReducer } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {
  StyleSheet,
  View,
  Keyboard,
  Alert,
} from 'react-native'
import {
  Container,
  Toast,
  Root,
  List,
  Tab,
  Tabs,
  ScrollableTab,
} from 'native-base'
import Titlebar from './Titlebar'
import ListShow from './ListShow'
import ModalPopUp from './ModalPopUp'
import { 
  addTodo, 
  delTodo, 
  editTodo, 
  changeStatusTodo,
} from '../redux/TodoList/actions'

export default TabLists = () => {

  const list = useSelector(state => state.data) // get state store redux
  const dispatch = useDispatch() // use func dispatch redux

  const [editData, setEditData] = useState('')
  const [showModal, setShowModal] = useState(false)

  const createTodo = async (data) => {
    await dispatch(addTodo(data))
    await Keyboard.dismiss()
    Toast.show({
      text: 'Create Success',
      buttonText: 'Ok',
      type: 'success',
      onClose: () => handleClearInput()
    })
    setShowModal(false)
  }

  const edit = async (data) => {
    setShowModal(false)
    const dataEdit = Object.assign(
      {
        id: data.id
      },
      data
    )
    await dispatch(editTodo(dataEdit))
    await Keyboard.dismiss()
    Toast.show({
      text: 'Edit Success',
      buttonText: 'Ok',
      type: 'success',
      onClose: () => {
        handleClearInput()
      }
    })
  }

  const alertDel = (id) => {
    Alert.alert(
      'Delete List',
      'Are you sure delete this List?',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => del(id)
        }
      ],
      { cancelable: false }
    )
  }

  const del = (id) => {
    dispatch(delTodo(id))
    Toast.show({
      text: 'Delete Success',
      buttonText: 'Ok',
      type: 'success'
    })
  }

  const changeStatus = (id) => {
    dispatch(changeStatusTodo(id))
    Toast.show({
      text: 'Change Status Success',
      buttonText: 'Ok',
      type: 'success'
    })
  }

  const togglePopup = () => {
    setShowModal(!showModal)
  }

  const showModalEdit = (data) => {
    setEditData(data)
    setShowModal(true)
  }

  const handleClearInput = () => {
    setEditData('')
  }
  
    return (
      <Root>
        <Container>
          <View style={styles.statusBar} />
          
          <Titlebar 
            titleName={'List'}
            createList={togglePopup}
          />

         {/* popup */}
          <ModalPopUp
            isShow={showModal}
            onClose={togglePopup}
            onCreate={createTodo}
            onEdit={edit}
            editData={editData}
          />
         {/* popup */}

          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="List">
                <List>
                  {list.filter(val => !val.completed).map((data, index) => (
                    <ListShow
                      key={index}
                      data={data}
                      onDel={alertDel}
                      onChangeStatus={changeStatus}
                      showEdit={showModalEdit}
                    />
                  ))}
                </List>
            </Tab>
            <Tab heading="Completed">
                <List>
                  {list.filter(val => val.completed).map((data, index) => (
                    <ListShow
                      key={index}
                      data={data}
                      onDel={alertDel}
                      onChangeStatus={changeStatus}
                      showEdit={showModalEdit}
                    />
                  ))}
                </List>
            </Tab>
          </Tabs>
        </Container>
      </Root>
    )
}

const styles = StyleSheet.create({
  statusBar: {
    height: 0,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between'
  }
})