import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Alert, Text} from 'react-native'
import { THEME } from '../theme'
import { AppButton } from '../components/UI/AppButton'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value)
    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка', `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов`)
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }
    return (
        <Modal visible={visible} animationType='slide' tpansparent={false}>
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder='Введите название'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64} />
                <View style={styles.buttons}>
                    <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
                        Отменить
                    </AppButton>
                    <AppButton onPress={saveHandler} color='#e8c6c0'>
                        <Text style = {{color: 'black'}}>
                            Сохранить
                        </Text>
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})