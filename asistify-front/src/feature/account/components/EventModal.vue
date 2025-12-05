<template>
    
    <div class="bg-blue-500 text-white rounded px-2 py-1 text-xs" @click="showModal">
            {{ formData.name }}
    </div>
    <div v-show="shown" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <!-- Header Icon -->
            <div class="flex items-start gap-4 mb-6">
                <div class="bg-indigo-100 rounded-full p-3 flex-shrink-0">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div class="flex-1">
                    <h2 class="text-2xl font-semibold text-gray-900">Editar evento</h2>
                </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-6">
                Modifica la información del evento.
            </p>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Nombre Field -->
                <div>
                    <label for="nombre" class="block text-sm font-medium text-gray-900 mb-2">
                        Nombre evento
                    </label>
                    <input id="nombre" v-model="formData.name" type="text"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                </div>

                <!-- Categoría Field -->
                <div>
                    <label for="categoria" class="block text-sm font-medium text-gray-900 mb-2">
                        Fechas
                    </label>
                    <div class="relative">

                        <div id="date-range-picker" date-rangepicker datepicker-format="yyyy/mm/dd" class="flex items-center">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                                    </svg>
                                </div>
                                <input id="datepicker-range-start" name="start" type="text"
                                    
                                    v-model="startDate"
                                    datepicker-format="yyyy-mm-dd"
                                    class="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="Select date start">
                            </div>
                            <span class="mx-4 text-body">to</span>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                                    </svg>
                                </div>
                                <input id="datepicker-range-end" name="end" type="text"
                                    v-on:change="changeEndDate"
                                    datepicker-format="yyyy-mm-dd"
                                    class="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="Select date end">
                            </div>
                        </div>

                    </div>
                </div>

<div>
        <label for="start-time" class="block mb-2 text-sm font-medium text-heading">Hora de inicio:</label>
        <div class="relative">
            <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
               <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            </div>
            <input step="1" type="time" v-model="startTime" id="start-time" class="block w-full p-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" min="07:00" max="23:00" required />
        </div>
    </div>
    <div>
        <label for="end-time" class="block mb-2 text-sm font-medium text-heading">Hora de término:</label>
        <div class="relative">
            <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
               <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            </div>
            <input step="1" type="time" v-model="endTime" id="end-time" class="block w-full p-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" min="07:00" max="23:00"  required />
        </div>
    </div>

    


                <!-- Action Buttons -->
                <div class="flex items-center justify-end gap-3 pt-2">
                    <BaseButton
            icon="fa-solid fa-trash" 
            variant="icon" 
            size="md" 
            :onClick="handleDelete"
            class="align-left mr-1"
          />
                    <button type="button" @click="handleCancel"
                        class="px-6 py-2.5 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-full border border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from '@/api/axios'
import BaseButton from '@/components/BaseButton.vue'
import { useUserStore } from '@/feature/auth/stores/userStore'
import { Datepicker, initFlowbite } from 'flowbite'
import { DateRangePicker } from 'flowbite-datepicker'
import { onMounted, ref } from 'vue'

let shown=ref(false)

let userStore=useUserStore()

interface CompanyFormData {
    name: string
    startDate: Date,
    endDate:Date

}

interface Props {
    initialData?: any
}
let rangepicker:DateRangePicker
onMounted(() => {
    //initFlowbite();
    
})

const props = withDefaults(defineProps<Props>(), {
    initialData: () => ({
        id:"",
        name: 'Clínica Toltén',
        startDatetime: new Date(),
        endDatetime: new Date()
    })
})

const emit = defineEmits<{
    submit: [data: CompanyFormData]
    close: []
    remove: [eventId:string]
}>()
let eventId=props.initialData.id
let startDate=ref(datetimeDate(props.initialData.startDatetime))
let endDate=ref(datetimeDate(props.initialData.endDatetime))
let startTime=ref(datetimeTime(props.initialData.startDatetime))
let endTime=ref(datetimeTime(props.initialData.endDatetime))
const formData = {
    eventId:props.initialData.id,
    name: props.initialData.title,
    startDatetime: props.initialData.startDatetime,
    endDatetime:props.initialData.endDatetime,
}

const handleDelete=async ()=>{
    console.log("deletin: ",`/calendar/date?eventId=${eventId}`)
    let deleteRes=await api.delete(`/calendar/date?eventId=${eventId}`)
    if (deleteRes.status<300){
        console.log("emit ",eventId)
        emit("remove",eventId)
        shown.value=false
    }
    else{
        if (deleteRes.status!=402){
            alert("Fallo al realizar accion")
        }
        
        console.log(deleteRes.status)
    }
    
}

const handleSubmit = async () => {
    //let enterpriseProfile=await api.get(`/enterprise-profiles/profile/${userStore.getUser().id}`)
    //let enterpriseId=enterpriseProfile.data[0].enterpriseId

    let updatedStartDate=document.getElementById("datepicker-range-start")!.value
    let updatedEndDate=document.getElementById("datepicker-range-end")!.value
    formData.startDatetime=`${updatedStartDate}T${startTime.value}`
    formData.endDatetime=`${updatedEndDate}T${endTime.value}`
    //console.log("tosend ",formData)
    if (checkData()){
        console.log("tosend ",formData)
        console.log("date input val ",document.getElementById("datepicker-range-start").value)
        let response=await api.patch(`/calendar/date`,formData)
        if (response.status>299){
            //coso
        }
        else{
            window.location.reload()
        }
    }
    else{
        alert("Las fechas ingresadas son incorrectas")
    }
    
    
    // let response=await api.patch(`/calendar/date`,formData)
    // if (response.status>299){
    //     //coso
    // }
    // else{
    //     window.location.reload()
    // }
    
}

function checkData(){
    let startPieces=startTime.value!.split(":")
    let endPieces=endTime.value!.split(":")
    let hoursGood=parseInt(startPieces[0]!)<parseInt(endPieces[0]!)
    let hoursEqual=parseInt(startPieces[0]!)==parseInt(endPieces[0]!)
    let minssGood=parseInt(startPieces[1]!)<parseInt(endPieces[1]!)
    let minssEqual=parseInt(startPieces[1]!)==parseInt(endPieces[1]!)
    let secsGood=parseInt(startPieces[2]!)<parseInt(endPieces[2]!)
    console.log("daig ",hoursGood,hoursEqual,minssGood,minssEqual,secsGood)
    console.log("start ",startTime," end ",endTime)
    if (hoursGood){
        return true
    }
    if (hoursEqual && minssGood){
        return true;
    }
    if (minssEqual && secsGood){
        return true;
    }
    return false
}

function datetimeTime(date:Date){
 return date.toISOString().split("T")[1]?.replace("Z","")
}
function datetimeDate(date:Date){
    console.log("date ",date)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

const showModal=()=>{
    let elem=document.getElementById("date-range-picker")!
    rangepicker=new DateRangePicker(elem!,{
        format:"yyyy-mm-dd"
    })
    
    shown.value=true
}


const handleCancel = () => {
    shown.value=false
//    emit('close')
}
</script>