import { JSX } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { onSnapshot, doc } from 'firebase/firestore'
import { useState, useEffect} from 'react'

// 共通コンポーネント
// import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import {auth, db} from '../../config'
import {type Memo} from '../../../types/memo'

const handlePress = ():void => {
    router.push('/memo/edit')
}

const Detail = ():JSX.Element => {
    const { id } = useLocalSearchParams()
    console.log(id)
    const [memo, setMemo] = useState<Memo | null>(null)

    useEffect(()=>{
        if (auth.currentUser === null) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`,String(id))

        const unsubscribe = onSnapshot(ref, (memoDoc) => {
            console.log(memoDoc.data)
            const { bodyText, updatetedAt } = memoDoc.data() as Memo
            setMemo({
                id: memoDoc.id,
                bodyText,
                updatetedAt,
            })
        })

        // コンポーネントを閉じた場合にスナップショット監視を終了(重要)
        return unsubscribe

    },[])

    return (
        <View style={styles.container}>
            {/* ヘッダー */}
            {/* <Header /> */}
            {/* メモ詳細 */}
            <View style={styles.memoHeader}>
                {/* memo?はオプショナルチェーン */}
                <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
                <Text style={styles.memoDate}>{memo?.updatetedAt.toDate().toLocaleString('ja-JP')}</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    {memo?.bodyText}
                </Text>
            </ScrollView>
            {/* ボタン */}
            <CircleButton onPress={handlePress} style={{ top:60, bottom:'auto' }}>
                <Icon name='pencil' size={40} color='#ffffff' />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ffffffff'
    },

    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingTop: 24,
        paddingLeft: 19
    },

    memoTitle: {
        color:'#ffffff',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold'
    },
    memoDate: {
        color:'#ffffff',
        fontSize:12,
        lineHeight: 16,
    },

    memoBody: {
        paddingLeft: 27,
    },

    memoBodyText: {
        paddingTop: 32,
        fontSize:16,
        lineHeight: 24,
        color: '#000000'
    }


})

export default Detail