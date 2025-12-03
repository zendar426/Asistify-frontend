<script setup lang="ts">
import { ref } from 'vue'
import ModalCreateEnterprise from '../components/ModalCreateEnterprise.vue'
import ModalEditEnterprise from '../components/ModalEditEnterprise.vue'

const showCreateModal = ref(false)
const showEditModal = ref(false)

type FormData = {
    nombre: string
    categoria: string
}

function handleEditSubmit(data: FormData) {
    console.log('Datos editados:', data)
    showEditModal.value = false
}

function handleEditCancel() {
    showEditModal.value = false
}
</script>

<template>
    <div>
        <!-- <div class="flex gap-4">
            <button @click="showCreateModal = true">Crear Empresa</button>
            <button @click="showEditModal = true">Editar Empresa</button>
        </div> -->
        
        <ModalCreateEnterprise v-if="showCreateModal" @close="showCreateModal = false" />
        <ModalEditEnterprise 
            v-if="showEditModal" 
            @submit="handleEditSubmit"
            @cancel="handleEditCancel"
        />
    </div>
</template>



<style scoped>
/* Forzar ocultado de la flecha nativa en todos los navegadores */
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

/* Oculta la flecha en IE / Edge */
select::-ms-expand {
    display: none;
}
</style>
