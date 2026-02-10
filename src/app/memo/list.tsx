import { JSX } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// 各パーツのコンポーネント
import Header from '../../components/Header'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'

const List = (): JSX.Element => {

    return (
        <View style={styles.container}>
            {/* ヘッダー */}
            < Header />

            {/* コンテンツ */}
            <View>
                < MemoListItem />
                < MemoListItem />
                < MemoListItem />
            </View>

            {/* ボタン */}
            < CircleButton>+</CircleButton>
        </View>

    )
}

//
// CSS
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
})


export default List