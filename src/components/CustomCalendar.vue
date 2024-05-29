<template>
  <div class="w-full lg:w-3/4">
    <div
      class="border border-gray-200 min-h-80 bg-white flex flex-col rounded-xl shadow-xl shadow-indigo-50"
    >
      <p class="text-center text-2xl my-4">Custom Calendar</p>

      <div class="flex flex-wrap space-y-3 lg:space-y-0 md:justify-around p-5">
        <button type="button" class="btn btn-light" @click="reset">
          reset
        </button>
        <div class="flex lg:mx-auto">
          <button type="button" class="btn" @click="lastWeek">last week</button>
          <p class="!mx-5">
            {{ month }}
            (Week {{ weekNumber }})
          </p>
          <button type="button" class="btn" @click="nextWeek">next week</button>
        </div>
      </div>

      <ul class="flex flex-col lg:flex-row h-full space-y-5 lg:space-y-0">
        <li
          v-for="(day, index) in weekdaysWithDates"
          :key="index"
          class="flex-grow text-center flex-shrink-0 lg:w-[calc(100%/7)] flex flex-col group"
        >
          <div>
            <p
              class="px-3 py-1 text-xs whitespace-nowrap rounded bg-blue-100 inline-block w-32"
              :class="{ '!bg-blue-500 text-white': todayDayIndex === index }"
            >
              {{ day.date }}
            </p>
          </div>

          <div class="flex-auto lg:border-l-4 group-first:border-l-0 px-2 lg:mt-4">
            <ul class="flex flex-row lg:flex-col">
              <li
                class="border mb-2 bg-white p-2 rounded text-left"
                v-for="(meetings, key) in day.events"
                :key="key"
              >
                <calendar-toggle :title="key" :count="meetings.length">
                  <div class="border-b last:border-b-0 py-1" v-for="(meeting, i) in meetings" :key="i">
                    <p class="text-sm" >
                      {{ meeting.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ meeting.status }}
                    </p>
                  </div>
                </calendar-toggle>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import moment from "moment";
import { formattedEvents } from "@/data/dates";
import CalendarToggle from "./CalendarToggle.vue";

const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const t = ref(new Date().toISOString());

const _moment = computed(() => {
  return moment(t.value);
});

const todayDayIndex = computed(() => {
  let idx = _moment.value.day();
  return idx === 0 ? 6 : idx - 1;
});

const month = computed(() => _moment.value.format("MMMM YYYY"));

const weekNumber = computed(() => _moment.value.week());

const weekdaysWithDates = computed(() => {
  return weekdays.map((w, i) => {
    let date = _moment.value.clone().add(i - todayDayIndex.value, "days");
    return {
      date: date.format("dddd D MMMM"),
      events: formattedEvents
        .map((event) => {
          let _m = moment(event.dateEvent);
          return {
            ...event,
            dateHour: _m.format("HH:00"),
            dateMinutes: _m.format("mm"),
          };
        })
        .filter((event) => {
          return date.dayOfYear() === moment(event.dateEvent).dayOfYear();
        })
        .reduce(function (total, curr) {
          (total[curr["dateHour"]] = total[curr["dateHour"]] || []).push(curr);
          return total;
        }, {}),
    };
  });
});

const nextWeek = () => {
  t.value = moment(t.value).add(1, "w");
};

const lastWeek = () => {
  t.value = moment(t.value).subtract(1, "w");
};

const reset = () => {
  t.value = new Date().toISOString();
};
</script>
