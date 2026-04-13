import { JSX } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

// 各パーツのコンポーネントq
// import Header from '../../components/Header'
//
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import LogOutButton from '../../components/LogOutButton'
import Icon from '../../components/Icon'
import { router, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { db, auth } from '../../config'
import {type Memo} from '../../../types/memo'

const handlePress = (): void => {
    router.push('/memo/create')
}

const List = (): JSX.Element => {

    const [memos, setMemos] = useState<Memo[]>([])

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
            const remoteMemos: Memo[] = []
            snapShot.forEach( (doc) => {
                console.log('memo', doc.data())
                const { bodyText, updatetedAt } = doc.data()
                remoteMemos.push({
                    id: doc.id,
                    bodyText,
                    updatetedAt
                })
            })
            setMemos(remoteMemos)
        })
        // コンポーネントを閉じた場合にスナップショット監視を終了(重要)
        return unsubscribe
    },[])

    return (
        <View style={styles.container}>
            {/* コンテンツ */}
            <FlatList
                data={memos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={( {item} ) => <MemoListItem memo={item} />}
            />

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