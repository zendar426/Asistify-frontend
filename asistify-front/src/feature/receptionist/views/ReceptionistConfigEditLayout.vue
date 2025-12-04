<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ReceptionistConfigForm from '@/feature/receptionist/components/ReceptionistConfigForm.vue'
import type { Receptionist } from '@/feature/receptionist/models/Receptionist'

const route = useRoute()
const isEditMode = ref(!!route.params.id)
const receptionist = ref<Receptionist | null>(null)

</script>
<template>
    <div class="min-h-screen flex flex-col">
        <SideBar />

        <div>
            <ReceptionistConfigEditView />
        </div>
    </div>
</template>