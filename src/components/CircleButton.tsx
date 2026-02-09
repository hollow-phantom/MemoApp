import { View, Text, StyleSheet } from 'react-native'

// propsの型定義
interface Props {
    children: string
}

const CircleButton = (props: Props): JSX.Element => {

    const { children } = props

    return (
        <View style={styles.circleButton}>
            <Text style={styles.circleButtonLabel}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    // ボタン
    circleButton: {
        width: 64,
        height: 64,
        borderRadius: '50%',
        backgroundColor: '#467FD3',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 40,
        bottom: 40,
        // ドロップシャドウ。iOSにしか効かない
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 },
        // Androidでドロップシャドウさせるために必要
        elevation: 8,
    },

    circleButtonLabel: {
        color: '#ffffff',
        fontSize: 40,
        lineHeight: 40,
    },
}
)

export default CircleButton