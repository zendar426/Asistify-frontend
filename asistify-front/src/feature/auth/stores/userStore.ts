import { defineStore } from 'pinia'
import { User } from '../models/User'


export const useUserStore = defineStore('user', {
    state: () => ({
        user:null as unknown as User,
    }),
    actions: {
        setUser(userData: any) {
            this.user=new User(userData)

        },

    

        updateUser(newData:any) {
            this.user=new User(newData)
        },

        getUser(){
            return this.user
        },

        removeUser(){
            this.user=null as unknown as User
        }
    },
    persist:true,
})
