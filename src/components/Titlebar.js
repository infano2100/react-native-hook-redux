import React from 'react'
import PropTypes from 'prop-types'
import { 
  Header, 
  Left, 
  Body, 
  Right, 
  Button, 
  Icon, 
  Title,
} from 'native-base'

const Titlebar = (props) => {
  return (
      <Header>
        <Left />
        <Body>
          <Title>{props.titleName}</Title>
        </Body>
        <Right>
          <Button transparent onPress={props.createList}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
  )
}

Titlebar.propTypes = {
  titleName: PropTypes.string.isRequired,
  createList: PropTypes.func.isRequired
}

Titlebar.defalutProps = {
  titleName: 'List',
  createList(){},
}

export default Titlebar