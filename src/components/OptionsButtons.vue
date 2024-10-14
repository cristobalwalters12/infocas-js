<template>
  <v-container>
    <v-card variant="flat" height="600px">
      <div class="d-flex justify-center">
        <v-img
          class="myImage"
          src="/unnamed1.png"
          id="icon"
          alt="User Icon"
          contain
          aspect-ratio="1"
          width="400px"
          height="400px"
        />
      </div>
      <v-row align="center" justify="center" class="pt-10">
        <v-col cols="auto">
          <v-btn size="x-large" color="pink-darken-4" @Click="$router.push('/chart')"
            >Graficos de temperatura-humedad</v-btn
          >
        </v-col>
        <v-col cols="auto" class="d-flex flex-col">
          <v-btn size="x-large" color="pink-darken-4" disabled
            >Graficos de presión diferencial
          </v-btn>
        </v-col>
        <v-col cols="auto" class="d-flex flex-col">
          <v-btn size="x-large" color="pink-darken-4" @Click="$router.push('/supervisionSensores')"
            >Dashboard de sensores</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'OptionsButtons',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
