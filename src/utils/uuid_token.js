// 工具模块
import { v4 as uuidv4 } from 'uuid'
// 要生成随机字符串,且每次执行不能发生变化，游客身份持久储存
export const getUUID = () => {
    // 先从本地获取一下uuid（看一下本地存储里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if( !uuid_token ){
        // 生成游客临时身份
        uuid_token = uuidv4()
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }

    return uuid_token

}