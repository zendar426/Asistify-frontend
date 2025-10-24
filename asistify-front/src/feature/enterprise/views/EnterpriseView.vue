<script setup lang="ts">
import { reactive } from 'vue'

type FormData = {
    nombre: string
    categoria: string
}

const formData = reactive<FormData>({
    nombre: '',
    categoria: ''
})

function handleSubmit() {
    // Manejo del envío: por ejemplo enviar a API o emitir evento
    console.log('Enviar empresa:', { ...formData })
}
</script>

<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <!-- Header -->
            <div class="flex items-start gap-4 mb-6">
                <div class="bg-indigo-100 rounded-full p-3 flex-shrink-0">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Crear nueva empresa</h2>
                    <p class="text-sm text-gray-600 mt-1">
                        Completa los siguientes campos para registrar una nueva empresa en el
                        sistema.
                    </p>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Nombre Field -->
                <div>
                    <label for="nombre" class="block text-sm font-semibold text-gray-900 mb-2">
                        Nombre
                    </label>
                    <input id="nombre" v-model="formData.nombre" type="text" placeholder="Ej. Mi empresa S.A"
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                </div>

                <!-- Categoría Field -->
                <div>
                    <label for="categoria" class="block text-sm font-semibold text-gray-900 mb-2">
                        Categoría
                    </label>
                    <div class="relative">
                        <select id="categoria" v-model="formData.categoria"
                            class="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-500 cursor-pointer">
                            <option value="" disabled>Selecciona la categoría</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="comercio">Comercio</option>
                            <option value="servicios">Servicios</option>
                            <option value="manufactura">Manufactura</option>
                            <option value="educacion">Educación</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end pt-2">
                    <button type="submit"
                        class="px-8 py-2.5 bg-white text-indigo-600 font-medium rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                        Crear
                    </button>
                </div>
            </form>
        </div>
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
