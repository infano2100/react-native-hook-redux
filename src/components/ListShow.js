import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { 
  Animated, 
  StyleSheet, 
  View,
} from 'react-native'
import { 
  Icon, 
  ListItem, 
  Text, 
  Left, 
  Body, 
  Right, 
  CheckBox,
} from 'native-base'
import moment from 'moment'

const ListShow = (props) =>  {

    const [showDetal, setShowDetal] = useState(false)
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0))

    const onToggleShow = () => {
      if(!showDetal){
        Animated.timing(          // Animate over time
          fadeAnim, // The animated value to drive
          {
            toValue: 1,           // Animate to opacity: 1 (opaque)
            duration: 750,       // 2000ms
          }
        ).start()
      } else {
        setFadeAnim(new Animated.Value(0))
      }
      setShowDetal(!showDetal)
    }

    const {
      data, 
      showEdit,
    } = props

    return (
      <ListItem thumbnail>
        <Left>
          <CheckBox
            checked={data.completed === true ? true : false}
            color="green"
            onPress={() => props.onChangeStatus(data.id)}
          />
        </Left>
        <Body>
            <Text style={data.completed === true ? styles.lineText : null}>
              {data.title} 
            </Text>
            {showDetal ? (
            <Animated.View style={{ opacity: fadeAnim }}>
                <View style={{ paddingTop: 20 }}>
                  <Text note numberOfLines={10}>
                    Description : {data.description}
                  </Text>
                  <Text note numberOfLines={2}>
                    Date : {moment(data.createdAt).format('LLL')}
                  </Text>
                </View>
            </Animated.View>
            ) : null}
        </Body>
        <Right>
            <View style={styles.viewIcon}>
              <Icon
                  onPress={() => onToggleShow()}
                  type="FontAwesome"
                  name={ showDetal ? 'angle-up' : 'angle-down'}
               />
              <Icon
                onPress={() => showEdit(data)}
                style={{ color: '#4da6ff' }}
                type="FontAwesome"
                name="pencil"
              />
              <Icon
                onPress={() => props.onDel(data.id)}
                style={{ color: 'red' }}
                name="trash"
              />
            </View>
        </Right>
      </ListItem>
    )
}

const styles = StyleSheet.create({
  lineText: {
    textDecorationLine: 'line-through',
    color: 'green'
  },
  viewIcon: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: 80,
  },
})

ListShow.propTypes = {
  data: PropTypes.object,
  onDel: PropTypes.func,
  changeStatus: PropTypes.func,
  showEdit: PropTypes.func
}

ListShow.defalutProps = {
  data: {},
  onDel(){},
  onChangeStatus(){},
  showEdit(){},
}

export default ListShow