<script lang="ts" setup>
import BaseButton from '@/components/BaseButton.vue';
import FormInput from '@/feature/receptionist/components/FormInput.vue';
import { ref } from 'vue';

let paymentMethods=ref([
    {"name":"tarjeta 1","number":"4235 4534 5459 0945","expiry":"09/32"},
    {"name":"tarjeta 2","number":"4235 4534 5459 0945","expiry":"09/32"}
])


let newMethodName=ref("")
let newMethodNumber=ref("")
let newMethodExpiry=ref("")
function deleteMethod(idx:any){
    console.log(idx)
    paymentMethods.value.splice(idx,1)
}


function verifyAddedData(){
    let splitNumber=newMethodNumber.value.split(" ")
    if (splitNumber.length!=4) return false;
    for (let index = 0; index < splitNumber.length; index++) {

        const element = splitNumber[index];
        if (element?.length!=4) return false;
        
    }

    let dateSplit=newMethodExpiry.value.split("/")
    if (dateSplit.length!=2) return false;
    return true;
}

function addMethod(){
    if (!verifyAddedData()){
        return;
    }
    paymentMethods.value.push({
        name:newMethodName.value,
        number:newMethodNumber.value,
        expiry:newMethodExpiry.value
    })
    clearValueInputs()
}

function clearValueInputs(){
    newMethodName.value=""
    newMethodNumber.value=""
    newMethodExpiry.value=""
}
</script>
<template>
    <div class="max-w-5xl text-center justify-center mt-10">
        <h1 class="font-bold text-3xl text-center">Métodos de pago asociados</h1>
        <form @submit.prevent="addMethod">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
            <thead class="text-center text-xs text-gray-700 uppercase bg-blue-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Nombre tarjeta
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Numero
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Vencimiento
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Acción
                    </th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr class="odd:bg-blue-50 bg-white dark:bg-gray-800" v-for="(method, index) in paymentMethods" :key="method.name">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ method.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ method.number }}
                    </td>
                    <td class="px-6 py-4">
                        {{ method.expiry }}
                    </td>
                    <td class="px-6 py-4">
                        <BaseButton variant="outline" size="lg" @click="deleteMethod(index)" class="m-5">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                            </svg>
                        </BaseButton>

                    </td>
                </tr>

                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <FormInput v-model="newMethodName" label="" placeholder="" :maxlength="50"
                            :formIsrequired="true" />
                    </th>
                    <td class="px-6 py-4">
                        <FormInput v-model="newMethodNumber" label="" placeholder="" :maxlength="50"
                            :formIsrequired="true" />
                    </td>
                    <td class="px-6 py-4">
                        <FormInput v-model="newMethodExpiry" label="" placeholder="" :maxlength="50"
                            :formIsrequired="true" />
                    </td>
                    <td class="px-6 py-4">
                        <BaseButton variant="outline" size="lg" type="submit" class="m-5">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 12h14m-7 7V5" />
                            </svg>
                        </BaseButton>

                    </td>
                </tr>
            </tbody>
        </table>
        </form>
    </div>
</template>