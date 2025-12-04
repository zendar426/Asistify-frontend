<script setup lang="ts">

</script>

<template>

  <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
  </button>

  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
      <RouterLink :to="{ name: 'landing' }" class="flex items-center ps-2.5 mb-5">
        <img src="/assets/asistify.png" class="h-6 me-3 sm:h-7" alt="Asistify Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap">Asistify</span>
      </RouterLink>
      <ul class="space-y-2 font-medium">
        <li>
          <RouterLink :to="{ name: 'home' }" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-200 group"
                      active-class="bg-indigo-200 text-blue-700 border-r-4 border-blue-600">
            <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 group-[.router-link-active]:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
            </svg>
            <span class="ms-3">Dashboard</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'receptionistDetailt'}" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-200 group">
            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M13.031,11.852 C12.603,11.313 11.908,10.532 11.313,10.458 C10.951,10.413 10.535,10.713 10.125,10.996 C10.045,11.036 9.427,11.404 9.352,11.426 C8.956,11.539 8.111,11.572 7.6,11.106 C7.108,10.656 6.33,9.823 5.702,9.06 C5.102,8.274 4.473,7.329 4.151,6.749 C3.815,6.148 4.057,5.353 4.265,5.003 C4.303,4.94 4.763,4.467 4.866,4.357 L4.881,4.375 C5.262,4.055 5.661,3.73 5.706,3.378 C5.78,2.792 5.181,1.939 4.753,1.399 C4.325,0.858 3.662,-0.089 2.759,0.045 C2.419,0.095 2.126,0.214 1.837,0.385 L1.829,0.376 C1.823,0.38 1.795,0.402 1.781,0.413 C1.772,0.418 1.764,0.421 1.756,0.426 L1.759,0.43 C1.593,0.558 1.119,0.912 1.065,0.96 C0.479,1.481 -0.403,2.708 0.279,4.915 C0.785,6.555 1.864,8.481 3.334,10.429 L3.326,10.436 C3.398,10.53 3.472,10.615 3.547,10.706 C3.617,10.799 3.686,10.891 3.758,10.983 L3.768,10.976 C5.328,12.855 6.964,14.357 8.457,15.243 C10.467,16.435 11.896,15.898 12.556,15.471 C12.618,15.43 13.09,15.063 13.25,14.942 L13.254,14.946 C13.26,14.94 13.264,14.932 13.272,14.926 C13.284,14.917 13.31,14.897 13.315,14.893 L13.309,14.885 C13.551,14.651 13.745,14.401 13.879,14.086 C14.23,13.257 13.459,12.393 13.031,11.852 L13.031,11.852 Z" class="si-glyph-fill"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Llamadas</span>
            <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">Pro</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'receptionist' }" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-200 group"
                      active-class="bg-indigo-200 text-blue-700 border-r-4 border-blue-600">
            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 group-[.router-link-active]:bg-indigo-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Recepcionistas</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'account' }" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-200 group"
                      active-class="bg-indigo-200 text-blue-700 border-r-4 border-blue-600">
            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 group-[.router-link-active]:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Cuenta</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'rag' }" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-200 group"
                      active-class="bg-indigo-200 text-blue-700 border-r-4 border-blue-600">
            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 group-[.router-link-active]:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M12.25 2.25001L12.25 5.05201C12.25 5.95048 12.2499 6.69971 12.3299 7.29449C12.4143 7.92228 12.6 8.48908 13.0555 8.94455C13.5109 9.40002 14.0777 9.58569 14.7055 9.6701C15.3003 9.75006 16.0495 9.75004 16.948 9.75001L19.75 9.75001L19.75 17.052C19.75 17.9505 19.7501 18.6997 19.6701 19.2945C19.5857 19.9223 19.4 20.4891 18.9445 20.9446C18.4891 21.4 17.9223 21.5857 17.2945 21.6701C16.6997 21.7501 15.9505 21.75 15.052 21.75H8.94801C8.04953 21.75 7.30031 21.7501 6.70552 21.6701C6.07773 21.5857 5.51093 21.4 5.05546 20.9446C4.59999 20.4891 4.41432 19.9223 4.32992 19.2945C4.24995 18.6997 4.24997 17.9505 4.25 17.0521V6.94801C4.24997 6.04956 4.24995 5.30029 4.32992 4.70553C4.41432 4.07773 4.59999 3.51093 5.05546 3.05546C5.51093 2.59999 6.07773 2.41432 6.70552 2.32992C7.30031 2.24995 8.04953 2.24998 8.948 2.25001L12.25 2.25001Z"/>
            <path d="M13.75 2.25001V5.00001C13.75 5.96402 13.7516 6.61158 13.8165 7.09462C13.8786 7.55608 13.9858 7.75357 14.1161 7.88389C14.2464 8.01421 14.4439 8.12143 14.9054 8.18347C15.3884 8.24841 16.036 8.25001 17 8.25001H19.75V7.82843L19.7502 7.74838C19.7511 7.42271 19.7521 7.07122 19.6168 6.74452C19.4815 6.41783 19.2322 6.17 19.0013 5.94038L18.9445 5.88389L16.1161 3.05546L16.0596 2.99875C15.83 2.7678 15.5822 2.51854 15.2555 2.38322C14.9288 2.2479 14.5773 2.24891 14.2516 2.24985L14.1716 2.25001L13.75 2.25001Z"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Base de conocimiento</span>
          </RouterLink>
        </li>
        <li>
          <a href="/login" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-200 group">
            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Cerrar Sesión</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>

</style>
