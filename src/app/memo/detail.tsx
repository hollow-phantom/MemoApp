import { JSX } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

// 共通コンポーネント
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'

const Detail = ():JSX.Element => {
    return (
        <View>
            {/* ヘッダー */}
            <Header />
            {/* メモ詳細 */}
            <View>
                <Text>買い物リスト</Text>
                <Text>2023年10月1日 10:00</Text>
            </View>
            <ScrollView>
                <Text>
                    買い物リスト
                    書体やレイアウトなどを確認するために用います。
                    本文用なので使い方を間違えると不自然に見えることもありますので要注意。
                </Text>
            </ScrollView>
            {/* ボタン */}
            <CircleButton>+</CircleButton>
        </View>
    )
}

export default Detail