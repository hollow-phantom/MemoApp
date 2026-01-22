import { JSX } from 'react'
import { View, Text, StyleSheet, type TextStyle} from 'react-native'

interface  Props {
    children: string
    // オプション扱い
    bang?: boolean
    style?: TextStyle
}

const Hello = (props:Props): JSX.Element => {

    // 分割代入
    const {children, bang, style} = props

    return (
        <View>
            <Text style={[styles.text, style]}>
                {/* 三項演算子 */}
                Hello {children}{bang ? '!' : ''}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        backgroundColor: 'blue',
        fontSize: 40,
        padding: 16
    }
})

export default Hello