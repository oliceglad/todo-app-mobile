import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert, Keyboard} from 'react-native'
import { THEME } from '../theme'
import { AntDesign } from '@expo/vector-icons'

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Название дела не может быть пустым')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={text => setValue(text)}
                value={value}
                placeholder='Введите название дела...' />
            <AntDesign.Button onPress={pressHandler} name = "pluscircleo" style={styles.button}>
                Добавить
            </AntDesign.Button>
        </View>
    )
}


const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#e8c6c0'
    },
    input: {
        width: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
    }
})