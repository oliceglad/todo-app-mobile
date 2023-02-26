import React, { useCallback, useContext, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { AppButton } from '../components/UI/AppButton'
import { AppLoader } from '../components/UI/AppLoader'
import { AppText } from '../components/UI/AppText'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { THEME } from '../theme'

export const MainScreen = () => {
    const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos()
    }, [])

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>
                    {error}
                </AppText>
                <AppButton onPress={loadTodos}>
                    Повторить
                </AppButton>
            </View>
        )
    }

    let content = (
        <View stylee={{ width: width }}>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={todos}
                renderItem={({ item }) => (<Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />)}
            />
        </View>
    )

    if (todos.length === 0) {
        content =
            <View style={styles.imgWrap}>
                <Image style={styles.image} source={require('../../assets/images.png')} />
            </View>
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 20,
    }
})