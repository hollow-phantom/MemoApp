import { JSX } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

// 各パーツのコンポーネント
// import Header from '../../components/Header'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import LogOutButton from '../../components/LogOutButton'
import Icon from '../../components/Icon'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { db, auth } from '../../config'

const handlePress = (): void => {
    router.push('/memo/create')
}

const List = (): JSX.Element => {

    // hooks内にhooksはかけないので、外に定義
    const navigation = useNavigation()

    // 画面表示時に一度だけ実行
    useEffect(() => {
        // ヘッダーにログアウトを追加
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    }, [])
    useEffect(() => {
        if (auth.currentUser === null) { return }
        // データ参照設定
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
        const q = query(ref, orderBy('updatetedAt', 'desc'))
        // スナップショット取得・監視実行
        const unsubscribe = onSnapshot(q, (snapShot) => {
            snapShot.forEach( (doc) => {
                console.log('memo', doc.data())
            })
        })
        // コンポーネントを閉じた場合にスナップショット監視を終了(重要)
        return unsubscribe
    },[])

    return (
        <View style={styles.container}>
            {/* ヘッダー */}
            {/* < Header /> */}

            {/* コンテンツ */}
            <View>
                < MemoListItem />
                < MemoListItem />
                < MemoListItem />
            </View>

            {/* ボタン */}
            < CircleButton onPress={handlePress}>
                {/* <Feather name='plus' /> */}
                <Icon name='plus' size={40} color='#ffffff' />
            </CircleButton>
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