import { Stack } from 'expo-router'
import { JSX } from 'react'

// 全画面共通のヘッダー設定
const Layout = ():JSX.Element => {
    return <Stack screenOptions={{
        headerStyle:{
            backgroundColor: '#467FD3', // ヘッダーの背景色
        },
        headerTintColor: "#ffffff",     // ヘッダーのテキスト・アイコン色
        headerTitle: "Memo App",        // ヘッダータイトル
        headerBackTitle: "Back",        // 戻るボタンのラベル（iOSのみ有効）
        headerTitleAlign: 'center',     // タイトルを中央揃え（Androidはデフォルト左寄せのため必要）
        headerTitleStyle: {
            fontSize: 22,
            fontWeight:'bold'
        }
    }}/>
}

export default Layout