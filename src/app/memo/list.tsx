import { JSX } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

// 各パーツのコンポーネント
// import Header from '../../components/Header'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import LogOutButton from '../../components/LogOutButton'
import Icon from '../../components/Icon'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'

const handlePress = ():void => {
    router.push('/memo/create')
}

const List = (): JSX.Element => {

    // hooks内にhooksはかけないので、外に定義
    const navigation = useNavigation()

    // 画面表示時に一度だけ実行
    useEffect( () => {
        // ヘッダーにログアウトを追加
        navigation.setOptions({
            headerRight: () => { return <LogOutButton/>}
        })
    }, [])

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