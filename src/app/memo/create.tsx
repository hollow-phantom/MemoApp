import { JSX } from 'react'
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'

// コンポーネント
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'

const Create = (): JSX.Element => {
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <Header />
            <View style={styles.inputContainer}>
                {/* 複数行入力はmultilineを指定 */}
                <TextInput multiline style={styles.input} value='' />
            </View>
            <CircleButton>
                <Icon name='check' size={40} color='#ffffff' />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal:27,
        flex:1,
    },
    input: {
        flex: 1,
        textAlignVertical:'top',
        fontSize: 16,
        lineHeight: 26
    }

})

export default Create