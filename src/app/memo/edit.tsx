import { JSX } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native'

// コンポーネント
// import Header from '../../components/Header'
import KeyboardSafeView from '../../components/KeyboardAvoidingVIew'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

import { auth, db } from '../../config'

const handlePress = (id: string, bodyText: string): void => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)

    setDoc(ref, {
        bodyText,
        updatetedAt: Timestamp.fromDate(new Date())
    })
        .then(() => {
            router.back()
        })
        .catch((error) => {
            console.log(error)
            Alert.alert("更新に失敗しました")
        })
}

const Edit = (): JSX.Element => {
    const id = String(useLocalSearchParams().id)
    console.log('edit', id)
    const [bodyText, setBodyText] = useState('')

    useEffect(() => {
        if (auth.currentUser === null) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
        getDoc(ref)
            .then((docRef) => {
                const RemoteBodyText = docRef?.data()?.bodyText
                setBodyText(RemoteBodyText)
            })
            .catch((error) => {
                console.log(error)
            })


    }, [])

    return (
        <KeyboardSafeView style={styles.container}>
            {/* <Header /> */}
            <View style={styles.inputContainer}>
                {/* 複数行入力はmultilineを指定 */}
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText={(text) => { setBodyText(text) }}
                    autoFocus
                />
            </View>
            {/* 確定ボタン */}
            <CircleButton onPress={() => handlePress(id, bodyText)}>
                <Icon name='check' size={40} color='#ffffff' />
            </CircleButton>
        </KeyboardSafeView>
    )
}

// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    inputContainer: {
        flex: 1,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 26,
        paddingVertical: 32,
        paddingHorizontal: 27,
    }

})

export default Edit