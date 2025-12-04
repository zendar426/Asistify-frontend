<script lang="ts" setup>
import BaseButton from '@/components/BaseButton.vue';
import { useUserStore } from '@/feature/auth/stores/userStore';
import FormInput from '@/feature/receptionist/components/FormInput.vue';
import { onMounted, ref } from 'vue';


const props = defineProps({
    label:{
        type:String,
        required:true
    },
    readProperty:{
        type:String,
        required:true
    }
})

let userStore=useUserStore()

let editing=ref(false)
let propertyValue=ref("")

onMounted(()=>{
    userStore.updateUser({
        name:"John",
        surname:"Doe",
        orgName:"Mann Co.",
        email:"jdoe@mann.co"
    })
    propertyValue.value=userStore.user.asJson()[props.readProperty]
})


</script>

<template>

    <div v-if="!editing">
        
        <div class="columns-2 justify-left">
            <div>
                <label for=""> {{ label }}</label>
                <p>{{ propertyValue }}</p>
            </div>
            <BaseButton variant="outline" size="sm" type="button" @click="editing = !editing">
                Editar
            </BaseButton>
        </div>
    </div>


    <div class="columns-2 align-center" v-else>
        <FormInput v-model="propertyValue" :label="label" placeholder="Juan" :maxlength="50" />
        <BaseButton type="button" variant="outline" size="sm" @click="editing=!editing">Guardar</BaseButton>
    </div>
</template>