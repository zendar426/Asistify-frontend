<script setup lang="ts">
import LandingNavbar from '../components/LandingNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import FeatureCard from '../components/FeatureCard.vue'
import BaseButton from '../../../components/BaseButton.vue'
import LandingFooter from '../components/LandingFooter.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    title: 'Atención 24/7',
    description: 'Con Asistify tu negocio nunca más perderá oportunidades por llamadas fuera de horario. Nuestro sistema garantiza atención continua 365 días al año, ofreciendo una experiencia confiable y profesional a tus clientes en cualquier momento del día o la noche.',
    imageSrc: '/assets/landingpage/24-7.png',
    imagePosition: 'left' as const
  },
  {
    title: 'Gestión automática',
    description: 'Olvídate de coordinar manualmente citas o perder tiempo en confirmaciones. Asistify organiza tu agenda de manera automática, optimizando horarios y reduciendo errores, para que te concentres en hacer crecer tu negocio.',
    imageSrc: '/assets/landingpage/metrics-holo.png',
    imagePosition: 'right' as const
  },
  {
    title: 'Aprendizaje inteligente',
    description: 'El sistema no solo atiende, también aprende. Asistify recuerda las preferencias de tus clientes recurrentes, su historial de citas y detalles relevantes, ofreciendo una atención más personalizada y creando relaciones duraderas.',
    imageSrc: '/assets/landingpage/memory.png',
    imagePosition: 'left' as const
  },
  {
    title: 'Panel de métricas',
    description: 'Visualiza el impacto de cada interacción en un solo lugar. Con Asistify podrás consultar cuántas llamadas fueron atendidas, cuántas citas se confirmaron y cuál es la estimación de ingresos recuperados gracias a la atención oportuna.',
    imageSrc: '/assets/landingpage/schedule.png',
    imagePosition: 'right' as const
  },
  {
    title: 'Escalabilidad',
    description: 'A medida que tu negocio crece, Asistify crece contigo. El sistema está diseñado con un enfoque en la escalabilidad futura, permitiéndote expandir fácilmente a distintos canales de comunicación como WhatsApp, correo electrónico o chat en línea.',
    imageSrc: '/assets/landingpage/scalability.png',
    imagePosition: 'left' as const
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100">
    <!-- Navbar -->
    <LandingNavbar />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <section class="">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-3">
          <FeatureCard
            v-for="(feature, index) in features"
            :key="index"
            :title="feature.title"
            :description="feature.description"
            :image-src="feature.imageSrc"
            :image-position="feature.imagePosition"
          />
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20">
      <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-xl md:text-2xl font-bold text-dark/90 mb-6">
          Empieza hoy con Asistify y descubre cómo un recepcionista virtual puede transformar tu negocio.
        </h2>
        <BaseButton variant="outline" size="lg" :onClick="() => router.push({ name: 'membership' })">
          COMENZAR
        </BaseButton>
      </div>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<style scoped>

</style>
