<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-4">
      <button
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        @click="prevMonth"
      >Prev</button>

      <h1 class="text-3xl font-bold text-center">{{ monthName }} {{ currentYear }}</h1>

      <button
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        @click="nextMonth"
      >Next</button>
    </div>

    <div class="grid grid-cols-7 text-center font-semibold mb-2">
      <div v-for="d in weekDays" :key="d">{{ d }}</div>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <!-- Empty slots before the 1st -->
      <div v-for="n in firstDayOfWeek" :key="'empty-' + n"></div>

      <!-- Actual days -->
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="border rounded-lg p-2 min-h-[90px] text-left relative"
        :class="{
          'bg-blue-100 border-blue-500': isToday(day),
          'hover:bg-gray-100 cursor-pointer': true
        }"
      >
        <div class="font-semibold">{{ day }}</div>

        <!-- Events for this day -->
        <div v-for="event in dayEvents(day)" :key="event.id" class="mt-1" @click="event.shown=true">

          <EventModal :initial-data="event" :key="rerender.value" @remove="removeThing"></EventModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "@/api/axios";
import { ref, computed, onMounted } from "vue";
import EventModal from "./EventModal.vue";

let rerender=ref(0)
// --- DATE SETUP --- //
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const monthName = computed(() =>
  new Date(currentYear.value, currentMonth.value).toLocaleString("default", {
    month: "long",
  })
);

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfWeek = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

// --- EVENTS --- //
// Example events; replace with API or props
const events = ref([
//   { id: 1, date: new Date("2025-12-05T20:10:15"), title: "Dentist" },
//   { id: 2, date: new Date("2025-12-05T21:10:15"), title: "Call with Team" },
//   { id: 3, date: new Date("2025-12-12T20:10:15"), title: "Project Deadline" },
//   { id: 4, date: new Date("2025-12-22T20:10:15"), title: "Party" },
//   { id: 5, date: new Date("2026-01-05T20:10:15"), title: "Dentist" },
]);

const monthEvents = computed(() =>
  events.value.filter((event)=>{
    console.log(event.date.getDate())
    let sameYear=event.date.getFullYear()==currentYear.value
    let sameMonth=event.date.getMonth()==currentMonth.value 
    return sameYear&&sameMonth
  }
    
  )
);

onMounted(async ()=>{
    console.log("fetchin'")
    let fetchedEvents=await api.get("/calendar/dates")
fetchedEvents.data.forEach(ev => {
    console.log({...ev})
    events.value.push(
        {
            id:ev.eventId,
            title:ev.name,
            date:new Date(ev.startDatetime),
            startDatetime: new Date(ev.startDatetime),
            endDatetime: new Date(ev.endDatetime),
            shown:false
        }
    )
});
})

const dayEvents = (day) => monthEvents.value.filter((e) => e.date.getDate() === day);

// --- MONTH NAVIGATION --- //
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

// --- HIGHLIGHT TODAY --- //
const isToday = (day) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};


function closemodal(){
    console.log("oncolose")
    events.value.forEach((event)=>{
        event.shown=false;
        console.log(event.shown)
    })
    rerender++
}

function removeThing(eventId){
    console.log("remthing")
    events.value.forEach((e)=>{
        console.log("di ",e.id)
    })
    let index=events.value.findIndex(e=>{
        return e.id==eventId
    })
    console.log("index ",index, " remid ", eventId)
    if (index !== -1) {
        events.value.splice(index, 1);
    }
}
</script>

<style>
/* Flowbite uses Tailwind; no custom styles needed here */
</style>
