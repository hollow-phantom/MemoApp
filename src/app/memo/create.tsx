import { JSX } from 'react'
import { View, TextInput, StyleSheet} from 'react-native'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

// コンポーネント
// import Header from '../../components/Header'
import KeyboardSafeView from '../../components/KeyboardAvoidingVIew'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router } from 'expo-router'
import { db,auth } from '../../config'
import { useState} from 'react'

const handlePress = (bodyText:string): void => {
    if (auth.currentUser === null ) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    addDoc(ref, {
        // Keyとvalueが同じ変数名の場合、省略できる
        // Firestoreで日付を扱うときはTimeStampを使う
        bodyText,
        updatetedAt: Timestamp.fromDate(new Date())
    })
        .then((docRef) => {
            console.log('success',docRef.id)
            router.back()
        })
        .catch((error) => {
            console.log(error)
        })
}

const Create = (): JSX.Element => {
    const [bodyText, setBodyText] = useState('')
    return (
        <KeyboardSafeView style={styles.container}>
            {/* <Header /> */}
            <View style={styles.inputContainer}>
                {/* 複数行入力はmultilineを指定 */}
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText={(text)=>{ setBodyText(text)}}
                    autoFocus
                />
            </View>
            <CircleButton onPress={ () => handlePress(bodyText)} >
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
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 26
    }

})

export default Create